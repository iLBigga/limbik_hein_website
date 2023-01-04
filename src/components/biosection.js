

export default function BioSection(props) {
  return (
    <div className="App-home-section ml-10">
      <h1>{props.title}</h1>
      <p style={{ fontSize: '20px', marginBottom: '5px' }}>{props.text}</p>
    </div>
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
