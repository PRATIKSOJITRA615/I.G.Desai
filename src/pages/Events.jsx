import React, { useState } from 'react';
import { Calendar, MapPin, Tag, Award } from 'lucide-react';
import { getBlogsForPublic, BLOG_CATEGORIES } from '../data/blogData';
import { getImageUrl } from '../data/imageStore';
import './Pages.css';

const Events = ({ setActivePage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Read blogs from the shared data store (synced with admin panel)
  const allBlogs = getBlogsForPublic();

  // Filter blogs according to chosen category tab
  const filteredBlogs = selectedCategory === 'all'
    ? allBlogs
    : allBlogs.filter(b => b.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Updates' },
    ...BLOG_CATEGORIES
  ];

  // Helper function to assign consistent accent colors
  const getAccentColor = (category) => {
    switch(category) {
      case 'Academic': return '#4D7E1D';
      case 'Sports': return '#E67E22';
      case 'Cultural': return '#A1C038';
      case 'Competitions': return '#2C3E2B';
      case 'Health & Wellness': return '#4D7E1D';
      case 'Social Outreach': return '#E67E22';
      case 'News & Announcements': return '#4D7E1D';
      case 'Blog Posts': return '#A1C038';
      default: return '#4D7E1D';
    }
  };

  return (
    <div className="events-page animate-fade-in">
      {/* Banner */}
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #4D7E1D 0%, #A1C038 100%)' }}>
        <div className="container header-container">
          <h1>Events & Press Relations</h1>
          <p>Read about recent achievements, functions, matches, and annual programs on campus.</p>
        </div>
      </div>

      {/* Selector Tabs */}
      <section className="section events-list-section">
        <div className="container">
          
          <div className="staff-tabs">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`staff-tab-btn ${selectedCategory === cat.label || (selectedCategory === 'all' && cat.id === 'all') ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id === 'all' ? 'all' : cat.label)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="events-grid">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, idx) => {
                const accent = getAccentColor(blog.category);
                const getDisplayImage = (b) => {
                  if (b.imageId) return getImageUrl(b.imageId);
                  if (b.filename) return `${b.filepath}${b.filename}`;
                  return null;
                };
                const displayImage = getDisplayImage(blog);

                return (
                  <div className="event-card" key={idx}>
                    {displayImage && (
                      <div className="event-card-image" style={{ height: '180px', overflow: 'hidden' }}>
                        <img src={displayImage} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <div className="event-card-header" style={{ backgroundColor: accent }}>
                      <span className="event-category-badge">{blog.category}</span>
                      <h3 className="event-title">{blog.title}</h3>
                    </div>
                    
                    <div className="event-card-body">
                      <div className="event-meta-line">
                        <Calendar size={14} />
                        <span>{blog.createdAt}</span>
                      </div>
                      
                      <div className="event-meta-line">
                        <MapPin size={14} />
                        <span>I.G. Desai Campus</span>
                      </div>
                      
                      <p className="event-description">{blog.content || "Click to read more about this update."}</p>
                    </div>
                    
                    <div className="event-card-footer">
                      <button 
                        className="btn-link" 
                        style={{ color: accent }}
                        onClick={() => setActivePage(`blog-${blog.id}`)}
                      >
                        Read Details →
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-staff-message">
                <p>No posts listed for this category at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
