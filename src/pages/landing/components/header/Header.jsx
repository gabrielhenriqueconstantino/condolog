import React, { useState, useEffect } from "react";
import '../../styles/Header.css';
import DropdownMenu from '../header/DropdownMenu/DropdownMenu';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verifica no carregamento
    handleResize();
    
    // Adiciona listener para redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Remove listener ao desmontar
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src="/img/condolog.png" alt="Condolog" />
        </div>

        {/* Hamburger Icon - aparece apenas em mobile */}
        {isMobile && (
          <button className="hamburger-menu" onClick={toggleMenu}>
            <div className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <div className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <div className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          </button>
        )}

        {/* Menu normal - desaparece em mobile */}
        <nav className={`nav-links ${isMobile ? 'mobile-hidden' : ''}`}>
          <div>
            <a href="/">Sobre nós</a>
          </div>

          <div className="dropdown">
            <DropdownMenu />
          </div>

          <div className="dropdown">
            <button className="dropbtn">Conteúdos ▾</button>
          </div>
        </nav>

        <div className={`login-section ${isMobile ? 'mobile-hidden' : ''}`}>
          <button className="login-button">Login</button>
        </div>

        {/* Menu mobile - aparece apenas quando aberto */}
        {isMobile && menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <a className="mobile-menu-item" href="/">Sobre nós</a>
              <DropdownMenu mobile />
              <button className="mobile-menu-item dropbtn">Conteúdos ▾</button>
              <button className="mobile-login-button">Login</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;