import React from 'react';
import { Trophy, ShieldCheck, Award, Star, Compass } from 'lucide-react';
import './Pages.css';

const Awards = () => {
  const categories = [
    {
      title: "Institutional Honors",
      items: [
        { title: "Best Clean Campus Award 2024", givenBy: "Surat Municipal Corporation", desc: "Awarded for state-of-the-art waste classification and green solar powered campus solutions." },
        { title: "Outstanding Vocational Integration Medal", givenBy: "Gujarat State Skill Council", desc: "Recognized for our tailoring and computational certificate programs." }
      ],
      icon: <Trophy size={28} />,
      accent: "#4D7E1D"
    },
    {
      title: "Student Academic Merits",
      items: [
        { title: "GSEB Board District Top 3 Rankers", givenBy: "Surat Secondary Education Circle", desc: "Honored for producing SSC board passing score toppers with 99+ Percentile Ranks." },
        { title: "National Science Model Innovation Trophy", givenBy: "India Innovation Forum", desc: "Awarded to class 10 student team for automated farming soil tester project." }
      ],
      icon: <Star size={28} />,
      accent: "#E67E22"
    }
  ];

  return (
    <div className="awards-page animate-fade-in">
      {/* Banner */}
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #4D7E1D 0%, #A1C038 100%)' }}>
        <div className="container header-container">
          <h1>Institutional Awards & Laurels</h1>
          <p>A testimony to our persistent strive for academic excellence, social value structures, and innovative vocational teaching.</p>
        </div>
      </div>

      {/* Grid listing honors */}
      <section className="section honors-section">
        <div className="container">
          <div className="honors-container">
            {categories.map((cat, idx) => (
              <div className="honors-group" key={idx}>
                <div className="group-header">
                  <div className="group-icon" style={{ backgroundColor: cat.accent }}>
                    {cat.icon}
                  </div>
                  <h2>{cat.title}</h2>
                </div>
                
                <div className="honors-grid">
                  {cat.items.map((item, itemIdx) => (
                    <div className="honor-card" key={itemIdx} style={{ '--border-left-accent': cat.accent }}>
                      <div className="honor-icon-wrapper">
                        <Award size={20} style={{ color: cat.accent }} />
                      </div>
                      <div className="honor-body">
                        <h3>{item.title}</h3>
                        <span className="honor-issuer">Issued by: {item.givenBy}</span>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;
