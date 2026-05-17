import React, { useState } from 'react';

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ['home', 'about', 'services', 'gallery', 'contact'];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <a
            href="#home"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <img src="/yoga_Logo.svg" alt="Dey Yoga Classes Logo" />
            Dey Yoga Classes
          </a>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            <span className="mobile-menu-bar" />
            <span className="mobile-menu-bar" />
            <span className="mobile-menu-bar" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
