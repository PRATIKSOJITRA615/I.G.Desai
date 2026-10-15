import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';
import { getStaffList, addStaff, deleteStaff, CATEGORIES } from '../../data/staffData';
import { saveImage, deleteImage } from '../../data/imageStore';

const StaffManager = () => {
  const [staffList, setStaffList] = useState(() => getStaffList());
  const [showForm, setShowForm] = useState(() => {
    return window.location.pathname.endsWith('/add');
  });
  const [formData, setFormData] = useState({ name: '', category: 'Primary', qualification: '', posttype: '', descriptions: '', image: '', sortno: 0 });
  const [imageFile, setImageFile] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setShowForm(window.location.pathname.endsWith('/add'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToggleForm = (show) => {
    setShowForm(show);
    const newUrl = show ? '/admin/staffmanagement/add' : '/admin/staffmanagement';
    if (window.location.pathname !== newUrl) {
      window.history.pushState(null, '', newUrl);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const imageId = await saveImage(imageFile);
    const updated = addStaff(staffList, { ...formData, imageId });
    setStaffList(updated);
    handleToggleForm(false);
    setFormData({ name: '', category: 'Primary', qualification: '', posttype: '', descriptions: '', image: '', sortno: 0 });
    setImageFile(null);
  };


  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
  };

  const handleDeleteConfirm = () => {
    const target = staffList.find(s => s.id === deleteTargetId);
    if (target && target.imageId) {
      deleteImage(target.imageId);
    }
    const updated = deleteStaff(staffList, deleteTargetId);
    setStaffList(updated);
    setDeleteTargetId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTargetId(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Staff Management</h1>
          <p style={{ color: '#5A6E59' }}>Manage educational staff entries and categories.</p>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => handleToggleForm(true)}>
            <Plus size={16} /> Add New Staff
          </button>
        )}
      </div>

      {showForm ? (
        <div className="admin-card animate-fade-in-up">
          <h3>Add Staff Member</h3>
          <form onSubmit={handleSave} className="admin-form-grid" style={{ marginTop: '1rem' }}>
            <div className="admin-form-group">
              <label>Full Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="admin-form-group">
              <label>Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.adminValue}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Qualification</label>
              <input type="text" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} />
            </div>
            <div className="admin-form-group">
              <label>Designation (Post Type)</label>
              <input type="text" value={formData.posttype} onChange={e => setFormData({...formData, posttype: e.target.value})} />
            </div>
            <div className="admin-form-group full-width">
              <label>Description</label>
              <textarea rows="3" value={formData.descriptions} onChange={e => setFormData({...formData, descriptions: e.target.value})}></textarea>
            </div>
            <div className="admin-form-group">
              <label>Profile Image / Thumbnail (Filename)</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="file" 
                  id="staff-image-upload" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setFormData({...formData, image: file.name});
                      setImageFile(file);
                    }
                  }} 
                />
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={e => setFormData({...formData, image: e.target.value})} 
                  placeholder="e.g. staff-photo.jpg (or click icon to select)" 
                  style={{ flex: 1 }} 
                />
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  style={{ padding: '0.5rem' }}
                  title="Choose image from device"
                  onClick={() => document.getElementById('staff-image-upload').click()}
                >
                  <ImageIcon size={18} />
                </button>
              </div>
            </div>
            <div className="admin-form-group">
              <label>Sort Number</label>
              <input type="number" value={formData.sortno} onChange={e => setFormData({...formData, sortno: e.target.value})} />
            </div>
            
            <div className="admin-form-actions full-width">
              <button type="button" className="btn btn-outline" onClick={() => handleToggleForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Staff Record</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Designation</th>
                <th>Qualification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map(staff => (
                <tr key={staff.id}>
                  <td style={{ fontWeight: 500 }}>{staff.name}</td>
                  <td>{staff.category}</td>
                  <td>{staff.posttype}</td>
                  <td>{staff.qualification}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }} onClick={() => handleDeleteClick(staff.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {staffList.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No staff records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteTargetId !== null}
        title="Delete Staff Record"
        message="Are you sure you want to delete this staff member? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default StaffManager;
