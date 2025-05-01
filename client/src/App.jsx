import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

function NavLinks({ isMobile = false, onClickMobile }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const linkBaseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out";
  const mobileLinkBaseClasses = "block px-3 py-2 rounded-md text-base font-medium transition-all duration-300";

  const getClasses = (path) => {
    const baseClasses = isMobile ? mobileLinkBaseClasses : linkBaseClasses;
    return `${baseClasses} ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
    }`;
  };

  return (
    <>
      <Link
        to="/"
        className={getClasses("/")}
        onClick={onClickMobile}
      >
        Checkout
      </Link>
      <Link
        to="/orders"
        className={getClasses("/orders")}
        onClick={onClickMobile}
      >
        Orders
      </Link>
    </>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Payment Flow System
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <NavLinks />
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {/* Menu icon */}
                  {!isMenuOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden bg-white border-t border-gray-200`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLinks isMobile onClickMobile={() => setIsMenuOpen(false)} />
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <Routes>
              <Route path="/" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </main>

        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'transform-gpu',
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }} 
        />
      </div>
    </Router>
  );
}

export default App; 