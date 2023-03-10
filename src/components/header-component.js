import { Link } from "react-router-dom";

//SideMenu
function sideMenu(){
  let menu = document.getElementById('menu');
    if(menu.classList.contains('left-full')){
      menu.classList.remove('left-full');  
      menu.classList.add('left-0')
    } else {
      menu.classList.remove('left-0');  
      menu.classList.add('left-full');  
    }
}

export default function HeaderComponent() {
  return (
    <header className="App-header container mx-auto flex justify-between w-full fixed top-0 right-0 left-0">
      <div onClick={sideMenu} id='menu' className='fixed flex justify-center items-center transition-all duration-500 w-full left-full -right-0 ease-out top-0 bottom-0 bg-white'>
        <div  className='text-center'>
          <ul className='flex flex-col gap-5'>
            <li><Link className="App-header-logo" to="/">LIMBIK HEIN</Link></li>
            <li><Link className="App-header-section" to="/works">WORKS</Link></li>
            <li><Link className="App-header-section" to="/contact">CONTACT</Link></li>
            <li><Link className="App-header-section" to="/shop">SHOP</Link></li>
            <li><a href="https://www.instagram.com/limbikhein/" rel="noreferrer" target='_blank'><i className="fa-brands fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="items-center flex">
        <Link className="App-header-logo px-2" to="/">LIMBIK HEIN</Link>
      </div>
      <div className='flex items-center'>
        <div as="div" className="relative inline-block text-left sm:hidden px-2">
          <div>
            <button onClick={sideMenu} className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-neutral-300">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="items-center justify-center sm:flex hidden gap-8">
        <Link className="App-header-section p_br" to="/works">WORKS</Link>
        <Link className="App-header-section p_br" to="/contact">CONTACT</Link>
        <Link className="App-header-section p_br" to="/shop">SHOP</Link>
        <a href="https://www.instagram.com/limbikhein/" className="App-header-section" rel="noreferrer" target='_blank'><i className="fa-brands fa-instagram"></i></a>
      </div>
    </header>
  );
}

