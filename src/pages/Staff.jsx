import React, { useState } from 'react';
import { Mail, GraduationCap, Clock, Award, User } from 'lucide-react';
import { getStaffForPublic, CATEGORIES } from '../data/staffData';
import { getImageUrl } from '../data/imageStore';
import './Pages.css';

const Staff = ({ activeDept = 'all' }) => {
  // Allow switching tabs/categories dynamically
  const [selectedDept, setSelectedDept] = useState(activeDept === 'all' ? 'all' : activeDept);

  React.useEffect(() => {
    setSelectedDept(activeDept === 'all' ? 'all' : activeDept);
  }, [activeDept]);

  const departments = [
    { id: 'all', label: 'All Staff' },
    ...CATEGORIES.map(cat => ({ id: cat.id, label: cat.label }))
  ];

  // Read staff from the shared data store (synced with admin panel)
  const staffData = getStaffForPublic();

  // Filter staff according to chosen department tab
  const filteredStaff = selectedDept === 'all'
    ? staffData
    : staffData.filter(s => s.dept === selectedDept);

  return (
    <div className="staff-page animate-fade-in">
      {/* Banner */}
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #4D7E1D 0%, #A1C038 100%)' }}>
        <div className="container header-container">
          <h1>Educational Staff</h1>
          <p>Meet our highly qualified and dedicated educators driving academic brilliance.</p>
        </div>
      </div>

      {/* Staff Grid */}
      <section className="section staff-list-section">
        <div className="container">
          {/* Cards Grid */}
          <div className="staff-grid">
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff, idx) => (
                <div className="staff-card" key={idx}>
                  <div className="staff-header-accent" style={{ backgroundColor: staff.dept === 'admin' ? '#E67E22' : '#4D7E1D' }}></div>
                  <div className="staff-avatar-wrapper">
                    {staff.imageId && getImageUrl(staff.imageId) ? (
                      <img src={getImageUrl(staff.imageId)} alt={staff.name} className="staff-avatar" />
                    ) : (
                      <div className="staff-avatar-placeholder" style={{ backgroundColor: staff.dept === 'admin' ? '#fdecdb' : '#eaf2e3', color: staff.dept === 'admin' ? '#E67E22' : '#4D7E1D' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{staff.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="staff-info-box">
                    <h3>{staff.name}</h3>
                    <span className="staff-role">{staff.role}</span>
                    
                    {staff.qualification && (
                      <div className="staff-detail-row">
                        <GraduationCap size={16} />
                        <span>{staff.qualification}</span>
                      </div>
                    )}

                    {staff.experience && (
                      <div className="staff-detail-row">
                        <Clock size={16} />
                        <span>{staff.experience}{staff.experience.includes('Years') ? ' of service' : ''}</span>
                      </div>
                    )}

                    {staff.email && (
                      <div className="staff-detail-row">
                        <Mail size={16} />
                        <a href={`mailto:${staff.email}`} className="staff-mail-link">{staff.email}</a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-staff-message">
                <p>No staff profiles listed for this category at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staff;
