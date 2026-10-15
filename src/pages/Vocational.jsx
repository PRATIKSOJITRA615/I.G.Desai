import React from 'react';
import { Cpu, Scissors, ShieldAlert, Award, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import './Pages.css';

const Vocational = () => {
  const courses = [
    {
      title: "Computer Literacy & Coding",
      duration: "6 Months Program",
      desc: "Covers standard MS Office packages, digital accounting with Tally, basic web development using HTML/CSS, and scratch block programming for young thinkers.",
      icon: <Cpu size={28} />,
      benefits: ["1:1 Computer Access", "Certified by State Board", "Hands-on Programming Labs"],
      accent: "#4D7E1D"
    },
    {
      title: "Tailoring, Embroidery & Fashion Craft",
      duration: "4 Months Program",
      desc: "Designed to teach pattern design, advanced machine tailoring, garment stitching, and traditional embroidery to secondary students, promoting self-sustenance.",
      icon: <Scissors size={28} />,
      benefits: ["Modern Sewing Stations", "Expert Artisanal Trainers", "Exhibition Showcase Space"],
      accent: "#E67E22"
    },
    {
      title: "Electronics & Smart IoT Labs",
      duration: "6 Months Program",
      desc: "Introduces breadboard setups, microcontrollers, basic circuit assembly, soldering, solar setups, and smart home automation frameworks.",
      icon: <Cpu size={28} />,
      benefits: ["Component Kits Provided", "Problem-based Experiments", "Certificate of Competence"],
      accent: "#A1C038"
    }
  ];

  return (
    <div className="vocational-page animate-fade-in">
      {/* Banner */}
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #4D7E1D 0%, #A1C038 100%)' }}>
        <div className="container header-container">
          <h1>Vocational Training</h1>
          <p>Equipping students with practical job-ready technical, design, and computational skills alongside standard GSEB curriculum.</p>
        </div>
      </div>

      {/* Intro overview */}
      <section className="section voc-intro-section">
        <div className="container voc-intro-grid">
          <div className="voc-intro-content">
            <h2>Bridging Academics with Industry-Ready Skills</h2>
            <p>At I.G. Desai Vidyalay, our main goal is to prepare students for real-world scenarios. We have integrated structured vocational modules inside the weekly timetables so that pupils learn manual, mechanical, and computational capabilities that help in their careers and higher studies.</p>
            
            <div className="key-feature-list">
              <div className="feature-item">
                <CheckCircle2 size={18} className="icon-green" />
                <span>Dedicated skill workshops and high-end machinery setups.</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={18} className="icon-green" />
                <span>State Board recognized course curriculum and certifications.</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={18} className="icon-green" />
                <span>Annual 'Skill Bazaar' exhibition to sell or demonstrate student creations.</span>
              </div>
            </div>
          </div>

          <div className="voc-quote-card">
            <div className="quote-badge"><Award size={32} /></div>
            <h3>Empowering Every Student</h3>
            <blockquote>"Skill development is the true engine of self-reliance. Our vocational labs offer children the confidence to turn theoretical learning into physical innovations."</blockquote>
            <span className="quote-author">— Managing Committee, I.G. Desai</span>
          </div>
        </div>
      </section>

      {/* Courses layout */}
      <section className="section voc-courses-section">
        <div className="container">
          <h2 className="section-title">Offered Skill Courses</h2>
          <p className="section-subtitle">A detailed look at standard courses structured into our higher primary and secondary stream calendars.</p>
          
          <div className="courses-list-layout">
            {courses.map((course, idx) => (
              <div className="course-row-card" key={idx}>
                <div className="course-icon-column" style={{ backgroundColor: course.accent }}>
                  {course.icon}
                  <span className="course-duration">{course.duration}</span>
                </div>
                
                <div className="course-details-column">
                  <h3>{course.title}</h3>
                  <p>{course.desc}</p>
                  
                  <div className="benefits-tags">
                    {course.benefits.map((benefit, i) => (
                      <span key={i} className="benefit-tag">
                        <ChevronRight size={12} />
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vocational;
