import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';
import { getBlogList, addBlog, deleteBlog, BLOG_CATEGORIES } from '../../data/blogData';
import { saveImage, deleteImage, getImageUrl } from '../../data/imageStore';

const BlogManager = () => {
  const [blogs, setBlogs] = useState(() => getBlogList());
  const [showForm, setShowForm] = useState(() => {
    return window.location.pathname.endsWith('/add');
  });
  const [formData, setFormData] = useState({ title: '', filename: '', category: 'News & Announcements', displayrank: 0 });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (formData.filename && (formData.filename.startsWith('http') || formData.filename.startsWith('/'))) {
      setImagePreviewUrl(formData.filename);
    } else {
      setImagePreviewUrl('');
    }
  }, [imageFile, formData.filename]);

  useEffect(() => {
    const handlePopState = () => {
      setShowForm(window.location.pathname.endsWith('/add'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToggleForm = (show) => {
    setShowForm(show);
    const newUrl = show ? '/admin/blogmanagement/add' : '/admin/blogmanagement';
    if (window.location.pathname !== newUrl) {
      window.history.pushState(null, '', newUrl);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setFormData(prev => ({ ...prev, filename: '' }));
    const fileInput = document.getElementById('blog-image-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const imageId = await saveImage(imageFile);
    const updated = addBlog(blogs, { ...formData, imageId });
    setBlogs(updated);
    handleToggleForm(false);
    setFormData({ title: '', filename: '', category: 'News & Announcements', displayrank: 0 });
    setImageFile(null);
    const fileInput = document.getElementById('blog-image-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
  };

  const handleDeleteConfirm = () => {
    const target = blogs.find(b => b.id === deleteTargetId);
    if (target && target.imageId) {
      deleteImage(target.imageId);
    }
    const updated = deleteBlog(blogs, deleteTargetId);
    setBlogs(updated);
    setDeleteTargetId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTargetId(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Blog Management</h1>
          <p style={{ color: '#5A6E59' }}>Manage news, events, and blog post entries.</p>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => handleToggleForm(true)}>
            <Plus size={16} /> Add New Post
          </button>
        )}
      </div>

      {showForm ? (
        <div className="admin-card animate-fade-in-up">
          <h3>Create Blog Post</h3>
          <form onSubmit={handleSave} className="admin-form-grid" style={{ marginTop: '1rem' }}>
            <div className="admin-form-group full-width">
              <label>Blog Title</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Enter the title of the post" />
            </div>

            <div className="admin-form-group">
              <label>Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                {BLOG_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.label}>{cat.label}</option>
                ))}
              </select>
            </div>
            
            <div className="admin-form-group">
              <label>Cover Image / Thumbnail (Filename)</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input 
                  type="file" 
                  id="blog-image-upload" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setFormData(prev => ({...prev, filename: file.name}));
                      setImageFile(file);
                    }
                  }} 
                />
                <input 
                  type="text" 
                  value={formData.filename} 
                  onChange={e => setFormData(prev => ({...prev, filename: e.target.value}))} 
                  placeholder="e.g. event-thumb.jpg (or click icon to select)" 
                  style={{ flex: 1 }} 
                />
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  style={{ padding: '0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Choose image from device"
                  onClick={() => document.getElementById('blog-image-upload').click()}
                >
                  <ImageIcon size={18} />
                </button>
              </div>

              {imagePreviewUrl ? (
                <div className="admin-image-preview-bar">
                  <div className="admin-image-preview-info">
                    <img 
                      src={imagePreviewUrl} 
                      alt="Preview" 
                      className="admin-image-preview-thumb" 
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="admin-image-preview-title">Selected image</span>
                      {formData.filename && (
                        <span className="admin-image-preview-filename">{formData.filename}</span>
                      )}
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="admin-image-remove-btn"
                    onClick={handleRemoveImage}
                    title="Remove selected image"
                  >
                    <Trash2 size={13} />
                    <span>Remove Photo</span>
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#7a8c78', fontStyle: 'italic' }}>
                  No photo selected
                </div>
              )}
            </div>

            <div className="admin-form-group">
              <label>Display Rank (Sort Order)</label>
              <input type="number" value={formData.displayrank} onChange={e => setFormData({...formData, displayrank: e.target.value})} />
            </div>

            <div className="admin-form-group full-width">
              <label>Blog Content / Images</label>
              <textarea rows="5" value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} placeholder="Enter HTML content or text here..."></textarea>
            </div>
            
            <div className="admin-form-actions full-width">
              <button type="button" className="btn btn-outline" onClick={() => handleToggleForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Publish Blog</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Path</th>
                <th>Rank</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => {
                const getDisplayImage = (b) => {
                  if (b.imageId) return getImageUrl(b.imageId);
                  if (b.filename) return `${b.filepath}${b.filename}`;
                  return null;
                };
                const displayImage = getDisplayImage(blog);
                
                return (
                  <tr key={blog.id}>
                    <td>
                      <div style={{ width: '40px', height: '40px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                        {displayImage ? (
                          <img src={displayImage} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <ImageIcon size={16} />
                        )}
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{blog.title}</td>
                    <td>{blog.filepath}{blog.filename}</td>
                    <td>{blog.displayrank}</td>
                    <td>
                      <button style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }} onClick={() => handleDeleteClick(blog.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {blogs.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No blog posts available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteTargetId !== null}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default BlogManager;
