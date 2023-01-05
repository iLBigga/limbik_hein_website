import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link, Route, Routes } from "react-router-dom";
import { Fragment } from 'react'
import './App.css';
import './style.css';


//Pages
import { Biography, Works, ComingSoon } from './pages/pages';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function sideMenu(){
  let menu = document.getElementById('menu');
    if(menu.classList.contains('left-full')){
      menu.classList.remove('left-full');  
      // menu.classList.add('right-0', 'left-0', 'transition-all', 'duration-500');  
      menu.classList.add('left-0')
    } else {
      menu.classList.remove('left-0');  
      menu.classList.add('left-full');  
    }
}

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header container mx-auto flex justify-between w-full fixed top-0 right-0 left-0">
          <div onClick={sideMenu} id='menu' className='fixed flex justify-center items-center transition-all duration-500 w-full left-full -right-0 ease-out top-0 bottom-0 bg-neutral-200'>
            <div  className='text-center'>
              <ul className='flex flex-col gap-3'>
                <li><Link className="App-header-logo" to="/">LIMBIK HEIN</Link></li>
                <li><Link className="App-header-section" to="/works">WORKS</Link></li>
                <li><Link className="App-header-section" to="/contact">CONTACT</Link></li>
                <li><Link className="App-header-section" to="/shop">SHOP</Link></li>
                <li><a href="fooBar"><i class="fa-brands fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="items-center flex">
            <Link className="App-header-logo px-2" to="/">LIMBIK HEIN</Link>
          </div>
          <div className='flex items-center'>
            <Menu as="div" className="relative inline-block text-left md:hidden px-2">
              <div>
                <Menu.Button onClick={sideMenu} className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-neutral-300">
                  <i class="fa-solid fa-bars"></i>
                  {/* <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
                </Menu.Button>
              </div>

              {/* <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-30origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mr-2 text-center">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/works"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900 App-header-section' : 'text-gray-700',
                            'block px-4 py-2'
                          )}
                        >
                          WORKS
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/contact"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900 App-header-section' : 'text-gray-700',
                            'block px-4 py-2'
                          )}
                        >
                          CONTACT
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          to="/shop"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900 App-header-section' : 'text-gray-700',
                            'block px-4 py-2'
                          )}
                        >
                          SHOP
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900 App-header-section' : 'text-gray-700',
                            'block px-4 py-2'
                          )}
                        >
                          <a href="fooBar"><i class="fa-brands fa-instagram"></i></a>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition> */}
            </Menu>
          </div>
          <div className="items-center md:flex hidden gap-8">
            <Link className="App-header-section" to="/works">WORKS</Link>
            <Link className="App-header-section" to="/contact">CONTACT</Link>
            <Link className="App-header-section" to="/shop">SHOP</Link>
            <a href="fooBar" className="App-header-section"><i class="fa-brands fa-instagram"></i></a>
          </div>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Biography />} />
        <Route path="/works" element={<Works />} />
        <Route path="/contact" element={<ComingSoon />} />
        <Route path="/shop" element={<ComingSoon />} />
      </Routes>
    </>
  );
}


export default App;