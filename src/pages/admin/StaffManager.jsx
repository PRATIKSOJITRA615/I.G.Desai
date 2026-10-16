import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Search, Filter } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';
import { getStaffList, addStaff, updateStaff, deleteStaff, CATEGORIES } from '../../data/staffData';
import { saveImage, deleteImage, getImageUrl } from '../../data/imageStore';

const StaffManager = () => {
  const [staffList, setStaffList] = useState(() => getStaffList());
  const [showForm, setShowForm] = useState(() => {
    return window.location.pathname.endsWith('/add') || window.location.pathname.endsWith('/edit');
  });
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Trustees',
    qualification: '',
    posttype: '',
    descriptions: '',
    image: '',
    sortno: 0,
    imageId: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (formData.imageId) {
      const url = getImageUrl(formData.imageId);
      setImagePreviewUrl(url || '');
    } else if (formData.image && (formData.image.startsWith('http') || formData.image.startsWith('/'))) {
      setImagePreviewUrl(formData.image);
    } else {
      setImagePreviewUrl('');
    }
  }, [imageFile, formData.imageId, formData.image]);

  useEffect(() => {
    const handlePopState = () => {
      const isAdd = window.location.pathname.endsWith('/add');
      const isEdit = window.location.pathname.endsWith('/edit');
      setShowForm(isAdd || isEdit);
      if (!isAdd && !isEdit) {
        setEditingStaffId(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToggleForm = (show, isEdit = false) => {
    setShowForm(show);
    const newUrl = show 
      ? (isEdit ? '/admin/staffmanagement/edit' : '/admin/staffmanagement/add')
      : '/admin/staffmanagement';
    if (window.location.pathname !== newUrl) {
      window.history.pushState(null, '', newUrl);
    }
  };

  const handleAddNewClick = () => {
    setEditingStaffId(null);
    setFormData({
      name: '',
      category: selectedCategory !== 'all' ? selectedCategory : 'Trustees',
      qualification: '',
      posttype: '',
      descriptions: '',
      image: '',
      sortno: staffList.length + 1,
      imageId: ''
    });
    setImageFile(null);
    const fileInput = document.getElementById('staff-image-upload');
    if (fileInput) fileInput.value = '';
    handleToggleForm(true, false);
  };

  const handleEditClick = (staff) => {
    setEditingStaffId(staff.id);
    setFormData({
      name: staff.name || '',
      category: staff.category || 'Trustees',
      qualification: staff.qualification || '',
      posttype: staff.posttype || '',
      descriptions: staff.descriptions || '',
      image: staff.image || '',
      sortno: staff.sortno ?? 0,
      imageId: staff.imageId || ''
    });
    setImageFile(null);
    const fileInput = document.getElementById('staff-image-upload');
    if (fileInput) fileInput.value = '';
    handleToggleForm(true, true);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setFormData(prev => ({
      ...prev,
      image: '',
      imageId: ''
    }));
    const fileInput = document.getElementById('staff-image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let finalImageId = formData.imageId;
    if (imageFile) {
      finalImageId = await saveImage(imageFile);
    }

    if (editingStaffId) {
      // If photo was changed or removed, delete previously stored image from localStorage
      const originalStaff = staffList.find(s => s.id === editingStaffId);
      if (originalStaff?.imageId && originalStaff.imageId !== finalImageId) {
        deleteImage(originalStaff.imageId);
      }

      // Update existing staff
      const updated = updateStaff(staffList, editingStaffId, {
        ...formData,
        imageId: finalImageId
      });
      setStaffList(updated);
    } else {
      // Add new staff
      const updated = addStaff(staffList, {
        ...formData,
        imageId: finalImageId
      });
      setStaffList(updated);
    }

    handleToggleForm(false);
    setEditingStaffId(null);
    setFormData({
      name: '',
      category: 'Trustees',
      qualification: '',
      posttype: '',
      descriptions: '',
      image: '',
      sortno: 0,
      imageId: ''
    });
    setImageFile(null);
    const fileInput = document.getElementById('staff-image-upload');
    if (fileInput) fileInput.value = '';
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

  // Distinct badge colors per category
  const getCategoryBadgeStyle = (category) => {
    switch (category) {
      case 'Trustees':
        return { backgroundColor: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' };
      case 'Pre-Primary':
        return { backgroundColor: '#fef3c7', color: '#b45309', borderColor: '#fde68a' };
      case 'Primary':
        return { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' };
      case 'Secondary':
        return { backgroundColor: '#f0fdf4', color: '#15803d', borderColor: '#bbf7d0' };
      case 'Higher Secondary':
        return { backgroundColor: '#f5f3ff', color: '#6d28d9', borderColor: '#ddd6fe' };
      case 'Principal':
        return { backgroundColor: '#fff7ed', color: '#c2410c', borderColor: '#ffedd5' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151', borderColor: '#e5e7eb' };
    }
  };

  // Filter staff by category tab and search input
  const filteredStaff = staffList.filter(staff => {
    const matchesCategory = selectedCategory === 'all' || staff.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      (staff.name && staff.name.toLowerCase().includes(q)) ||
      (staff.posttype && staff.posttype.toLowerCase().includes(q)) ||
      (staff.qualification && staff.qualification.toLowerCase().includes(q)) ||
      (staff.category && staff.category.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Staff Management</h1>
          <p style={{ color: '#5A6E59' }}>Manage educational staff entries, edit details, and organize by categories.</p>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={handleAddNewClick}>
            <Plus size={16} /> Add New Staff
          </button>
        )}
      </div>

      {showForm ? (
        <div className="admin-card animate-fade-in-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #edf2ed', paddingBottom: '1rem' }}>
            <h3>{editingStaffId ? `Edit Staff Member: ${formData.name || ''}` : 'Add New Staff Member'}</h3>
            <span style={{ fontSize: '0.85rem', color: '#5A6E59' }}>
              {editingStaffId ? 'Update details below and click Update' : 'Fill details below and assign to a category'}
            </span>
          </div>

          <form onSubmit={handleSave} className="admin-form-grid" style={{ marginTop: '1.5rem' }}>
            <div className="admin-form-group">
              <label>Full Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Dr. Naimesh Desai"
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>

            <div className="admin-form-group">
              <label>Category (Department) *</label>
              <select 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.adminValue}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label>Designation (Post Type)</label>
              <input 
                type="text" 
                placeholder="e.g. Principal, President, Senior Teacher"
                value={formData.posttype} 
                onChange={e => setFormData({...formData, posttype: e.target.value})} 
              />
            </div>

            <div className="admin-form-group">
              <label>Qualification</label>
              <input 
                type="text" 
                placeholder="e.g. M.Sc., B.Ed., M.Com."
                value={formData.qualification} 
                onChange={e => setFormData({...formData, qualification: e.target.value})} 
              />
            </div>

            <div className="admin-form-group full-width">
              <label>Description / Experience / Subject Specialty</label>
              <textarea 
                rows="3" 
                placeholder="e.g. 10 Years Experience | Subject: Science & Mathematics"
                value={formData.descriptions} 
                onChange={e => setFormData({...formData, descriptions: e.target.value})}
              ></textarea>
            </div>

            <div className="admin-form-group">
              <label>Profile Image / Thumbnail</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input 
                  type="file" 
                  id="staff-image-upload" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setFormData(prev => ({ ...prev, image: file.name }));
                      setImageFile(file);
                    }
                  }} 
                />
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={e => {
                    const val = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      image: val,
                      imageId: val === '' && !imageFile ? '' : prev.imageId
                    }));
                  }} 
                  placeholder="e.g. photo.jpg (or click browse)" 
                  style={{ flex: 1 }} 
                />
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  style={{ padding: '0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Choose image file from device"
                  onClick={() => document.getElementById('staff-image-upload').click()}
                >
                  <ImageIcon size={18} />
                </button>
              </div>

              {/* Image Preview & Remove Bar */}
              {imagePreviewUrl ? (
                <div className="admin-image-preview-bar">
                  <div className="admin-image-preview-info">
                    <img 
                      src={imagePreviewUrl} 
                      alt="Preview" 
                      className="admin-image-preview-thumb" 
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="admin-image-preview-title">
                        {imageFile ? 'New photo selected' : 'Current saved photo'}
                      </span>
                      {formData.image && (
                        <span className="admin-image-preview-filename">{formData.image}</span>
                      )}
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="admin-image-remove-btn"
                    onClick={handleRemoveImage}
                    title="Remove profile image"
                  >
                    <Trash2 size={13} />
                    <span>Remove Photo</span>
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#7a8c78', fontStyle: 'italic' }}>
                  No photo selected (initials avatar will be used)
                </div>
              )}
            </div>

            <div className="admin-form-group">
              <label>Sort Order Number</label>
              <input 
                type="number" 
                value={formData.sortno} 
                onChange={e => setFormData({...formData, sortno: parseInt(e.target.value, 10) || 0})} 
              />
            </div>
            
            <div className="admin-form-actions full-width">
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={() => {
                  handleToggleForm(false);
                  setEditingStaffId(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingStaffId ? 'Update Staff Record' : 'Save Staff Record'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-card">
          {/* Category Tabs & Search Toolbar */}
          <div className="admin-toolbar">
            {/* Category Filter Tabs */}
            <div className="admin-category-tabs">
              <button 
                className={`admin-category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                <span>All Categories</span>
                <span className="admin-tab-count">{staffList.length}</span>
              </button>

              {CATEGORIES.map(cat => {
                const count = staffList.filter(s => s.category === cat.adminValue).length;
                return (
                  <button
                    key={cat.id}
                    className={`admin-category-tab ${selectedCategory === cat.adminValue ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.adminValue)}
                  >
                    <span>{cat.label}</span>
                    <span className="admin-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Box and Quick Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div className="admin-search-box">
                <Search size={16} color="#5A6E59" />
                <input 
                  type="text" 
                  placeholder="Search by name, role, qualification..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ fontSize: '0.88rem', color: '#5A6E59', fontWeight: 600 }}>
                Showing {filteredStaff.length} {selectedCategory === 'all' ? 'staff members' : `${selectedCategory} staff`}
              </div>
            </div>
          </div>

          {/* Staff Table */}
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Designation</th>
                <th>Qualification</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(staff => (
                <tr key={staff.id}>
                  <td style={{ fontWeight: 600, color: '#2C3E2B' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      {staff.imageId && getImageUrl(staff.imageId) ? (
                        <img 
                          src={getImageUrl(staff.imageId)} 
                          alt={staff.name} 
                          style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eaf2e3', color: '#4D7E1D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                          {staff.name.charAt(0)}
                        </div>
                      )}
                      <span>{staff.name}</span>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="category-badge" 
                      style={getCategoryBadgeStyle(staff.category)}
                    >
                      {staff.category}
                    </span>
                  </td>
                  <td>{staff.posttype || '—'}</td>
                  <td>{staff.qualification || '—'}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="action-buttons-cell" style={{ justifyContent: 'center' }}>
                      <button 
                        className="action-btn edit" 
                        title="Edit Staff Member" 
                        onClick={() => handleEditClick(staff)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className="action-btn delete" 
                        title="Delete Staff Member" 
                        onClick={() => handleDeleteClick(staff.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '3rem 1rem', color: '#778' }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>No staff records found in this category.</p>
                    {selectedCategory !== 'all' && (
                      <button 
                        className="btn btn-outline" 
                        style={{ marginTop: '0.75rem', padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}
                        onClick={handleAddNewClick}
                      >
                        + Add new staff to {selectedCategory}
                      </button>
                    )}
                  </td>
                </tr>
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
