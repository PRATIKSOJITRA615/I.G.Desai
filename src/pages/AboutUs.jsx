import React from 'react';
import { Target, Compass, Award, Calendar, Users, Eye, Clock } from 'lucide-react';
import './Pages.css';

const AboutUs = () => {
  const milestones = [
    { year: "1985", title: "The Foundation", desc: "Started with a modest assembly of 60 primary students under the guidance of visionary educationalists." },
    { year: "2005", title: "Secondary Stream Integration", desc: "Recognized by Gujarat Secondary Education Board (GSEB) for class 8 to 10." },
    { year: "2012", title: "Higher Secondary Science & Commerce", desc: "Constructed dedicated physics, chemistry, biology, and computer laboratory facilities." },
    { year: "2018", title: "Vocational Skills Introduction", desc: "Inaugurated the computer literacy center and tailoring workshops for students." },
    { year: "2024", title: "Smart Campus & Digitalization", desc: "Equipped 100% of classrooms with audio-visual screens and fast campus fiber internet." }
  ];

  const management = [
    { name: "Shri R.K. Desai", role: "Managing Director & Trustee", bio: "25+ years of institutional design and social management in Surat." },
    { name: "Smt. Manjula Desai", role: "Principal (Secondary Stream)", bio: "National educationalist medalist with a passion for quality standards." },
    { name: "Dr. Sandip Patel", role: "Academic Advisor", bio: "Ph.D. in Child Psychology and counselor to state level educational institutions." }
  ];

  return (
    <div className="about-page animate-fade-in">
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #4D7E1D 0%, #A1C038 100%)' }}>
        <div className="container header-container">
          <h1>About Us</h1>
          <p>Rooted in heritage, driven by future innovation, transforming pupils to builders of the nation.</p>
        </div>
      </div>

      {/* Vision & Mission */}
      <section className="section vision-section">
        <div className="container vision-grid">
          <div className="vision-card">
            <div className="vision-icon"><Eye size={32} /></div>
            <h2>Our Vision</h2>
            <p>To be a premier center of holistic schooling, nurturing creative, ethical, and skilled student leaders capable of leading and serving society with wisdom, dignity, and compassion.</p>
          </div>

          <div className="vision-card">
            <div className="vision-icon"><Target size={32} /></div>
            <h2>Our Mission</h2>
            <p>Our mission is to foster comprehensive intellectual growth through GSEB standard guidelines, modern tools, practical vocational training, strong sports discipline, and moral values.</p>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="section history-section">
        <div className="container">
          <h2 className="section-title">Our Milestone Journey</h2>
          <p className="section-subtitle">A look back at the legacy of growth, development, and standard setting since our establishment.</p>

          <div className="timeline">
            {milestones.map((item, idx) => (
              <div className="timeline-item" key={idx}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management overview */}
      <section className="section management-section">
        <div className="container">
          <h2 className="section-title">Our Trustees & Management</h2>
          <p className="section-subtitle">The visionary leadership guiding I.G. Desai towards new milestones of educational success.</p>

          <div className="management-grid">
            {management.map((member, idx) => (
              <div className="management-card" key={idx}>
                <div className="management-avatar">
                  <Users size={40} />
                </div>
                <h3>{member.name}</h3>
                <span className="member-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Timings Section */}
      <section className="timings-section">
        <div className="container">
          <div className="timings-card">
            <div className="timings-title-wrapper">
              <Clock size={28} className="timings-icon" />
              <h2>School Timings</h2>
            </div>
            <p className="timings-subtitle">Our school operates in different time slots for various sections to ensure optimal learning environment</p>

            <div className="table-responsive">
              <table className="timings-table">
                <thead>
                  <tr>
                    <th>Days</th>
                    <th>Sulochana Balmandir<br />(Nursery & Junior)</th>
                    <th>Sulochana Balmandir<br />(Senior)</th>
                    <th>Primary</th>
                    <th>Secondary & Higher Secondary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="day-cell">Monday - Friday</div>
                    </td>
                    <td><span className="time-badge">7:35 AM - 11:35 AM</span></td>
                    <td><span className="time-badge">11:15 AM - 3:30 PM</span></td>
                    <td><span className="time-badge">7:00 AM - 12:30 PM</span></td>
                    <td><span className="time-badge">12:00 PM - 6:00 PM</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="day-cell sat">Saturday</div>
                    </td>
                    <td><span className="time-badge">7:35 AM - 10:15 AM</span></td>
                    <td><span className="time-badge">10:15 AM - 1:00 PM</span></td>
                    <td><span className="time-badge">11:10 AM - 4:25 PM</span></td>
                    <td><span className="time-badge">7:20 AM - 11:50 AM</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
