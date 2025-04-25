import os
import sqlite3
import requests
import json
import time
from io import BytesIO
from PIL import Image
import openai
from gnews import GNews
from typing import Optional, Dict, Any, Tuple
from datetime import datetime, timedelta
import asyncio
from dotenv import load_dotenv

load_dotenv() # load ambient variables from the .env file

class TelegramLogger:
    def __init__(self, token: str, chat_id: str):
        self.token = token
        self.chat_id = chat_id
        self.base_url = f"https://api.telegram.org/bot{token}/"

    def send_message(self, text: str) -> bool:
        try:
            data = {"chat_id": self.chat_id, "text": text}
            response = requests.post(
                f"{self.base_url}sendMessage",
                data=data,
                timeout=10
            )
            response.raise_for_status()
            return True
        except requests.exceptions.RequestException as e:
            print(f"Telegram error: {e}")
            return False

class TokenManager:
    def __init__(self, telegram_logger):
        self.logger = telegram_logger
        self.config_file = 'token_config.json'
        self.tokens = self.load_tokens()
        
    def load_tokens(self) -> Dict:
        if os.path.exists(self.config_file):
            with open(self.config_file, 'r') as f:
                return json.load(f)
        return {
            'openai': {
                'token': '',
                'expires_at': None
            },
            'instagram': {
                'access_token': '',
                'long_lived_token': '',
                'expires_at': None
            }
        }
    
    def save_tokens(self):
        with open(self.config_file, 'w') as f:
            json.dump(self.tokens, f, indent=4)

    async def refresh_instagram_token(self) -> Optional[str]:
        self.logger.send_message("Attempting to refresh Instagram token...")
        try:
            if not self.tokens['instagram']['long_lived_token']:
                url = "https://graph.facebook.com/v15.0/oauth/access_token"
                params = {
                    "grant_type": "fb_exchange_token",
                    "client_id": os.getenv("FACEBOOK_CLIENT_ID"),
                    "client_secret": os.getenv("FACEBOOK_CLIENT_SECRET"),
                    "fb_exchange_token": self.tokens['instagram']['access_token']
                }
                response = requests.get(url, params=params)
                response.raise_for_status()
                data = response.json()
                self.tokens['instagram']['long_lived_token'] = data['access_token']
                self.tokens['instagram']['expires_at'] = datetime.now().timestamp() + data['expires_in']
                self.save_tokens()
                self.logger.send_message("Converted to long-lived Instagram token")

            url = "https://graph.facebook.com/v15.0/oauth/access_token"
            params = {
                "grant_type": "fb_exchange_token",
                "client_id": os.getenv("FACEBOOK_CLIENT_ID"),
                "client_secret": os.getenv("FACEBOOK_CLIENT_SECRET"),
                "fb_exchange_token": self.tokens['instagram']['long_lived_token']
            }
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            self.tokens['instagram']['access_token'] = data['access_token']
            self.tokens['instagram']['expires_at'] = datetime.now().timestamp() + data['expires_in']
            self.save_tokens()
            
            self.logger.send_message("Instagram token refreshed successfully")
            return data['access_token']
            
        except Exception as e:
            self.logger.send_message(f"Failed to refresh Instagram token: {str(e)}")
            return None

    async def refresh_openai_token(self) -> Optional[str]:
        self.logger.send_message("OpenAI token needs to be refreshed manually.")
        self.logger.send_message("1. Go to https://platform.openai.com/api-keys")
        self.logger.send_message("2. Create a new API key")
        self.logger.send_message("3. Update the OPENAI_API_KEY in your .env file")
        
        # Attempt to read new token from .env file
        load_dotenv(override=True)
        new_token = os.getenv("OPENAI_API_KEY")
        
        if new_token and new_token.startswith('sk-'):
            self.tokens['openai']['token'] = new_token
            self.tokens['openai']['expires_at'] = (datetime.now() + timedelta(days=90)).timestamp()
            self.save_tokens()
            self.logger.send_message("OpenAI token updated successfully")
            return new_token
        else:
            self.logger.send_message("Invalid or missing OpenAI token in .env file")
            return None

    async def get_valid_tokens(self) -> Tuple[Optional[str], Optional[str]]:
        openai_token = None
        instagram_token = None
        
        # Check OpenAI token
        if (not self.tokens['openai']['expires_at'] or 
            datetime.now().timestamp() > self.tokens['openai']['expires_at']):
            openai_token = await self.refresh_openai_token()
        else:
            openai_token = self.tokens['openai']['token']
            
        # Check Instagram token
        if (not self.tokens['instagram']['expires_at'] or 
            datetime.now().timestamp() > self.tokens['instagram']['expires_at']):
            instagram_token = await self.refresh_instagram_token()
        else:
            instagram_token = self.tokens['instagram']['access_token']
            
        return openai_token, instagram_token

class InstagramPoster:
    def __init__(self, logger: TelegramLogger, config: Dict[str, str]):
        self.logger = logger
        self.openai_key = config['openai_key']
        self.model = config['model']
        self.folder_path = config['image_folder']
        self.db_path = config['db_path']
        self.instagram_creds = config['instagram_creds']
        
        os.makedirs(self.folder_path, exist_ok=True)
        openai.api_key = self.openai_key

    def get_news_summary(self) -> Optional[str]:
        """Get and process news titles"""
        self.logger.send_message("Fetching news...")
        try:
            google_news = GNews()
            tops = google_news.get_top_news()
            
            if not tops:
                self.logger.send_message("No news found")
                return None

            titles = []
            for top in tops:
                titles.append(top['title'])

            titles = [title.split(":")[1] if title.startswith(("watch live", "Watch Live", "Watch live", "WATCH LIVE","EDITORIAL", "editorial", "Editorial", "news", "News", "NEWS", "Opinion", "opinion", "exclusive", "Exclusive", "letter", "Letter", "letters", "Letters", "live", "Live", "LIVE")) else title for title in titles]
            titles = [title.split("|")[0] for title in titles]
            titles = [title.split("- ")[0] for title in titles]
            titles = [title.split("— ")[0] for title in titles]

            prompt = "\n".join(titles) + "\n\ntd;lr "
            self.logger.send_message("News fetched successfully")
            return prompt
        except Exception as e:
            self.logger.send_message(f"Error fetching news: {str(e)}")
            return None

    # --------------------------------------  Limbik Creation process --------------------------------------------------------------------------------------------------------------

    def generate_image_prompt(self, news_summary: str) -> Optional[Dict[str, str]]:
        """Generate image prompt from news summary"""
        self.logger.send_message("Generating image prompt...")
        try:
            completion = openai.Completion.create(
                engine=self.model,
                prompt=news_summary,
                temperature=0.7,
                max_tokens=500,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )
            summary = completion.choices[0].text.strip()

            keywords_prompt = summary + "\n\nExtract the key words from that paragraph. "
            completion2 = openai.Completion.create(
                engine=self.model,
                prompt=keywords_prompt,
                temperature=0.5,
                max_tokens=500
            )
            keywords = completion2.choices[0].text.strip()

            description_prompt = keywords + "\n\nUsing only some of those keywords, write a detailed prompt to generate an image, that starts with 'detailed pencil sketch, dark tones, that shows'. AVOID Covid, war, politicians topics. STAY UNDER 400 CHARACTERS. "
            completion3 = openai.Completion.create(
                engine=self.model,
                prompt=description_prompt,
                temperature=0.8,
                max_tokens=100
            )
            description = completion3.choices[0].text.strip()

            # Generate title
            title_prompt = description + "\n\nGive a title to that text. "
            title_completion = openai.Completion.create(
                engine=self.model,
                prompt=title_prompt,
                temperature=0.7,
                max_tokens=300
            )
            title = title_completion.choices[0].text.strip()

            # Generate used elements explanation
            elements_prompt = f"I have this prompt: {description}\n\nIt has been written from this summarization of the recent news articles from all around the worlds: {summary}\n\nIdentify what from the summarization has been used to write the prompt. "
            elements_completion = openai.Completion.create(
                engine=self.model,
                prompt=elements_prompt,
                temperature=0.5,
                max_tokens=300
            )
            used_elements = elements_completion.choices[0].text.strip()

            # Generate abstract image interpretation
            abstract_prompt = f"I have this prompt: {description}\n\nIt has been written from this summarization of the recent news articles from all around the worlds: {summary}\n\n{used_elements}\n\nWithout over-describing the elements of the image in an objective way, look at the image you made and the keywords that you used and briefly try to trace back, in a 200 characters text, what influenced you in your creation. give also a very brief interpretation of only a very few elements in the picture. AVOID making a list of the news. "
            abstract_completion = openai.Completion.create(
                engine=self.model,
                prompt=abstract_prompt,
                temperature=1,
                max_tokens=500
            )
            abstract = abstract_completion.choices[0].text.strip()

            # Generate hashtags
            hashtags_prompt = f"based on this text: {abstract}\n\nWrite a bunch of hashtags for Instagram based on it, and also about Artificial Intelligente and Art made with Artificial Intelligence. "
            hashtags_completion = openai.Completion.create(
                engine=self.model,
                prompt=hashtags_prompt,
                temperature=1,
                max_tokens=500
            )
            hashtags = hashtags_completion.choices[0].text.strip()

            self.logger.send_message("Image prompt generated successfully")
            return {
                'title': title,
                'description': description,
                'summary': summary,
                'abstract': abstract,
                'hashtags': hashtags
            }
        except Exception as e:
            self.logger.send_message(f"Error generating prompt: {str(e)}")
            return None

    def generate_image(self, prompt: str) -> Optional[str]:
        """Generate image using DALL-E"""
        self.logger.send_message("Generating image...")
        try:
            image_response = openai.Image.create(prompt=prompt)
            image_url = image_response.data[0].url
            
            response = requests.get(image_url)
            response.raise_for_status()
            
            image_bytes_io = BytesIO(response.content)
            image = Image.open(image_bytes_io)
            
            timestamp = int(time.time())
            image_name = str(timestamp)
            image_path = os.path.join(self.folder_path, f"{image_name}.jpg")
            image.save(image_path)
            
            self.logger.send_message("Image generated and saved successfully")
            return image_path
        except Exception as e:
            self.logger.send_message(f"Error generating image: {str(e)}")
            return None
        
    # limbik creation process --------------------------------------------------------------------------------------------------------------

    def save_to_database(self, title: str, description: str, image_path: str) -> bool:
        """Save artwork details to database"""
        self.logger.send_message("Saving to database...")
        try:
            with sqlite3.connect(self.db_path) as conn:
                conn.execute(
                    "INSERT INTO works(title, description, date, image_url) VALUES (?, ?, ?, ?)",
                    [title, description, int(time.time()), image_path]
                )
            self.logger.send_message("Saved to database successfully")
            return True
        except Exception as e:
            self.logger.send_message(f"Database error: {str(e)}")
            return False

    def post_to_instagram(self, image_path: str, caption: str) -> bool:
        """Post image to Instagram"""
        self.logger.send_message("Posting to Instagram...")
        try:
            # Create media object
            url = f"{self.instagram_creds['graph_domain']}{self.instagram_creds['graph_version']}/{self.instagram_creds['instagram_account_id']}/media"
            
            params = {
                'image_url': f"http://www.limbikhein.com/images/{os.path.basename(image_path)}",
                'caption': caption,
                'access_token': self.instagram_creds['access_token']
            }
            
            response = requests.post(url, params=params)
            response.raise_for_status()
            media_id = response.json()['id']

            # Wait for media object to be ready
            time.sleep(5)

            # Publish media
            publish_url = f"{self.instagram_creds['graph_domain']}{self.instagram_creds['graph_version']}/{self.instagram_creds['instagram_account_id']}/media_publish"
            params = {
                'creation_id': media_id,
                'access_token': self.instagram_creds['access_token']
            }
            
            response = requests.post(publish_url, params=params)
            response.raise_for_status()
            
            self.logger.send_message("Posted to Instagram successfully")
            return True
        except Exception as e:
            self.logger.send_message(f"Instagram posting error: {str(e)}")
            return False

async def main():
    # Initialize logger
    telegram_logger = TelegramLogger(
        token=os.getenv("TELEGRAM_BOT_TOKEN"),
        chat_id=os.getenv("TELEGRAM_CHAT_ID")
    )
    
    # Initialize token manager
    token_manager = TokenManager(telegram_logger)
    
    # Get valid tokens
    openai_token, instagram_token = await token_manager.get_valid_tokens()
    
    if not openai_token or not instagram_token:
        telegram_logger.send_message("Failed to obtain valid tokens. Aborting.")
        return
    
    # Configuration with new tokens
    config = {
        'openai_key': openai_token,
        'model': "gpt-4",
        'image_folder': "/data/limbikhein/www/images/",
        'db_path': '/data/limbikhein/artworks.db',
        'instagram_creds': {
            'access_token': instagram_token,
            'graph_domain': 'https://graph.facebook.com/',
            'graph_version': 'v15.0',
            'instagram_account_id': os.getenv("INSTAGRAM_ACCOUNT_ID")
        }
    }
    
    # Initialize poster
    poster = InstagramPoster(telegram_logger, config)
    
    # Start process
    telegram_logger.send_message("🚀 Starting post generation process...")
    
    # Get news and generate summary
    news_summary = poster.get_news_summary()
    if not news_summary:
        return
    
    # Generate image prompt and content
    prompt_data = poster.generate_image_prompt(news_summary)
    if not prompt_data:
        return
    
    # Generate image
    image_path = poster.generate_image(prompt_data['description'])
    if not image_path:
        return
    
    # Save to database
    if not poster.save_to_database(
        prompt_data['title'],
        prompt_data['abstract'],
        image_path
    ):
        return
    
    # Post to Instagram
    caption = f"{prompt_data['title']}\n\n{prompt_data['abstract']}\n\n{prompt_data['hashtags']}"
    if not poster.post_to_instagram(image_path, caption):
        return
    
    telegram_logger.send_message("✨ Process completed successfully!")

if __name__ == "__main__":
    # Create .env file if it doesn't exist
    if not os.path.exists('.env'):
        with open('.env', 'w') as f:
            f.write("""
TELEGRAM_BOT_TOKEN=6139290859:AAHa-TxuUkGAPmROLM2xvW8V6oye9n0Lftg
TELEGRAM_CHAT_ID=92342826
OPENAI_API_KEY=your_openai_key_here
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
INSTAGRAM_ACCOUNT_ID=17841456869867173
            """.strip())
        print("Created .env file. Please update it with your credentials.")
        exit(1)
    
    asyncio.run(main())