import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import './Pages.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'admission',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all the required fields (*).');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'admission',
      message: ''
    });
  };

  return (
    <div className="contact-page animate-fade-in">
      {/* Banner */}
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #4D7E1D 0%, #A1C038 100%)' }}>
        <div className="container header-container">
          <h1>Contact Us</h1>
          <p>Get in touch with our admissions desk, principal department, or administrative offices.</p>
        </div>
      </div>

      <section className="section contact-section">
        <div className="container contact-grid">
          {/* Coordinates Column */}
          <div className="contact-details-column">
            <h2>Institutional Coordinates</h2>
            <p>For immediate assistance regarding forms, documents, fee submissions, or credentials verification, reach out during office hours.</p>

            <div className="coords-list">
              <div className="coord-item">
                <div className="coord-icon"><MapPin size={22} /></div>
                <div>
                  <h4>Physical Location</h4>
                  <p>I.G. Desai School Campus, Bhatar Road, Near Althan Tenaments, Surat, Gujarat - 395017</p>
                </div>
              </div>

              <div className="coord-item">
                <div className="coord-icon"><Phone size={22} /></div>
                <div>
                  <h4>Official Telephone Hotlines</h4>
                  <p>
                    <a href="tel:+919727407789" className="coord-link">(+91) 9727407789</a>
                  </p>
                </div>
              </div>

              <div className="coord-item">
                <div className="coord-icon"><Mail size={22} /></div>
                <div>
                  <h4>Electronic Mail support</h4>
                  <p>
                    <a href="mailto:igdesaividyalay@gmail.com" className="coord-link">igdesaividyalay@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="coord-item">
                <div className="coord-icon"><Clock size={22} /></div>
                <div>
                  <h4>School Office Timings</h4>
                  <p>Monday - Saturday: 08:00 AM - 02:00 PM</p>
                  <p className="highlight-text">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="contact-form-column">
            <div className="form-card">
              <h2>Send an Inquiry</h2>

              {submitted ? (
                <div className="submission-success animate-fade-in">
                  <CheckCircle2 size={48} className="success-icon" />
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out to us. The administrative desk will inspect your inquiry details and get back to your email coordinates within 24-48 working hours.</p>
                  <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="inquiry-form">
                  {errorMsg && <p className="form-error">{errorMsg}</p>}

                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Patel Aarav"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. aarav@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Coordinates</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. +91 9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Inquiry Department</label>
                    <select name="subject" value={formData.subject} onChange={handleChange}>
                      <option value="admission">General Admissions Desk</option>
                      <option value="vocational">Vocational training courses</option>
                      <option value="staff">Principal Office & Staff Meeting</option>
                      <option value="complaints">Grievances & Suggestions</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message Content *</label>
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Type details of your request here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    <Send size={16} />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Embed Interactive Map Coordinates (Stylized mock) */}
      <section className="section map-section">
        <div className="container">
          <h2 className="section-title">Campus Map Location</h2>
          <div className="map-wrapper">
            <div className="map-mockup-frame">
              <MapPin size={48} className="map-marker" />
              <h3>I.G. DESAI CAMPUS</h3>
              <p>Bhatar, Surat, Gujarat 395017</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=I.G.+Desai+Campus+Bhatar+Surat+Gujarat+395017"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                Open Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
