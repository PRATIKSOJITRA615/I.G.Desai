import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import schoolLogo from '../assets/logo.png';
import './Footer.css';

const Footer = ({ setActivePage }) => {
  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="global-footer">
      <div className="container footer-grid">
        {/* About column */}
        <div className="footer-col about-col">
          <div className="footer-logo" onClick={() => handleNavClick('home')}>
            <img src={schoolLogo} alt="I.G. Desai Logo" className="footer-logo-img" />
            <div className="logo-text">
              <h3>I.G. DESAI</h3>
              <span>Vidyalay</span>
            </div>
          </div>
          <p className="about-text">Empowering students in Surat with qualitative GSEB secondary curriculum standards and practical, modern vocational training workshops.</p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook" aria-label="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube" aria-label="YouTube">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-1.022-1.074-1.826-2.099-2.099C19.558 3.5 12 3.5 12 3.5s-7.558 0-9.399.564C1.576 4.337.774 5.14.502 6.163 0 8.07 0 12 0 12s0 3.93.502 5.837c.272 1.022 1.074 1.826 2.099 2.099C4.442 20.5 12 20.5 12 20.5s7.558 0 9.399-.564c1.025-.273 1.827-1.077 2.099-2.099.502-1.907.502-5.837.502-5.837s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=I.G.+Desai+School+Bhatar+Road+Near+Althan+Tenaments+Surat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon map-social-icon"
              title="View on Map"
              aria-label="View on Map"
            >
              <MapPin size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links column */}
        <div className="footer-col links-col">
          <h4>Academic Links</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => handleNavClick('home')}>Home Overview</button></li>
            <li><button onClick={() => handleNavClick('about')}>About Us & Vision</button></li>
            <li><button onClick={() => handleNavClick('staff')}>Staff Faculty</button></li>
            <li><button onClick={() => handleNavClick('events')}>Events / PR Grid</button></li>
            <li><button onClick={() => handleNavClick('blog')}>Blog Articles</button></li>
            <li><button onClick={() => handleNavClick('vocational')}>Vocational Skills</button></li>
          </ul>
        </div>

        {/* Student Links column */}
        <div className="footer-col links-col">
          <h4>Student Corner</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => handleNavClick('ecorner-portal')}>Performance Dashboard</button></li>
            <li><button onClick={() => handleNavClick('ecorner-syllabus')}>Syllabus Syllabus</button></li>
            <li><button onClick={() => handleNavClick('ecorner-calendar')}>Academic Calendar</button></li>
            <li><button onClick={() => handleNavClick('awards')}>School Achievements</button></li>
            <li><button onClick={() => handleNavClick('contact')}>Admission Help</button></li>
          </ul>
        </div>

        {/* Contact coordinates column */}
        <div className="footer-col contacts-col">
          <h4>Quick Coordinates</h4>
          <ul className="footer-contacts-list">
            <li>
              <MapPin size={18} />
              <span>Bhatar Road, Near Althan Tenaments, Bhatar, Surat, Gujarat - 395017</span>
            </li>
            <li>
              <Phone size={18} />
              <a href="tel:+919727407789">(+91) 9727407789</a>
            </li>
            <li>
              <Mail size={18} />
              <a href="mailto:igdesaividyalay@gmail.com">igdesaividyalay@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar Rights */}
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>© {new Date().getFullYear()} I.G. Desai Vidyalay. All Rights Reserved.</p>
          <p className="credits">Designed & Developed by expert Senior React Developers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
