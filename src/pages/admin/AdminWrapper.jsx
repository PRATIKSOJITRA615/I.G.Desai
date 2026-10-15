import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './Admin.css';

const AdminWrapper = ({ setActivePage }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const handleLogin = (username, password) => {
    // Temporary mock authentication
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setAdminUser({ username, role: 'admin' });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdminUser(null);
  };

  return (
    <div className="admin-layout">
      {!isLoggedIn ? (
        <AdminLogin onLogin={handleLogin} onBack={() => setActivePage('home')} />
      ) : (
        <AdminDashboard user={adminUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default AdminWrapper;
