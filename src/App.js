import { Route, Routes } from "react-router-dom";
import './App.css';
import './style.css';

//Pages
import { Biography, Works, ComingSoon, Contact } from './pages/pages';

//Components
import { HeaderComponent, FooterComponent } from "./components/components";

function App() {
  return (
    <>
      <div className="App text-xs md:text-sm lg:text-base">
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Biography />} />
          <Route path="/works" element={<Works />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<ComingSoon />} />
        </Routes>
        <FooterComponent/>
      </div>
    </>
  );
}


export default App;