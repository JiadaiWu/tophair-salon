import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Update body lang attribute to apply Chinese fonts
  useEffect(() => {
    document.body.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle page navigation, ensure scroll to top
  const handlePageNavigation = (e, path) => {
    e.preventDefault();
    closeMenu();
    
    // Immediately scroll to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Then navigate to target page
    navigate(path);
    
    // For Gallery and Products pages, use forced scroll control
    if (path === '/gallery' || path === '/products') {
      // Immediately force scroll to top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Use multiple timing to force scroll to top
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };
      
      
      scrollToTop();
      
      
      setTimeout(scrollToTop, 0);
      setTimeout(scrollToTop, 5);
      setTimeout(scrollToTop, 10);
      setTimeout(scrollToTop, 20);
      setTimeout(scrollToTop, 50);
      setTimeout(scrollToTop, 100);
    } else {
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
    }
  };

  
  const handleAnchorClick = (e, anchorId) => {
    e.preventDefault();
    closeMenu();
    
    
    if (location.pathname !== '/') {
      navigate('/');
      
      const attempts = [50, 120, 200, 350];
      attempts.forEach((delay) => setTimeout(() => scrollToElement(anchorId), delay));
    } else {
      scrollToElement(anchorId);
    }
  };

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerEl = document.querySelector('.header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 80;
      const extraGap = 12;
      const targetTop = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraGap;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'instant' });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
            <div className="logo">
              <h1 className="etude-noire">TOP HAIR</h1>
            </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/" onClick={(e) => handlePageNavigation(e, '/')}>{t('nav.home')}</a>
            </li>
            <li className="nav-item">
              <a href="/portfolio" onClick={(e) => handlePageNavigation(e, '/portfolio')}>{t('nav.portfolio')}</a>
            </li>
            <li className="nav-item">
              <a href="/products" onClick={(e) => handlePageNavigation(e, '/products')}>{t('nav.products')}</a>
            </li>
            <li className="nav-item">
              <a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')}>{t('nav.contact')}</a>
            </li>
            <li className="nav-item">
              <a href="/booking" onClick={(e) => handlePageNavigation(e, '/booking')}>{t('nav.booking')}</a>
            </li>
            <li className="nav-item">
              <a href="/about" onClick={(e) => handlePageNavigation(e, '/about')}>{t('nav.about')}</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button 
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {t('language.switch')}
          </button>
          
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;