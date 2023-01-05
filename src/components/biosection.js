

export default function BioSection(props) {
  return (
    <section className="pt-10">
      <div className="App-home-section container mx-auto">
        <div  className="grid gap-5 md:gap-10 grid-cols-3 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2"></div>
          <div className="col-span-2 md:col-span-3 pb-5">
            <h1 className="text-xl">{props.title}</h1>
          </div>
        </div>
        <div className="grid gap-5 md:gap-10 grid-cols-3 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2">
            <figure>
              <img className="object-none block px-2" src="https://picsum.photos/150/150"alt=""/>
            </figure>
          </div>
          <div className="col-span-2 md:col-span-6 pr-2">
            <p  style={{ fontSize: '18px', marginBottom: '5px' }}>{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
 

// export default class BioSection extends React.Component {
//   render() {
//     return (
//       <div className="App-home-section">
//         <h1>{this.props.title}</h1>
//         <p style={{ fontSize: '20px', marginBottom: '5px' }}>
//           {this.props.text}
//         </p>
//       </div>
//     );
//   }
// }
