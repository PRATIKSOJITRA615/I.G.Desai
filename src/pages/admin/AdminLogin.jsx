import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const AdminLogin = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card animate-fade-in-up">
        <button 
          onClick={onBack} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#5A6E59' }}
        >
          <ArrowLeft size={16} /> Back to Website
        </button>
        
        <h2>Admin Portal Login</h2>
        <form onSubmit={handleSubmit} className="admin-form-group">
          <div>
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter admin username"
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password"
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          {error && <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
          <button type="submit" className="admin-login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
