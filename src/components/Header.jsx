import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import wzLogo from '../assets/Categorias/wzlogo.png';
import valorantLogo from '../assets/Categorias/valorantlogo.jpg';
import csgoLogo from '../assets/Categorias/csgologo.jpg';
import fortniteLogo from '../assets/Categorias/fortnitelogo.jpg';
import xdefiantLogo from '../assets/Categorias/xdefiantlogo.png';
import theFinalsLogo from '../assets/Categorias/thefinalslogo.webp';

const Header = () => {
  const [isSmall, setIsSmall] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isProductsSubmenuVisible, setIsProductsSubmenuVisible] = useState(false);
  const hideDropdownTimeout = useRef(null);
  const hideDropdownDelay = 300; // Tiempo de retraso en ms
  const mobileMenuRef = useRef(null);

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
  }, [lastScrollY, isMobileMenuVisible]);

  const handleMouseEnter = () => {
    clearTimeout(hideDropdownTimeout.current);
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    hideDropdownTimeout.current = setTimeout(() => {
      setIsDropdownVisible(false);
    }, hideDropdownDelay);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  const toggleProductsSubmenu = () => {
    setIsProductsSubmenuVisible(!isProductsSubmenuVisible);
  };

  const handleClickOutside = (event) => {
    if (isMobileMenuVisible && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-button')) {
      setIsMobileMenuVisible(false);
      setIsProductsSubmenuVisible(false);
    }
  };

  return (
    <header className={`bg-gray-900 shadow-md fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out ${isSmall ? 'py-1' : 'py-4'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 transition-all duration-300 ease-in-out">
        <div className="transition-all duration-300 ease-in-out">
          <div className="text-xl md:text-2xl font-bold text-blue-500" style={{ fontFamily: '"Press Start 2P", cursive' }}>EdgeScripts</div>
          {!isSmall && <div className="text-xs md:text-sm text-gray-400 transition-opacity duration-300 ease-in-out">Vanguard in Scripts</div>}
        </div>
        <nav className="hidden md:flex space-x-4 md:space-x-12 font-play relative text-sm md:text-lg items-center">
          <Link to="/" className="nav-item">Inicio</Link>
          <div 
            className="relative group" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/products" className="nav-item" onMouseEnter={handleMouseEnter}>Products</Link>
            {isDropdownVisible && (
              <div 
                className="absolute left-0 top-full w-40 md:w-56 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-0 translate-y-2"
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
                  <li>
                    <Link to="/products/valorant" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <img src={valorantLogo} alt="Valorant" className="w-6 h-6 mr-3 transition-transform duration-300 ease-in-out hover:scale-110" />
                      Valorant
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/csgo" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <img src={csgoLogo} alt="Counter-Strike" className="w-6 h-6 mr-3 transition-transform duration-300 ease-in-out hover:scale-110" />
                      Counter-Strike
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/fortnite" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <img src={fortniteLogo} alt="Fortnite" className="w-6 h-6 mr-3 transition-transform duration-300 ease-in-out hover:scale-110" />
                      Fortnite
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/xdefiant" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <img src={xdefiantLogo} alt="XDefiant" className="w-6 h-6 mr-3 transition-transform duration-300 ease-in-out hover:scale-110" />
                      XDefiant
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/thefinals" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <img src={theFinalsLogo} alt="The Finals" className="w-6 h-6 mr-3 transition-transform duration-300 ease-in-out hover:scale-110" />
                      The Finals
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <a href="#nosotros" className="nav-item">Nosotros</a>
          <a href="#contacto" className="nav-item">Contacto</a>
        </nav>
        <div className="hidden md:flex space-x-8 font-play"> {/* Incrementa el espacio entre los íconos */}
          <button className="icon-button">
            <i className="fas fa-user-circle text-3xl"></i>
          </button>
          <button className="icon-button">
            <i className="fas fa-shopping-cart text-3xl"></i>
          </button>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <button className="icon-button">
            <i className="fas fa-user-circle text-3xl"></i>
          </button>
          <button className="icon-button">
            <i className="fas fa-shopping-cart text-3xl"></i>
          </button>
          <button onClick={toggleMobileMenu} className="icon-button mobile-menu-button">
            <i className="fas fa-bars text-3xl"></i>
          </button>
        </div>
      </div>
      {isMobileMenuVisible && (
        <div ref={mobileMenuRef} className="mobile-menu md:hidden absolute left-0 top-full bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          style={{ opacity: isMobileMenuVisible ? 1 : 0, transform: isMobileMenuVisible ? 'translateY(0)' : 'translateY(10px)', margin: '0 20px', width: 'calc(100% - 40px)' }}> {/* Ajusta el margen y el ancho */}
          <nav className="flex flex-col py-2">
            <Link to="/" className="block py-2 pl-6 pr-4 hover:bg-gray-100 transition-colors duration-300">Inicio</Link> {/* Ajusta el padding izquierdo */}
            <button onClick={toggleProductsSubmenu} className="block py-2 pl-6 pr-4 text-left hover:bg-gray-100 transition-colors duration-300 flex justify-between items-center"> {/* Ajusta el padding izquierdo */}
              Products
              <i className={`fas ${isProductsSubmenuVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            {isProductsSubmenuVisible && (
              <div className="pl-10 transition-all duration-300 ease-in-out"> {/* Ajusta el padding izquierdo */}
                <Link to="/products/warzone" className="block py-2 pl-4 pr-4 hover:bg-gray-100 transition-colors duration-300 flex items-center">
                  <img src={wzLogo} alt="Warzone" className="w-6 h-6 mr-3" />
                  Warzone
                </Link>
                <Link to="/products/valorant" className="block py-2 pl-4 pr-4 hover:bg-gray-100 transition-colors duration-300 flex items-center">
                  <img src={valorantLogo} alt="Valorant" className="w-6 h-6 mr-3" />
                  Valorant
                </Link>
                <Link to="/products/csgo" className="block py-2 pl-4 pr-4 hover:bg-gray-100 transition-colors duration-300 flex items-center">
                  <img src={csgoLogo} alt="Counter-Strike" className="w-6 h-6 mr-3" />
                  Counter-Strike
                </Link>
                <Link to="/products/fortnite" className="block py-2 pl-4 pr-4 hover:bg-gray-100 transition-colors duration-300 flex items-center">
                  <img src={fortniteLogo} alt="Fortnite" className="w-6 h-6 mr-3" />
                  Fortnite
                </Link>
                <Link to="/products/xdefiant" className="block py-2 pl-4 pr-4 hover:bg-gray-100 transition-colors duration-300 flex items-center">
                  <img src={xdefiantLogo} alt="XDefiant" className="w-6 h-6 mr-3" />
                  XDefiant
                </Link>
                <Link to="/products/thefinals" className="block py-2 pl-4 pr-4 hover:bg-gray-100 transition-colors duration-300 flex items-center">
                  <img src={theFinalsLogo} alt="The Finals" className="w-6 h-6 mr-3" />
                  The Finals
                </Link>
              </div>
            )}
            <Link to="#nosotros" className="block py-2 pl-6 pr-4 hover:bg-gray-100 transition-colors duration-300">Nosotros</Link> {/* Ajusta el padding izquierdo */}
            <Link to="#contacto" className="block py-2 pl-6 pr-4 hover:bg-gray-100 transition-colors duration-300">Contacto</Link> {/* Ajusta el padding izquierdo */}
          </nav>
        </div>
      )}
      <style jsx>{`
        .nav-item {
          position: relative;
          padding: 1rem 1.5rem; /* Aumenta el área de hover */
          color: white;
          text-decoration: none;
          font-size: 1.125rem; /* Aumenta el tamaño de la fuente */
          display: flex;
          align-items: center; /* Alinea los elementos verticalmente */
          transition: all 0.3s ease-in-out;
        }
        .nav-item::before {
          content: '';
          position: absolute;
          width: 0;
          height: 3px;
          bottom: 0;
          left: 0;
          background-color: #3B82F6; /* Color azul del logo */
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
        }
        .icon-button:hover {
          color: #1E3A8A; /* Cambia el color al azul oscuro */
          border: 2px solid #1E3A8A; /* Añade un borde azul oscuro */
          border-radius: 8px; /* Hace el fondo redondeado */
          background-color: transparent; /* Fondo transparente */
        }
      `}</style>
    </header>
  );
};

export default Header;
