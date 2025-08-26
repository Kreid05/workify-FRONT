import React, { useState } from 'react';
import './SubmitInquiryModal.css';

const SubmitInquiryModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    requestName: '',
    type: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.requestName && formData.type && formData.description) {
      onSubmit(formData);
      setFormData({ requestName: '', type: '', description: '' });
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({ requestName: '', type: '', description: '' });
    onClose();
  };

  return (
    <div className="submit-modal-overlay">
      <div className="submit-modal-container">
        <div className="submit-modal-header">
          <h2>Submit New Inquiry</h2>
          <button className="submit-close-button" onClick={handleCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="submit-modal-content">
          <div className="empInquiry-form-group">
            <label htmlFor="requestName">Request Name *</label>
            <input
              type="text"
              id="requestName"
              name="requestName"
              value={formData.requestName}
              onChange={handleInputChange}
              placeholder="e.g., Leave Request, Equipment Request"
              required
            />
          </div>

          <div className="empInquiry-form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Time Off">Time Off</option>
              <option value="Resources">Resources</option>
              <option value="Development">Development</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="empInquiry-form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please provide details about your request..."
              rows="4"
              required
            />
          </div>

          <div className="submit-modal-actions">
            <button 
              type="button" 
              className="submit-cancel-button" 
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-confirm-button"
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitInquiryModal;
