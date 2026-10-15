import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Award, BookOpen, Star, Calendar } from 'lucide-react';
import homepageBg from '../assets/I.G.School_homepage.png';
import sensoryLabBg from '../assets/Sensory Lab.png';
import a1StudentsBg from '../assets/A1_students.png';
import toppersBg from '../assets/Topers.png';
import a2StudentsBg from '../assets/A2_students.png';
import chemistryLabBg from '../assets/chemistrylab.png';
import './HeroCarousel.css';

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef(null);

  // 8 gorgeous custom educational and student result banners
  // Designed with different proportions to demonstrate the aspect-ratio contain logic
  const banners = [
    {
      id: 1,
      title: "Welcome to I.G. Desai Vidyalay",
      subtitle: "Nurturing Minds, Shaping Futures since 1998",
      type: "landscape",
      bgGradient: "linear-gradient(to right, rgba(27, 44, 26, 0.95) 0%, rgba(44, 62, 43, 0.65) 45%, rgba(77, 126, 29, 0.15) 100%)",
      bgImage: homepageBg,
      accentColor: "#A1C038",
      textColor: "#FFFFFF",
      highlight: "",
      hideIllustration: true,
      isDarkText: false
    },
    {
      id: 2,
      title: "Congratulations to our SSC State Toppers!",
      subtitle: "Gujarat Board (GSEB) Excellence Awards",
      type: "portrait-rank", // Portrait certificate style
      bgGradient: "linear-gradient(135deg, #FFF9F1 0%, #FCF8F2 100%)",
      bgImage: a1StudentsBg,
      isCertificate: true,
      students: [
        { name: "Patel Aarav K.", rank: "1st in School", marks: "99.2% PR" },
        { name: "Mehta Ishita R.", rank: "2nd in School", marks: "98.7% PR" },
        { name: "Shah Dhyey N.", rank: "3rd in School", marks: "98.1% PR" }
      ],
      accentColor: "#E67E22",
      icon: <Award size={48} />
    },
    {
      id: 3,
      title: "Sensory Lab",
      subtitle: "Immersive virtual reality and interactive learning experiences",
      type: "landscape",
      bgGradient: "linear-gradient(to right, rgba(27, 79, 114, 0.9) 0%, rgba(77, 126, 29, 0.2) 100%)",
      bgImage: sensoryLabBg,
      accentColor: "#A1C038",
      highlight: "",
      hideIllustration: true,
      isDarkText: false,
      hideActions: true
    },
    {
      id: 4,
      title: "Golden Shield for Sports Excellence",
      subtitle: "Surat Inter-School Athletic Meet Winners",
      type: "portrait-rank", // Portrait height style
      bgGradient: "linear-gradient(135deg, #FCF8F2 0%, #FFF9F1 100%)",
      bgImage: toppersBg,
      isCertificate: true,
      students: [
        { name: "Athletic Relay Team", rank: "Gold Medalists", marks: "4x100m Under 17" },
        { name: "Parmar Yash M.", rank: "Best Athlete", marks: "100m & 200m Gold" }
      ],
      accentColor: "#4D7E1D",
      icon: <Award size={48} />
    },
    {
      id: 5,
      title: "Chemistry Lab",
      subtitle: "Exploring science, chemical reactions, and practical lab experiments",
      type: "landscape",
      bgGradient: "linear-gradient(to right, rgba(81, 46, 95, 0.9) 0%, rgba(161, 192, 56, 0.25) 100%)",
      bgImage: chemistryLabBg,
      accentColor: "#A1C038",
      highlight: "",
      hideIllustration: true,
      isDarkText: false
    },
    {
      id: 6,
      title: "HSC Science Stream High Achievers",
      subtitle: "Proudly Celebrating 100% School Passing Ratio",
      type: "portrait-rank",
      bgGradient: "linear-gradient(135deg, #FFF9F1 0%, #FCF8F2 100%)",
      bgImage: a2StudentsBg,
      isCertificate: true,
      students: [
        { name: "Desai Krish V.", rank: "A1 Grade", marks: "Chemistry & Physics 99/100" },
        { name: "Patel Drashti S.", rank: "A1 Grade", marks: "Mathematics 98/100" }
      ],
      accentColor: "#E67E22",
      icon: <Award size={48} />
    },
    {
      id: 7,
      title: "Annual Cultural Fest - 'Spandan'",
      subtitle: "A vibrant showcase of drama, music, and local art",
      type: "landscape",
      bgGradient: "linear-gradient(135deg, #78281F 0%, #E67E22 100%)",
      accentColor: "#E67E22",
      highlight: "Coming up on December 18-20",
      icon: <Calendar size={48} />
    },
    {
      id: 8,
      title: "Community Outreach & Social Service",
      subtitle: "Building empathy, duty, and character through actions",
      type: "landscape",
      bgGradient: "linear-gradient(135deg, #117A65 0%, #4D7E1D 100%)",
      accentColor: "#A1C038",
      highlight: "Recognized as Best Clean Campus",
      icon: <Star size={48} />
    }
  ];

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (isPlaying) {
      timeoutRef.current = setTimeout(
        () =>
          setCurrentIndex((prevIndex) =>
            prevIndex === banners.length - 1 ? 0 : prevIndex + 1
          ),
        6000 // Auto transition every 6 seconds
      );
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-section">
      <div className="carousel-container">
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div 
              key={banner.id}
              className={`carousel-slide ${isActive ? 'active' : ''}`}
              style={{ 
                // Set the padded container background color according to constraints
                backgroundColor: banner.type === 'portrait-rank' ? '#FCF8F2' : '#2C3E2B'
              }}
            >
              {banner.isCertificate ? (
                /* Portrait/Result Certificate Layout with exact containment and beautiful background padding */
                <div className="certificate-banner-wrapper">
                  {banner.bgImage ? (
                    <img 
                      src={banner.bgImage} 
                      alt={banner.title} 
                      className="certificate-image-render"
                    />
                  ) : (
                    <div className="certificate-card" style={{ borderColor: banner.accentColor }}>
                      <div className="certificate-badge" style={{ backgroundColor: banner.accentColor }}>
                        {banner.icon}
                      </div>
                      <h2>{banner.title}</h2>
                      <p className="cert-subtitle">{banner.subtitle}</p>
                      
                      <div className="toppers-list">
                        {banner.students.map((student, i) => (
                          <div className="topper-row" key={i}>
                            <span className="topper-badge">{i + 1}</span>
                            <div className="topper-details">
                              <h4>{student.name}</h4>
                              <p>{student.rank}</p>
                            </div>
                            <span className="topper-score" style={{ color: banner.accentColor }}>{student.marks}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="cert-footer">
                        <span>I.G. DESAI VIDYALAY HONOUR BOARD</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Wide Landscape School Promotion Banner */
                <div 
                  className="landscape-banner-wrapper" 
                  style={{ 
                    backgroundImage: banner.bgImage ? `${banner.bgGradient}, url(${banner.bgImage})` : banner.bgGradient,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay'
                  }}
                >
                  <div className="landscape-content" style={{ color: banner.isDarkText ? '#2C3E2B' : '#ffffff' }}>
                    {banner.highlight && (
                      <span 
                        className="badge" 
                        style={{ 
                          color: banner.isDarkText ? '#4D7E1D' : banner.accentColor,
                          backgroundColor: banner.isDarkText ? 'rgba(77, 126, 29, 0.1)' : 'rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {banner.highlight}
                      </span>
                    )}
                    <h2 className="banner-title" style={{ color: banner.isDarkText ? '#4D7E1D' : '#ffffff' }}>{banner.title}</h2>
                    <p className="banner-subtitle" style={{ color: banner.isDarkText ? '#5A6E59' : 'rgba(255, 255, 255, 0.9)' }}>{banner.subtitle}</p>
                  </div>
                  {!banner.hideIllustration && (
                    <div className="landscape-illustration">
                      {banner.icon}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Controls */}
        <button className="control-btn prev" onClick={handlePrev} aria-label="Previous Slide">
          <ChevronLeft size={24} />
        </button>
        <button className="control-btn next" onClick={handleNext} aria-label="Next Slide">
          <ChevronRight size={24} />
        </button>

        {/* Action Panel Controls */}
        <div className="carousel-meta-controls">
          <button 
            className="play-pause-btn" 
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          
          <div className="dots-container">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`dot-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
