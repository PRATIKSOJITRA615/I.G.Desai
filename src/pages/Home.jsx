import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import dhavalbhaiImg from '../assets/Dhavalbhai.png';
import './Pages.css'; // We'll put all clean modular CSS for custom page styles in Pages.css

const Home = ({ setActivePage }) => {
  const values = [
    {
      title: "SATYA",
      description: "It evolves into an ethical concept about truthfulness and is considered an important virtue. It means being true and consistent with reality in one's thought, speech and action",
      icon: (
        <svg viewBox="0 0 100 100" className="val-custom-icon">
          <circle cx="50" cy="50" r="39" fill="white" stroke="#FF9200" strokeWidth="4" />
          {/* Scale Stand */}
          <line x1="50" y1="22" x2="50" y2="60" stroke="#5c5c5c" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="60" x2="68" y2="60" stroke="#5c5c5c" strokeWidth="3.5" strokeLinecap="round" />
          {/* Top Beam */}
          <line x1="24" y1="28" x2="76" y2="28" stroke="#5c5c5c" strokeWidth="3" strokeLinecap="round" />
          {/* Left Pan */}
          <path d="M24 28L15 48h18Z" fill="none" stroke="#5c5c5c" strokeWidth="2" strokeLinejoin="round" />
          <line x1="11" y1="48" x2="37" y2="48" stroke="#5c5c5c" strokeWidth="3" strokeLinecap="round" />
          {/* Right Pan */}
          <path d="M76 28L67 48h18Z" fill="none" stroke="#5c5c5c" strokeWidth="2" strokeLinejoin="round" />
          <line x1="63" y1="48" x2="89" y2="48" stroke="#5c5c5c" strokeWidth="3" strokeLinecap="round" />
          <text x="50" y="78" textAnchor="middle" fontStyle="italic" fontWeight="800" fontSize="11" fill="#333" fontFamily="Georgia, serif">सत्य</text>
        </svg>
      )
    },
    {
      title: "GYAN",
      description: "It is the knowledge and the wisdom that you get from the education and truth to build a career.",
      icon: (
        <svg viewBox="0 0 100 100" className="val-custom-icon">
          <circle cx="50" cy="50" r="39" fill="white" stroke="#FF9200" strokeWidth="4" />
          {/* Bulb Outer Shape */}
          <path d="M35 34c0-8.3 6.7-15 15-15s15 6.7 15 15c0 6-3 10-5 13v6H40v-6c-2-3-5-7-5-13z" fill="none" stroke="#5c5c5c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Bulb Base */}
          <line x1="42" y1="53" x2="58" y2="53" stroke="#5c5c5c" strokeWidth="3" strokeLinecap="round" />
          <line x1="45" y1="57" x2="55" y2="57" stroke="#5c5c5c" strokeWidth="3" strokeLinecap="round" />
          {/* Filament keyhole-like element */}
          <line x1="38" y1="34" x2="47" y2="34" stroke="#5c5c5c" strokeWidth="3" strokeLinecap="round" />
          <line x1="53" y1="34" x2="62" y2="34" stroke="#5c5c5c" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="34" r="3" fill="none" stroke="#5c5c5c" strokeWidth="2.5" />
          <line x1="50" y1="37" x2="50" y2="43" stroke="#5c5c5c" strokeWidth="3" strokeLinecap="round" />
          <text x="50" y="78" textAnchor="middle" fontStyle="italic" fontWeight="800" fontSize="11" fill="#333" fontFamily="Georgia, serif">ज्ञान</text>
        </svg>
      )
    },
    {
      title: "PURUSHARTH",
      description: "The concept of Purushartha basically indicates different values to be realized in human life through human efforts.",
      icon: (
        <svg viewBox="0 0 100 100" className="val-custom-icon">
          <circle cx="50" cy="50" r="39" fill="white" stroke="#FF9200" strokeWidth="4" />
          {/* Slope */}
          <line x1="22" y1="60" x2="74" y2="36" stroke="#5c5c5c" strokeWidth="3.5" strokeLinecap="round" />
          {/* Boulder (Circle with Rupee symbol) */}
          <circle cx="64" cy="32" r="9" fill="none" stroke="#5c5c5c" strokeWidth="2.5" />
          <line x1="60" y1="29" x2="68" y2="29" stroke="#5c5c5c" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="60" y1="32" x2="68" y2="32" stroke="#5c5c5c" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M62.5 29c2 0 3.5 1 3.5 2.5s-1.5 2.5-3.5 2.5h3.5" fill="none" stroke="#5c5c5c" strokeWidth="1.2" strokeLinecap="round" />
          {/* Pushing Man */}
          <circle cx="46" cy="36" r="3" fill="#5c5c5c" />
          <line x1="46" y1="39" x2="38" y2="49" stroke="#5c5c5c" strokeWidth="2.8" strokeLinecap="round" />
          {/* Extended arms pushing */}
          <line x1="44" y1="41" x2="56" y2="35" stroke="#5c5c5c" strokeWidth="2" strokeLinecap="round" />
          <line x1="43" y1="44" x2="55" y2="39" stroke="#5c5c5c" strokeWidth="2" strokeLinecap="round" />
          {/* Legs */}
          <line x1="38" y1="49" x2="30" y2="56" stroke="#5c5c5c" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="38" y1="49" x2="40" y2="52" stroke="#5c5c5c" strokeWidth="2.8" strokeLinecap="round" />
          <text x="50" y="78" textAnchor="middle" fontStyle="italic" fontWeight="800" fontSize="11" fill="#333" fontFamily="Georgia, serif">पुरुषार्थ</text>
        </svg>
      )
    },
    {
      title: "PRAKASH",
      description: "With the help of Satya, Gyan and Purusharth we can enlighten others life with our self.",
      icon: (
        <svg viewBox="0 0 100 100" className="val-custom-icon">
          <circle cx="50" cy="50" r="39" fill="white" stroke="#FF9200" strokeWidth="4" />
          {/* Diya Bowl */}
          <path d="M32 48h36c0 10-8 16-18 16s-18-6-18-16z" fill="none" stroke="#5c5c5c" strokeWidth="3" strokeLinejoin="round" />
          {/* Diya Flame */}
          <path d="M50 20c-1.5 8-0.5 18-0.5 28h1c0-10 1-20-0.5-28z" fill="#5c5c5c" stroke="#5c5c5c" strokeWidth="1" strokeLinecap="round" />
          <text x="50" y="78" textAnchor="middle" fontStyle="italic" fontWeight="800" fontSize="11" fill="#333" fontFamily="Georgia, serif">प्रकाश</text>
        </svg>
      )
    }
  ];





  return (
    <div className="home-page animate-fade-in">
      {/* Notice Board Ticker */}
      <div className="news-ticker">
        <div className="ticker-label">LATEST NOTICES</div>
        <div className="ticker-wrap">
          <div className="ticker-content">
            ✦ Board Exam Registrations for SSC and HSC 2026-27 are now open. Please submit forms before June 15. ✦ Summer Vocational Skill workshops starting from June 1st. ✦ Congratulations to Ahmedabad Science Exhibition winners! ✦
          </div>
        </div>
      </div>

      {/* Main Hero Slider */}
      <HeroCarousel />

      {/* Core Values Section */}
      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">Our Foundation & Core Values</h2>
          <p className="section-subtitle">The four pillars that define the ethos, learning, and character building of every student at I.G. Desai School.</p>
          
          <div className="values-grid">
            {values.map((val, idx) => (
              <div className="value-card" key={idx}>
                <div className="value-icon-container">
                  {val.icon}
                </div>
                <p className="value-desc-exact">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome & Principal Desk */}
      <section className="section welcome-section">
        <div className="container welcome-single-card">
          <div className="welcome-testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar-wrapper">
                <img src={dhavalbhaiImg} alt="Dhavalbhai Priyakantbhai Pandya" className="testimonial-avatar" />
              </div>
              <div className="testimonial-meta">
                <h3>DHAVALBHAI PRIYAKANTBHAI PANDYA</h3>
                <p>M.Com. (HDSA, PGDCA)</p>
              </div>
            </div>
            <div className="testimonial-bubble">
              <p>Education would be much more effective if its purpose was to ensure that by the time they leave school every boy and girl should know how much they do not know, and be imbued with a lifelong desire to know it.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

// Cute inline vector illustration representing graduation
const GraduationCapIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', maxWidth: '280px' }}>
    <circle cx="100" cy="100" r="80" fill="#4D7E1D" fillOpacity="0.1" />
    <path d="M100 45L40 75L100 105L160 75L100 45Z" fill="#4D7E1D" />
    <path d="M70 95V135C70 145 130 145 130 135V95" stroke="#4D7E1D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M150 78V125" stroke="#E67E22" strokeWidth="4" strokeLinecap="round" />
    <circle cx="150" cy="125" r="6" fill="#E67E22" />
  </svg>
);

export default Home;
