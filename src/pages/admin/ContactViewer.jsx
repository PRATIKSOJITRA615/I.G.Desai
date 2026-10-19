import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';

const ContactViewer = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', phoneno: '9876543210', message: 'Inquiry regarding 11th Science admissions.', status: 'New', year: 2026 },
    { id: 2, name: 'Megha Patel', email: 'megha.p@example.com', phoneno: '9988776655', message: 'When is the vocational training workshop starting?', status: 'Read', year: 2026 }
  ]);

  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
  };

  const handleDeleteConfirm = () => {
    setContacts(contacts.filter(c => c.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTargetId(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="admin-header">
        <h1>Contact Entries</h1>
        <p style={{ color: '#5A6E59' }}>View inquiries submitted through the website Contact Us form.</p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td style={{ fontWeight: 500 }}>{contact.name}</td>
                <td>
                  <div style={{ fontSize: '0.9rem' }}>{contact.email}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>+91 {contact.phoneno}</div>
                </td>
                <td style={{ maxWidth: '300px' }}>{contact.message}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    backgroundColor: contact.status === 'New' ? '#e3fce1' : '#f0f0f0',
                    color: contact.status === 'New' ? '#2e7d32' : '#666'
                  }}>
                    {contact.status}
                  </span>
                </td>
                <td>
                  <button style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }} onClick={() => handleDeleteClick(contact.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No contact entries available.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={deleteTargetId !== null}
        title="Delete Contact Entry"
        message="Are you sure you want to delete this contact entry? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default ContactViewer;
