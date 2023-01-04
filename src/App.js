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
        <Link class="App-header-logo" to="/">LIMBIK HEIN</Link>
        <Link class="App-header-section" to="/works">WORKS</Link>
        <Link class="App-header-section" to="/contact">CONTACT</Link>
        <Link class="App-header-section" to="/shop">SHOP</Link>
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