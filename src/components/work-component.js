
export default function WorkComponent(props) {
  return (
    <section className="pt-10">
      <div className="App-home-section container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2">
            <figure>
              <img className="object-none block px-2" src="https://picsum.photos/1024/1024"alt=""/>
            </figure>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-12">
          <div className="col-span-1 md:col-span-12 px-2">
            <div className="flex justify-between">
              <span className="">{props.title}</span>
              <span className="">{props.date}</span>
            </div>
            <div className="flex justify-start">
              <p className="mt-2" style={{ fontSize: '12px'}}>{props.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 