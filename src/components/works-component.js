import WorkComponent from './work-component';

export default function WorksComponent(props) {
  return (
    <section className="pt-10">
      <div className="App-home-section container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2"></div>
          <div className="col-span-1 md:col-span-6">
            <h1 className="text-xl pb-5">WORKS</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2"></div>
          <div className="col-span-1 md:col-span-6 pr-2">
            {/* TODO: RENDERE DINAMICO UNA VOLTA CHE SI HANNO LE IMMAGINI  */}
            <WorkComponent imageSrc="https://picsum.photos/id/123/1024/1024" title="Titolo" date="2023/01/05" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum 
            quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. 
            Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! 
            Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. 
            Quo neque error repudiandae fuga?
            "></WorkComponent>
             <WorkComponent imageSrc="https://picsum.photos/1024/1024" title="Titolo" date="2023/01/04" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum 
            quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. 
            Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! 
            Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. 
            Quo neque error repudiandae fuga?
            "></WorkComponent>
          </div>
        </div>
      </div>
    </section>
  );
}
