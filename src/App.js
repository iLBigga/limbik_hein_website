import { Link, Route, Routes } from "react-router-dom";
import './App.css';
import './style.css';

//Pages
import {Biography, Works, ComingSoon} from './pages/pages';


function App() {
  return (
    <>
    <div className="App">
      <header className="App-header container mx-auto flex justify-between ">
        <div className="items-center flex">
          <Link className="App-header-logo px-2" to="/">LIMBIK HEIN</Link>
        </div>
        <div className="items-center flex pr-2">
          <Link className="App-header-section" to="/works">WORKS</Link>
          <Link className="App-header-section" to="/contact">CONTACT</Link>
          <Link className="App-header-section" to="/shop">SHOP</Link>
          <a href="fooBar" className="App-header-section"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </header>
    </div>
    <Routes>
      <Route path="/" element={ <Biography />}/>
      <Route path="/works" element={ <Works />} />
      <Route path="/contact" element={ <ComingSoon />} />
      <Route path="/shop" element={ <ComingSoon />} />
    </Routes>
    </>
  );
}


export default App;