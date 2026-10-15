import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import schoolLogo from '../assets/logo.png';
import './Header.css';

const Header = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [eCornerOpen, setECornerOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { 
      id: 'staff', 
      label: 'Educational Staff', 
      hasDropdown: true,
      subItems: [
        { id: 'staff-trustees', label: 'Trustees' },
        { id: 'staff-pre-primary', label: 'Pre Primary' },
        { id: 'staff-primary', label: 'Primary' },
        { id: 'staff-secondary', label: 'Secondary' },
        { id: 'staff-higher-secondary', label: 'Higher Secondary' }
      ]
    },
    { id: 'events', label: 'Events / PR' },
    { id: 'vocational', label: 'Vocational Training' },
    { id: 'awards', label: 'Awards' },
    { 
      id: 'ecorner', 
      label: 'E-Corner', 
      hasDropdown: true,
      subItems: [
        { id: 'ecorner-student', label: 'Student Corner' },
        { id: 'ecorner-teacher', label: 'Teacher Corner' },
        { id: 'ecorner-admin', label: 'Admin Corner' },
        { id: 'ecorner-parent', label: 'Parent Corner' },
        { id: 'ecorner-email', label: 'Email Login' }
      ]
    },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setECornerOpen(false);
    setStaffOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`global-header ${scrolled ? 'is-scrolled' : ''}`}>
      {/* Top Bar Contacts */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="contact-info">
            <a href="tel:+919727407789" className="contact-item">
              <Phone size={14} />
              <span>(+91) 9727407789</span>
            </a>
            <a href="mailto:igdesaividyalay@gmail.com" className="contact-item">
              <Mail size={14} />
              <span>igdesaividyalay@gmail.com</span>
            </a>
            <div className="contact-item hide-mobile">
              <MapPin size={14} />
              <span>Bhatar, Surat, Gujarat</span>
            </div>
          </div>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-1.022-1.074-1.826-2.099-2.099C19.558 3.5 12 3.5 12 3.5s-7.558 0-9.399.564C1.576 4.337.774 5.14.502 6.163 0 8.07 0 12 0 12s0 3.93.502 5.837c.272 1.022 1.074 1.826 2.099 2.099C4.442 20.5 12 20.5 12 20.5s7.558 0 9.399-.564c1.025-.273 1.827-1.077 2.099-2.099.502-1.907.502-5.837.502-5.837s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav className="nav-bar">
        <div className="container nav-content">
          {/* Logo / Brand */}
          <div className="logo-brand" onClick={() => handleNavClick('home')}>
            <img src={schoolLogo} alt="I.G. Desai Logo" className="logo-img" />
            <div className="logo-text">
              <h1 className="logo-title">I.G. DESAI</h1>
              <span className="logo-subtitle">Sarvoday Vidyasankul</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <ul className="nav-menu">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                const isECorner = link.id === 'ecorner';
                const isOpen = isECorner ? eCornerOpen : staffOpen;
                const setOpen = isECorner ? setECornerOpen : setStaffOpen;
                
                return (
                  <li 
                    key={link.id} 
                    className="nav-item dropdown"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    <button className={`nav-link dropdown-toggle ${(activePage.startsWith(link.id)) ? 'active' : ''}`}>
                      {link.label}
                      <ChevronDown size={14} className={`arrow-icon ${isOpen ? 'rotate' : ''}`} />
                    </button>
                    {isOpen && (
                      <ul className="dropdown-menu">
                        {link.subItems.map((sub) => (
                          <li key={sub.id}>
                            <button 
                              className={`dropdown-item ${activePage === sub.id ? 'active' : ''}`}
                              onClick={() => handleNavClick(sub.id)}
                            >
                              {sub.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={link.id} className="nav-item">
                  <button 
                    className={`nav-link ${activePage === link.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Hamburger Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="logo-brand" onClick={() => handleNavClick('home')}>
            <img src={schoolLogo} alt="I.G. Desai Logo" className="logo-img-mobile" />
            <h1 className="logo-title">I.G. DESAI</h1>
          </div>
          <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <ul className="mobile-nav-links">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              const isECorner = link.id === 'ecorner';
              const isOpen = isECorner ? eCornerOpen : staffOpen;
              const setOpen = isECorner ? setECornerOpen : setStaffOpen;

              return (
                <li key={link.id} className="mobile-nav-item">
                  <button 
                    className="mobile-nav-link has-submenu"
                    onClick={() => setOpen(!isOpen)}
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={16} className={`arrow-icon ${isOpen ? 'rotate' : ''}`} />
                  </button>
                  <ul className={`mobile-submenu ${isOpen ? 'show' : ''}`}>
                    {link.subItems.map((sub) => (
                      <li key={sub.id}>
                        <button 
                          className={`mobile-submenu-item ${activePage === sub.id ? 'active' : ''}`}
                          onClick={() => handleNavClick(sub.id)}
                        >
                          {sub.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={link.id} className="mobile-nav-item">
                <button 
                  className={`mobile-nav-link ${activePage === link.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>
        
        <div className="mobile-drawer-footer">
          <div className="drawer-contact">
            <Phone size={14} />
            <span>(+91) 9727407789</span>
          </div>
          <div className="drawer-contact">
            <Mail size={14} />
            <span>igdesaividyalay@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
