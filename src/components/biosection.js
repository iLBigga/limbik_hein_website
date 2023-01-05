

export default function BioSection(props) {
  return (
    <section className="pt-10">
      <div className="App-home-section container mx-auto">
        <div  className="grid grid-cols-2 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2"></div>
          <div className="col-span-1 md:col-span-3 pb-5">
            <h1 className="text-xl">{props.title}</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2">
            <figure>
              <img className="object-none block px-2" src="https://picsum.photos/150/150"alt=""/>
            </figure>
          </div>
          <div className="col-span-1 md:col-span-6 pr-2">
            <p  style={{ fontSize: '16px', marginBottom: '5px' }}>{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
 
