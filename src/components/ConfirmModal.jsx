import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  const modalRef = useRef(null);
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      cancelBtnRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div className="confirm-modal-backdrop" onClick={handleBackdropClick}>
      <div className="confirm-modal" ref={modalRef}>
        <button className="confirm-modal-close" onClick={onCancel} aria-label="Close">
          <X size={18} />
        </button>

        <div className="confirm-modal-icon">
          <AlertTriangle size={28} />
        </div>

        <h3 className="confirm-modal-title">{title || 'Confirm Delete'}</h3>
        <p className="confirm-modal-message">
          {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
        </p>

        <div className="confirm-modal-actions">
          <button className="btn btn-outline confirm-modal-cancel" onClick={onCancel} ref={cancelBtnRef}>
            Cancel
          </button>
          <button className="btn confirm-modal-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
