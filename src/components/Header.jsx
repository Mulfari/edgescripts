import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaUserCircle, FaShoppingCart, FaBars } from 'react-icons/fa';
import wzLogo from '../assets/Categorias/wzlogo.png';
import { useAuth } from '../AuthContext';

const Header = ({ cartItems, removeFromCart }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSmall, setIsSmall] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSupportDropdownVisible, setIsSupportDropdownVisible] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isProductsSubmenuVisible, setIsProductsSubmenuVisible] = useState(false);
  const [isSupportSubmenuVisible, setIsSupportSubmenuVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const hideDropdownTimeout = useRef(null);
  const hideDropdownDelay = 300;
  const mobileMenuRef = useRef(null);
  const cartRef = useRef(null);
  const userMenuRef = useRef(null);

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
  }, [lastScrollY, isMobileMenuVisible, isCartVisible, isUserMenuVisible]);

  const handleClickOutside = (event) => {
    if (isMobileMenuVisible && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-button')) {
      setIsMobileMenuVisible(false);
      setIsProductsSubmenuVisible(false);
      setIsSupportSubmenuVisible(false);
    }

    if (isCartVisible && cartRef.current && !cartRef.current.contains(event.target) && !event.target.closest('.icon-button')) {
      setIsCartVisible(false);
    }

    if (isUserMenuVisible && userMenuRef.current && !userMenuRef.current.contains(event.target) && !event.target.closest('.user-icon-button')) {
      setIsUserMenuVisible(false);
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

  const toggleUserMenu = () => {
    if (user) {
      setIsUserMenuVisible(!isUserMenuVisible);
    } else {
      navigate('/login');
    }
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

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuVisible(false);
    setIsProductsSubmenuVisible(false);
    setIsSupportSubmenuVisible(false);
  };

  const closeCart = () => {
    setIsCartVisible(false);
  };

  return (
    <header className={`bg-gray-900 shadow-md fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out ${isSmall ? 'py-1' : 'py-4'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-6 transition-all duration-300 ease-in-out">
        <div className="transition-all duration-300 ease-in-out">
          <div className="text-xl lg:text-2xl font-bold text-blue-500" style={{ fontFamily: '"Press Start 2P", cursive' }}>EdgeScripts</div>
          {!isSmall && <div className="text-xs lg:text-sm text-gray-400 transition-opacity duration-300 ease-in-out whitespace-nowrap">Vanguard in Scripts</div>}
        </div>
        <nav className="hidden lg:flex space-x-4 lg:space-x-12 font-play relative text-sm lg:text-lg items-center reduced-spacing">
          <Link to="/" className="nav-item">Home</Link>
          <div 
            className="relative group" 
            onMouseEnter={() => setIsDropdownVisible(true)} 
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <Link to="/products" className="nav-item" onMouseEnter={() => setIsDropdownVisible(true)}>Products</Link>
            {isDropdownVisible && (
              <div 
                className="absolute left-0 top-full w-64 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-0 translate-y-2"
                onMouseEnter={() => setIsDropdownVisible(true)}
                onMouseLeave={() => setIsDropdownVisible(false)}
                style={{ opacity: isDropdownVisible ? 1 : 0, transform: isDropdownVisible ? 'translateY(0)' : 'translateY(10px)' }}
              >
                <ul className="py-2">
                  <li>
                    <Link to="/products/warzone" className="dropdown-item flex items-center warzone-link">
                      <img src={wzLogo} alt="Warzone" className="w-6 h-6 mr-3 transition-transform duration-300 ease-in-out hover:scale-110" />
                      Warzone
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <a href="#how-to-install" className="nav-item single-line">How to install</a>
          <div 
            className="relative group" 
            onMouseEnter={() => setIsSupportDropdownVisible(true)} 
            onMouseLeave={() => setIsSupportDropdownVisible(false)}
          >
            <Link to="#support" className="nav-item" onMouseEnter={() => setIsSupportDropdownVisible(true)}>Support</Link>
            {isSupportDropdownVisible && (
              <div 
                className="absolute left-0 top-full w-64 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-0 translate-y-2"
                onMouseEnter={() => setIsSupportDropdownVisible(true)}
                onMouseLeave={() => setIsSupportDropdownVisible(false)}
                style={{ opacity: isSupportDropdownVisible ? 1 : 0, transform: isSupportDropdownVisible ? 'translateY(0)' : 'translateY(10px)' }}
              >
                <ul className="py-2">
                  <li>
                    <Link to="/support/faq" className="dropdown-item flex items-center support-link">
                      <i className="fas fa-question-circle mr-3"></i>
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/support/contact" className="dropdown-item flex items-center support-link">
                      <i className="fas fa-envelope mr-3"></i>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/support/terms" className="dropdown-item flex items=center support-link whitespace-nowrap">
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
          <button className="icon-button relative" onClick={toggleCart}>
            <FaShoppingCart className="text-3xl hover:text-blue-500 transition duration-300" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{cartItems.length}</span>
            )}
          </button>
          <div className="relative">
            <button className="icon-button user-icon-button" onClick={toggleUserMenu}>
              <FaUserCircle className="text-3xl text-white hover:text-blue-500 transition duration-300" />
            </button>
            {user && isUserMenuVisible && (
              <div ref={userMenuRef} className="absolute top-full right-0 mt-2 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
                <button onClick={() => { navigate('/dashboard'); closeMobileMenu(); }} className="dashboard-link">Dashboard</button>
                <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="logout-button">Logout</button>
              </div>
            )}
          </div>
        </div>
        <div className="lg:hidden flex items-center space-x-4">
          <button className="icon-button relative" onClick={toggleCart}>
            <FaShoppingCart className="text-3xl hover:text-blue-500 transition duration-300" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{cartItems.length}</span>
            )}
          </button>
          <div className="relative">
            <button className="icon-button user-icon-button" onClick={toggleUserMenu}>
              <FaUserCircle className="text-3xl text-white hover:text-blue-500 transition duration-300" />
            </button>
            {user && isUserMenuVisible && (
              <div ref={userMenuRef} className="absolute top-full right-0 mt-2 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
                <button onClick={() => { navigate('/dashboard'); closeMobileMenu(); }} className="dashboard-link">Dashboard</button>
                <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="logout-button">Logout</button>
              </div>
            )}
          </div>
          <button onClick={toggleMobileMenu} className="icon-button mobile-menu-button">
            <FaBars className="text-3xl hover:text-blue-500 transition duration-300" />
          </button>
        </div>
      </div>
      {isMobileMenuVisible && (
        <div ref={mobileMenuRef} className="mobile-menu lg:hidden absolute left-0 top-full bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          style={{ opacity: isMobileMenuVisible ? 1 : 0, transform: isMobileMenuVisible ? 'translateY(0)' : 'translateY(10px)', margin: '0 20px', width: 'calc(100% - 40px)' }}>
          <nav className="flex flex-col py-2">
            <Link to="/" className="hamburger-menu-item" onClick={closeMobileMenu}>Home</Link>
            <button onClick={toggleProductsSubmenu} className="hamburger-menu-item text-left flex justify-between items-center">
              Products
              <i className={`fas ${isProductsSubmenuVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            {isProductsSubmenuVisible && (
              <div className="pl-10 transition-all duration-300 ease-in-out">
                <Link to="/products/warzone" className="hamburger-menu-item flex items-center warzone-link" onClick={closeMobileMenu}>
                  <img src={wzLogo} alt="Warzone" className="w-6 h-6 mr-3" />
                  Warzone
                </Link>
              </div>
            )}
            <Link to="#how-to-install" className="hamburger-menu-item single-line" onClick={closeMobileMenu}>How to install</Link>
            <button onClick={toggleSupportSubmenu} className="hamburger-menu-item text-left flex justify-between items-center">
              Support
              <i className={`fas ${isSupportSubmenuVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            {isSupportSubmenuVisible && (
              <div className="pl-10 transition-all duration-300 ease-in-out">
                <Link to="/support/faq" className="hamburger-menu-item flex items-center support-link" onClick={closeMobileMenu}>
                  <i className="fas fa-question-circle mr-3"></i>
                  FAQ
                </Link>
                <Link to="/support/contact" className="hamburger-menu-item flex items-center support-link" onClick={closeMobileMenu}>
                  <i className="fas fa-envelope mr-3"></i>
                  Contact
                </Link>
                <Link to="/support/terms" className="hamburger-menu-item flex items=center support-link whitespace-nowrap" onClick={closeMobileMenu}>
                  <i className="fas fa-file-contract mr-3"></i>
                  Terms and Conditions
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
      {isCartVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40" onClick={closeCart}>
          <div ref={cartRef} className={`cart-panel fixed top-0 right-0 w-80 bg-white shadow-2xl h-full z-50 rounded-l-lg transition-transform transform ${isCartVisible ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
              <button onClick={closeCart} className="text-gray-600 hover:text-gray-900">
                <FaTimesCircle className="text-xl" />
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
                          <FaTimesCircle />
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
          border-bottom: 3px solid transparent; /* Inicialmente transparente */
        }
        .nav-item:hover {
          border-bottom: 3px solid #3B82F6; /* Cambia el color al hacer hover */
        }
        .group:hover .nav-item {
          border-bottom: 3px solid #3B82F6; /* Asegura que el borde aparezca al hover en el grupo */
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
        @media (max-width: 1024px) {
          .nav-item {
            font-size: 1rem;
            padding: 0.75rem 1rem;
          }
        }
        @media (max-width: 768px) {
          .nav-item {
            font-size: 0.875rem;
            padding: 0.5rem 0.75rem;
          }
        }
        .single-line {
          white-space: nowrap;
        }
        .reduced-spacing .nav-item {
          padding: 0.75rem 1rem;
        }
        @media (max-width: 768px) {
          .reduced-spacing .nav-item {
            padding: 0.5rem 0.75rem;
          }
        }
        .dashboard-link,
        .logout-button {
          display: block;
          width: 100%;
          padding: 0.5rem 1rem;
          text-align: left;
          color: #1f2937;
          background-color: transparent;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
          border-radius: 0.5rem;
        }
        .dashboard-link:hover,
        .logout-button:hover {
          background-color: #f3f4f6;
          border: 1px solid #1f2937;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        .warzone-link,
        .support-link {
          color: black;
        }
        .hamburger-menu-item {
          position: relative;
          padding: 1rem 1.5rem;
          color: #1f2937;
          text-decoration: none;
          font-size: 1rem;
          display: flex;
          align-items: center;
          transition: all 0.3s ease-in-out;
          border-radius: 0.5rem;
          background-color: transparent;
        }
        .hamburger-menu-item:hover {
          background-color: #f3f4f6;
          border: 1px solid #1f2937;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        .dropdown-item {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease-in-out;
        }
        .dropdown-item:hover {
          background-color: #f3f4f6;
          border: 1px solid #1f2937;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </header>
  );
};

Header.defaultProps = {
  cartItems: [],
};

export default Header;
