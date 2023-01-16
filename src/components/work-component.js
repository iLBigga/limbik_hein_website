
export default function WorkComponent(props) {
  return (
    <section className="pb-12">
      <div className="App-home-section container mx-auto">
        <div className="flex justify-center ">
          <div className="pb-4">
            <img src={`data:image/jpeg;base64,${props.imageSrc}`} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-12">
          <div className="col-span-2 md:col-span-12 ">
            <div className="flex justify-between">
              <span className="font-medium">{props.title}</span>
              <span className="font-medium">{props.date}</span>
            </div>
            <div className="flex justify-start">
              {/* <p className="mt-2" style={{ fontSize: '12px'}}>{props.description}</p> */}
              <p className="mt-2" >{props.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}