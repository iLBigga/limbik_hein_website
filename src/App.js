import { Link, Route, Routes } from "react-router-dom";
import './App.css';
import './style.css';

//Pages
import {Biography, Works, ComingSoon} from './pages/pages';


function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <span class="App-header-logo" >
          <Link to="/">LIMBIK HEIN</Link>
        </span>
        <span className="App-header-section" href="/works">
          <Link to="/works">WORKS</Link>
        </span>
        <span className="App-header-section" href="/contacts">
          <Link to="/contact">CONTACT</Link>
        </span>
        <span className="App-header-section" href="/shop">
          <Link to="/shop">SHOP</Link>
        </span>
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