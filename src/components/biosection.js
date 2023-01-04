

export default function BioSection(props) {
  return (
    <section className="pt-10">
      <div className="App-home-section container mx-auto">
        <div className="grid grid-cols-12">
          <figure>
            Immagine
          </figure>
          <div className="col-span-3">
          <h1>{props.title}</h1>
            <p  style={{ fontSize: '20px', marginBottom: '5px' }}>{props.text}</p>
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
