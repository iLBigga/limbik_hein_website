import logo from './logo.svg';
import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home"
import { AboutMe } from "./pages/AboutMe"
import './App.css';

function App() {
  return (
    <>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-me">About Me</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={ <Home />}/>
      <Route path="/about-me" element={ <AboutMe />} />
    </Routes>
    </>
  );
}

export default App;
