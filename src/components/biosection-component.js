

export default function BioSectionComponent(props) {
  return (
    <section className="pt-24">
      <div className="App-home-section container mx-auto">
        <div  className="flex justify-center md:grid gap-5 md:gap-5 grid-cols-3 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2"></div>
          <div className="col-span-2 md:col-span-3 pb-5">
            <h1 className="text-xl">{props.title}</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center md:grid md:gap-10 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2">
            <figure className="pb-5 md:pb-0">
              <img className="mx-auto px-2" src="https://picsum.photos/150/150"alt=""/>
            </figure>
          </div>
          <div className="col-span-2 md:col-span-6 pr-2 px-2">
            <p style={{ marginBottom: '5px' }}>{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
 
