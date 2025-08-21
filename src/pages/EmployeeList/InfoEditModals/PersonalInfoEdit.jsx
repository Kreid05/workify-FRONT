import React, { useState, useEffect } from "react";
import "../EmployeeDetails.css";

function PersonalInfoEdit({ employee, onSave, onClose }) {
  const [formData, setFormData] = useState({
    firstName: employee.firstName || '',
    middleName: employee.middleName || '',
    lastName: employee.lastName || '',
    age: employee.age || '',
    birthDate: employee.birthDate || '',
    birthPlace: employee.birthPlace || '',
    civilStatus: employee.civilStatus || '',
    nationality: employee.nationality || '',
    gender: employee.gender || '',
    phoneNumber: employee.phoneNumber || '',
    fullAddress: employee.fullAddress || '',
    sss: employee.sss || '',
    tin: employee.tin || '',
    philhealth: employee.philhealth || '',
    gsis: employee.gsis || ''
  });

  const handleSubmit = () => {
    onSave(employee._id, 'personal', formData);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="section-edit-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h3>Edit Personal Information</h3>
        
        <div className="section-edit-form">
          <div className="form-row">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Middle Name</label>
              <input
                type="text"
                value={formData.middleName}
                onChange={(e) => handleInputChange('middleName', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Birth Date</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Birth Place</label>
              <input
                type="text"
                value={formData.birthPlace}
                onChange={(e) => handleInputChange('birthPlace', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Civil Status</label>
              <select
                value={formData.civilStatus}
                onChange={(e) => handleInputChange('civilStatus', e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="input-group">
              <label>Nationality</label>
              <input
                type="text"
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              />
            </div>
          </div>
          <div className="input-group full-width">
            <label>Full Address</label>
            <textarea
              value={formData.fullAddress}
              onChange={(e) => handleInputChange('fullAddress', e.target.value)}
              rows="3"
            />
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>SSS</label>
              <input
                type="text"
                value={formData.sss}
                onChange={(e) => handleInputChange('sss', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>TIN</label>
              <input
                type="text"
                value={formData.tin}
                onChange={(e) => handleInputChange('tin', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Philhealth</label>
              <input
                type="text"
                value={formData.philhealth}
                onChange={(e) => handleInputChange('philhealth', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>GSIS</label>
              <input
                type="text"
                value={formData.gsis}
                onChange={(e) => handleInputChange('gsis', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="role-modal-actions">
          <button className="confirm-button" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoEdit;