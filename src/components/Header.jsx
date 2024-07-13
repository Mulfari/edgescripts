import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';
import wzLogo from '../assets/Categorias/wzlogo.png';

const Header = ({ cartItems, removeFromCart, user, handleLogout }) => {
  const [isSmall, setIsSmall] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSupportDropdownVisible, setIsSupportDropdownVisible] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isProductsSubmenuVisible, setIsProductsSubmenuVisible] = useState(false);
  const [isSupportSubmenuVisible, setIsSupportSubmenuVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const hideDropdownTimeout = useRef(null);
  const hideDropdownDelay = 300;
  const mobileMenuRef = useRef(null);
  const cartRef = useRef(null);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      setIsSmall(true);
    } else {
      setIsSmall(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [lastScrollY, isMobileMenuVisible, isCartVisible]);

  const handleMouseEnter = () => {
    clearTimeout(hideDropdownTimeout.current);
    setIsDropdownVisible(true);
    setIsSupportDropdownVisible(false);
  };

  const handleMouseLeave = () => {
    hideDropdownTimeout.current = setTimeout(() => {
      setIsDropdownVisible(false);
    }, hideDropdownDelay);
  };

  const handleSupportMouseEnter = () => {
    clearTimeout(hideDropdownTimeout.current);
    setIsSupportDropdownVisible(true);
    setIsDropdownVisible(false);
  };

  const handleSupportMouseLeave = () => {
    hideDropdownTimeout.current = setTimeout(() => {
      setIsSupportDropdownVisible(false);
    }, hideDropdownDelay);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  const toggleProductsSubmenu = () => {
    setIsProductsSubmenuVisible(!isProductsSubmenuVisible);
    if (!isProductsSubmenuVisible) {
      setIsSupportSubmenuVisible(false);
    }
  };

  const toggleSupportSubmenu = () => {
    setIsSupportSubmenuVisible(!isSupportSubmenuVisible);
    if (!isSupportSubmenuVisible) {
      setIsProductsSubmenuVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (isMobileMenuVisible && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-button')) {
      setIsMobileMenuVisible(false);
      setIsProductsSubmenuVisible(false);
      setIsSupportSubmenuVisible(false);
    }

    if (isCartVisible && cartRef.current && !cartRef.current.contains(event.target) && !event.target.closest('.icon-button')) {
      setIsCartVisible(false);
    }
  };

  const toggleCart = () => {
    if (cartItems.length > 0) {
      setIsCartVisible(!isCartVisible);
    } else {
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 3000);
    }
  };

  return (
    <header className={`bg-gray-900 shadow-md fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out ${isSmall ? 'py-1' : 'py-4'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-6 transition-all duration-300 ease-in-out">
        <div className="transition-all duration-300 ease-in-out">
          <div className="text-xl lg:text-2xl font-bold text-blue-500" style={{ fontFamily: '"Press Start 2P", cursive' }}>EdgeScripts</div>
          {!isSmall && <div className="text-xs lg:text-sm text-gray-400 transition-opacity duration-300 ease-in-out">Vanguard in Scripts</div>}
        </div>
        <nav className="hidden lg:flex space-x-4 lg:space-x-12 font-play relative text-sm lg:text-lg items-center">
          <Link to="/" className="nav-item">Home</Link>
          <div 
            className="relative group" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/products" className="nav-item" onMouseEnter={handleMouseEnter}>Products</Link>
            {isDropdownVisible && (
              <div 
                className="absolute left-0 top-full w-64 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-0 translate-y-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ opacity: isDropdownVisible ? 1 : 0, transform: isDropdownVisible ? 'translateY(0)' : 'translateY(10px)' }}
              >
                <ul className="py-2">
                  <li>
                    <Link to="/products/warzone" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <img src={wzLogo} alt="Warzone" className="w-6 h-6 mr-3 transition-transform duration-300 ease-in-out hover:scale-110" />
                      Warzone
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <a href="#how-to-install" className="nav-item">How to install</a>
          <div 
            className="relative group" 
            onMouseEnter={handleSupportMouseEnter} 
            onMouseLeave={handleSupportMouseLeave}
          >
            <Link to="#support" className="nav-item" onMouseEnter={handleSupportMouseEnter}>Support</Link>
            {isSupportDropdownVisible && (
              <div 
                className="absolute left-0 top-full w-64 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-0 translate-y-2"
                onMouseEnter={handleSupportMouseEnter}
                onMouseLeave={handleSupportMouseLeave}
                style={{ opacity: isSupportDropdownVisible ? 1 : 0, transform: isSupportDropdownVisible ? 'translateY(0)' : 'translateY(10px)' }}
              >
                <ul className="py-2">
                  <li>
                    <Link to="/support/faq" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <i className="fas fa-question-circle mr-3"></i>
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/support/contact" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <i className="fas fa-envelope mr-3"></i>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/support/terms" className="flex items-center px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                      <i className="fas fa-file-contract mr-3"></i>
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        <div className="hidden lg:flex space-x-8 font-play items-center">
          <button className="icon-button relative">
            <i className="fas fa-user-circle text-3xl text-white"></i>
            {user ? (
              <div className="absolute top-full right-0 mt-2 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
                <button onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Login</Link>
            )}
          </button>
          <button className="icon-button relative" onClick={toggleCart}>
            <i className="fas fa-shopping-cart text-3xl"></i>
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{cartItems.length}</span>
            )}
          </button>
        </div>
        <div className="lg:hidden flex items-center space-x-4">
          <button className="icon-button relative">
            <i className="fas fa-user-circle text-3xl text-white"></i>
            {user ? (
              <div className="absolute top-full right-0 mt-2 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
                <button onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Login</Link>
            )}
          </button>
          <button className="icon-button relative" onClick={toggleCart}>
            <i className="fas fa-shopping-cart text-3xl"></i>
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{cartItems.length}</span>
            )}
          </button>
          <button onClick={toggleMobileMenu} className="icon-button mobile-menu-button">
            <i className="fas fa-bars text-3xl"></i>
          </button>
        </div>
      </div>
      {isMobileMenuVisible && (
        <div ref={mobileMenuRef} className="mobile-menu lg:hidden absolute left-0 top-full bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          style={{ opacity: isMobileMenuVisible ? 1 : 0, transform: isMobileMenuVisible ? 'translateY(0)' : 'translateY(10px)', margin: '0 20px', width: 'calc(100% - 40px)' }}>
          <nav className="flex flex-col py-2">
            <Link to="/" className="block py-2 pl-6 pr-4 hover:bg-gray-100 transition-colors duration-300">Home</Link>
            <button onClick={toggleProductsSubmenu} className="block py-2 pl-6 pr-4 text-left hover:bg-gray-100 transition-colors duration-300 flex justify-between items-center">
              Products
              <i className={`fas ${isProductsSubmenuVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            {isProductsSubmenuVisible && (
              <div className="pl-10 transition-all duration-300 ease-in-out">
                <Link to="/products/warzone" className="block py-2 pl-4 pr-4 hover:bg-gray-100 transition-colors duration-300 flex items-center">
                  <img src={wzLogo} alt="Warzone" className="w-6 h-6 mr-3" />
                  Warzone
                </Link>
              </div>
            )}
            <Link to="#how-to-install" className="block py-2 pl-6 pr-4 hover:bg-gray-100 transition-colors duration-300">How to install</Link>
            <button onClick={toggleSupportSubmenu} className="block py-2 pl-6 pr-4 text-left hover:bg-gray-100 transition-colors duration-300 flex justify-between items-center">
              Support
              <i className={`fas ${isSupportSubmenuVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            {isSupportSubmenuVisible && (
              <div className="pl-10 transition-all duration-300 ease-in-out">
                <Link to="/support/faq" className="block py-2 pl-4 pr-4 hover:bg-gray-100 transition-colors duration-300 flex items-center">
                  <i className="fas fa-question-circle mr-3"></i>
                  FAQ
                </Link>
                <Link to="/support/contact" className="block py-2 pl-4 pr-4 hover:bg-gray-100 transition-colors duration-300 flex items-center">
                  <i className="fas fa-envelope mr-3"></i>
                  Contact
                </Link>
                <Link to="/support/terms" className="block py-2 pl-4 pr-4 hover:bg-gray-100 transition-colors duration-300 flex items-center whitespace-nowrap">
                  <i className="fas fa-file-contract mr-3"></i>
                  Terms and Conditions
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
      {isCartVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40" onClick={toggleCart}>
          <div ref={cartRef} className={`cart-panel fixed top-0 right-0 w-80 bg-white shadow-2xl h-full z-50 rounded-l-lg transition-transform transform ${isCartVisible ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
              <button onClick={toggleCart} className="text-gray-600 hover:text-gray-900">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 64px - 64px)' }}>
              {cartItems.length === 0 ? (
                <p className="text-gray-700">Your cart is empty.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <li key={index} className="py-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900">{item.descripcion}</span>
                        <span>{item.precioDescuento}</span>
                        <button onClick={() => removeFromCart(index)} className="text-red-600 hover:text-red-800">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                      <div className="text-gray-700 text-sm mt-2">
                        <p><strong>Product:</strong> {item.option}</p>
                        <p><strong>Brand:</strong> {item.brand}</p>
                        <p><strong>DPI:</strong> {item.dpi}</p>
                        <p><strong>Sensitivity:</strong> {item.sensitivity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="p-4 border-t border-gray-300 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total: {cartItems.reduce((total, item) => total + parseFloat(item.precioDescuento), 0).toFixed(2)}$</span>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      {isNotificationVisible && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white border border-red-700 p-4 rounded-lg shadow-lg flex items-center">
          <FaTimesCircle className="text-white mr-2" />
          <span>Your cart is empty.</span>
        </div>
      )}
      <style jsx>{`
        .nav-item {
          position: relative;
          padding: 1rem 1.5rem;
          color: white;
          text-decoration: none;
          font-size: 1.125rem;
          display: flex;
          align-items: center;
          transition: all 0.3s ease-in-out;
        }
        .nav-item::before {
          content: '';
          position: absolute;
          width: 0;
          height: 3px;
          bottom: 0;
          left: 0;
          background-color: #3B82F6;
          visibility: hidden;
          transition: all 0.3s ease-in-out;
        }
        .nav-item:hover::before {
          visibility: visible;
          width: 100%;
        }
        .group:hover .nav-item::before {
          visibility: visible;
          width: 100%;
        }
        .icon-button {
          background-color: transparent;
          color: white;
          transition: all 0.3s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border: 2px solid transparent;
          border-radius: 8px;
        }
        .icon-button:hover {
          color: #3B82F6;
          border-color: #3B82F6;
        }
        .cart-panel {
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </header>
  );
};

Header.defaultProps = {
  cartItems: [],
};

export default Header;
