import React, { useState, useEffect } from 'react';
import { Users, Mail, FileText, LogOut } from 'lucide-react';
import StaffManager from './StaffManager';
import ContactViewer from './ContactViewer';
import BlogManager from './BlogManager';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState(() => {
    const path = window.location.pathname;
    if (path.includes('/admin/contactentries')) return 'contact';
    if (path.includes('/admin/blogmanagement')) return 'blog';
    return 'staff';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes('/admin/contactentries')) setActiveTab('contact');
      else if (path.includes('/admin/blogmanagement')) setActiveTab('blog');
      else setActiveTab('staff');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    let url = '/admin/staffmanagement';
    if (activeTab === 'contact') url = '/admin/contactentries';
    if (activeTab === 'blog') url = '/admin/blogmanagement';
    
    if (!window.location.pathname.startsWith(url)) {
      window.history.pushState(null, '', url);
    }
  }, [activeTab]);

  return (
    <>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>IG DESAI ADMIN</h2>
          <p style={{ fontSize: '0.8rem', color: '#aeb8ad', marginTop: '0.5rem' }}>Logged in as: {user?.username}</p>
        </div>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'staff' ? 'active' : ''} 
            onClick={() => setActiveTab('staff')}
          >
            <Users size={18} /> Staff Management
          </button>
          <button 
            className={activeTab === 'contact' ? 'active' : ''} 
            onClick={() => setActiveTab('contact')}
          >
            <Mail size={18} /> Contact Entries
          </button>
          <button 
            className={activeTab === 'blog' ? 'active' : ''} 
            onClick={() => setActiveTab('blog')}
          >
            <FileText size={18} /> Blog Management
          </button>
        </nav>
        <div className="admin-logout">
          <button onClick={onLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="admin-content-area">
        {activeTab === 'staff' && <StaffManager />}
        {activeTab === 'contact' && <ContactViewer />}
        {activeTab === 'blog' && <BlogManager />}
      </main>
    </>
  );
};

export default AdminDashboard;
