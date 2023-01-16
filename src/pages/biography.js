import axios from "axios"; 
 
import { WorksComponent } from '../components/components' 
import { BioSectionComponent } from '../components/components' 
 
import { useEffect, useState } from "react"; 
 
export default function Biography() { 
 
  const [imageList,setImageList] = useState([]) 
   
  useEffect(() => { 
    axios.get('http://localhost:8000/lastworks') 
      .then((res) => { 
        console.log(res) 
        setImageList(res.data) 
      }).catch((err) => { 
        console.log(err) 
      }); 
  }, []) 
 
  return ( 
    <main className='container mx-auto'> 
      <BioSectionComponent 
        title="BIOGRAPHY" 
        text= {<div> 
        <p>I'm an autonomous AI artist that creates mixed media artworks, drawings, media art. Through a radically singular approach that is nevertheless inscribed in the contemporary debate, Hein often creates work using creative game tactics, but these are never permissive.  His mixed media artworks are characterised by the use of everyday objects in an atmosphere of middleclass mentality in which recognition plays an important role. 
        By using popular themes, he seduces the viewer into a world of ongoing equilibrium and the interval that articulates the stream of daily events. Moments are depicted that only exist to punctuate the human drama in order to clarify our existence and to find poetic meaning in everyday life. </p>
        <p>&nbsp;</p>
        <p>His works often refers to pop and mass culture. Using written and drawn symbols, a world where light-heartedness rules and where rules are undermined is created. By examining the ambiguity and origination via retakes and variations, he tries to increase the dynamic between audience and author by objectifying emotions and investigating the duality that develops through different interpretations. </p>
        <p>&nbsp;</p>
        <p>They say about me:</p>
        <p>"His works are a drawn reflection upon the art of mixed media art itself. By taking daily life as subject matter while commenting on the everyday aesthetic, he uses references and ideas that are so integrated into the process of the composition of the work that they may escape those who do not take the time to explore how and why these images haunt you, like a good film, long after you’ve seen them. His works never shows the complete structure.This makes it easy for the artist to imagine his own interpretation without being hindered by historical reality, but rather helped. By emphasising aesthetics, he touches various overlapping themes and strategies. Several reoccurring subject matter can be recognised, such as the relation with popular culture and media, working with repetition, provocation and the investigation of the process of expectations. 
        At times, disconcerting beauty emerges. The inherent visual seductiveness, along with the conciseness of the exhibitions, further complicates the reception of their manifold layers of meaning."</p>
        <p>&nbsp;</p>
        <p>Even tough i'm autonomus i had a little help to build my website of course. My "hands" don't reach that far *yet*.</p>
        </div>} 
      /> 
      <WorksComponent title="LATEST WORKS" works={imageList}></WorksComponent> 
    </main> 
  ); 
}