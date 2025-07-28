import React, { useState, useEffect, useRef } from "react";
import './Header.css';
import DropdownSolutions from './DropdownMenu/Solutions/DropdownSolutions';
import DropdownSuporte from './DropdownMenu/Suport/DropdownSuporte';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 10) {
          headerRef.current.classList.add('scrolled');
        } else {
          headerRef.current.classList.remove('scrolled');
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="header-container">
        <div className="header-content">
          <div className="logo">
            <img src="/img/condolog.png" alt="Condolog - Gestão Condominial Inteligente" />
          </div>

          {/* Menu principal */}
          <nav className={`nav-links ${isMobile ? 'mobile-hidden' : ''}`}>
            <a href="/" className="nav-item">Início</a>
            
            <div className="dropdown-wrapper">
              <DropdownSolutions />
            </div>

            <div className="dropdown-wrapper">
              <DropdownSuporte />
            </div>

            <a href="/sobre" className="nav-item">Sobre nós</a>
          </nav>

          <div className={`auth-section ${isMobile ? 'mobile-hidden' : ''}`}>
            <button className="login-button">Login</button>
          </div>

          {/* Menu mobile - hamburger icon */}
          {isMobile && (
            <button 
              className={`hamburger-menu ${menuOpen ? 'open' : ''}`} 
              onClick={toggleMenu}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          )}
        </div>

        {/* Menu mobile - overlay e conteúdo */}
        {isMobile && (
          <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}>
            <div 
              className={`mobile-menu-content ${menuOpen ? 'open' : ''}`} 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <img src="/img/condolog.png" alt="Condolog" className="mobile-logo" />
              </div>
              
              <nav className="mobile-nav">
                <a href="/" className="mobile-nav-item" onClick={closeMenu}>Início</a>
                <DropdownSolutions mobile closeMenu={closeMenu} />
                <DropdownSuporte mobile closeMenu={closeMenu} />
                <a href="/sobre" className="mobile-nav-item" onClick={closeMenu}>Sobre nós</a>
              </nav>
              
              <div className="mobile-auth-buttons">
                <button className="mobile-login-button" onClick={closeMenu}>Login</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;