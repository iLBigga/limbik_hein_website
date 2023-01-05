import WorkComponent from './work-component';

export default function WorksComponent(props) {
  return (
    <section className="pt-10">
      <div className="App-home-section container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12">
          <div className="col-span-1 md:col-span-12">
            <h1 className="text-xl">WORKS</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-12">
          <WorkComponent title="Titolo" date="2023/04/01" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum 
          quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. 
          Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! 
          Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. 
          Quo neque error repudiandae fuga?
          "></WorkComponent>
        </div>
      </div>
    </section>
  );
}
 