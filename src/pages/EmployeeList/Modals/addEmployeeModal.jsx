import React, { useState } from 'react';
import './addEmployeeModal.css';

const usernames = [
  'jdoe',
  'smith',
  'mbrown',
  'ljohnson',
  'kwilliams'
];

const AddEmployeeModal = ({ onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    birthDate: '',
    birthPlace: '',
    civilStatus: '',
    nationality: '',
    gender: '',
    phoneNumber: '',
    fullAddress: '',
    sssNo: '',
    tinNo: '',
    philHealthNo: '',
    gsisNo: '',
    motherName: '',
    mPhoneNo: '',
    mOccupation: '',
    mStatus: '',
    mAddress: '',
    fatherName: '',
    fPhoneNo: '',
    fOccupation: '',
    fStatus: '',
    fAddress: '',
    contactName: '',
    contactNo: '',
    relationship: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.username.trim() !== '';
      case 2:
        return (
          formData.firstName.trim() !== '' &&
          formData.lastName.trim() !== '' &&
          formData.age.trim() !== '' &&
          formData.birthDate.trim() !== '' &&
          formData.civilStatus.trim() !== '' &&
          formData.nationality.trim() !== '' &&
          formData.gender.trim() !== '' &&
          formData.phoneNumber.trim() !== '' &&
          formData.fullAddress.trim() !== ''
        );
      case 3:
        return (
          formData.motherName.trim() !== '' &&
          formData.mPhoneNo.trim() !== '' &&
          formData.fatherName.trim() !== '' &&
          formData.fPhoneNo.trim() !== ''
        );
      case 4:
        return (
          formData.contactName.trim() !== '' &&
          formData.contactNo.trim() !== '' &&
          formData.relationship.trim() !== ''
        );
      default:
        return false;
    }
  };

  const handleSave = () => {
    // For now, just call onSave with formData
    onSave(formData);
    onClose();
  };

  return (
    <div className="addEmployee-modal-overlay">
      <div className="addEmployee-modal-container">
        <div className="addEmployee-modal-header">
          <h2>Add Employee</h2>
          <button className="addEmployee-close-button" onClick={onClose}>×</button>
        </div>

        <div className="addEmployee-steps-indicator">
          {[1, 2, 3, 4].map(step => (
            <div
              key={step}
              className={`addEmployee-step ${currentStep >= step ? 'active' : ''}`}
            >
              <span className="addEmployee-step-number">{step}</span>
               <span className="addEmployee-step-label">
                {step === 1 && 'Employee Information'}
                {step === 2 && 'Personal Information'}
                {step === 3 && 'Parents Information'}
                {step === 4 && 'Emergency Information'}
              </span>
            </div>
          ))}
        </div>

        <div className="addEmployee-modal-content">
          {currentStep === 1 && (
            <div className="addEmployee-step-content">
              <div className="addEmployee-form-group">
                <label>Username *</label>
                <input
                  list="usernames"
                  value={formData.username}
                  onChange={e => handleInputChange('username', e.target.value)}
                  placeholder="Select or type username"
                />
                <datalist id="usernames">
                  {usernames.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="addEmployee-step-content">
              {/* Row 1: First, Middle, Last Name */}
              <div className="addEmployee-form-row">
                <div className="addEmployee-form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e => handleInputChange('firstName', e.target.value)}
                  />
                </div>
                <div className="addEmployee-form-group">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={e => handleInputChange('middleName', e.target.value)}
                  />
                </div>
                <div className="addEmployee-form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 2: age, birthday, birthplace */}
              <div className="addEmployee-form-row">
                <div className="addEmployee-form-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={e => handleInputChange('age', e.target.value)}
                  />
                </div>
                <div className="addEmployee-form-group">
                  <label>Birth Date *</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={e => handleInputChange('birthDate', e.target.value)}
                  />
                </div>
                <div className="addEmployee-form-group">
                  <label>Birth Place</label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={e => handleInputChange('birthPlace', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 3: Civil Status, Nationality */}
              <div className="addEmployee-form-row">
                <div className="addEmployee-form-group">
                  <label>Civil Status *</label>
                  <input
                    type="text"
                    value={formData.civilStatus}
                    onChange={e => handleInputChange('civilStatus', e.target.value)}
                  />
                </div>
                <div className="addEmployee-form-group">
                  <label>Nationality *</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={e => handleInputChange('nationality', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 4: Gender, Phone Number */}
              <div className="addEmployee-form-row">
                <div className="addEmployee-form-group">
                  <label>Gender *</label>
                  <div className="gender-radio-group">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={e => handleInputChange('gender', e.target.value)}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={e => handleInputChange('gender', e.target.value)}
                      />
                      Female
                    </label>
                  </div>
                </div>
                <div className="addEmployee-form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={e => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 5: Full Address */}
              <div className="addEmployee-form-group">
                <label>Full Address *</label>
                <input
                  type="text"
                  value={formData.fullAddress}
                  onChange={e => handleInputChange('fullAddress', e.target.value)}
                />
              </div>

              {/* Row 6: SSS, TIN */}
              <div className="addEmployee-form-row">
                <div className="addEmployee-form-group">
                  <label>SSS No.</label>
                  <input
                    type="text"
                    value={formData.sssNo}
                    onChange={e => handleInputChange('sssNo', e.target.value)}
                  />
                </div>
                <div className="addEmployee-form-group">
                  <label>TIN No.</label>
                  <input
                    type="text"
                    value={formData.tinNo}
                    onChange={e => handleInputChange('tinNo', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 7: Philhealth, GSIS */}
              <div className="addEmployee-form-row">
                <div className="addEmployee-form-group">
                  <label>Philhealth No.</label>
                  <input
                    type="text"
                    value={formData.philHealthNo}
                    onChange={e => handleInputChange('philHealthNo', e.target.value)}
                  />
                </div>
                <div className="addEmployee-form-group">
                  <label>GSIS No.</label>
                  <input
                    type="text"
                    value={formData.gsisNo}
                    onChange={e => handleInputChange('gsisNo', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="addEmployee-step-content">
              <h4>Mother's Information</h4>
              <div className="addEmployee-form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={e => handleInputChange('motherName', e.target.value)}
                />
              </div>
              <div className="addEmployee-form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.mPhoneNo}
                  onChange={e => handleInputChange('mPhoneNo', e.target.value)}
                />
              </div>
              <div className="addEmployee-form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  value={formData.mOccupation}
                  onChange={e => handleInputChange('mOccupation', e.target.value)}
                />
              </div>
              <div className="addEmployee-form-group">
                <label>Status</label>
                <input
                  type="text"
                  value={formData.mStatus}
                  onChange={e => handleInputChange('mStatus', e.target.value)}
                />
              </div>
              <div className="addEmployee-form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={formData.mAddress}
                  onChange={e => handleInputChange('mAddress', e.target.value)}
                />
              </div>

              <h4>Father's Information</h4>
              <div className="addEmployee-form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={e => handleInputChange('fatherName', e.target.value)}
                />
              </div>
              <div className="addEmployee-form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.fPhoneNo}
                  onChange={e => handleInputChange('fPhoneNo', e.target.value)}
                />
              </div>
              <div className="addEmployee-form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  value={formData.fOccupation}
                  onChange={e => handleInputChange('fOccupation', e.target.value)}
                />
              </div>
              <div className="addEmployee-form-group">
                <label>Status</label>
                <input
                  type="text"
                  value={formData.fStatus}
                  onChange={e => handleInputChange('fStatus', e.target.value)}
                />
              </div>
              <div className="addEmployee-form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={formData.fAddress}
                  onChange={e => handleInputChange('fAddress', e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="addEmployee-step-content">
              <div className="addEmployee-form-group">
                <label>Contact Name *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={e => handleInputChange('contactName', e.target.value)}
                />
              </div>
              <div className="addEmployee-form-group">
                <label>Emergency Phone Number *</label>
                <input
                  type="tel"
                  value={formData.contactNo}
                  onChange={e => handleInputChange('contactNo', e.target.value)}
                />
              </div>
              <div className="addEmployee-form-group">
                <label>Relationship *</label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={e => handleInputChange('relationship', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="addEmployee-modal-footer">
          <div className="addEmployee-footer-buttons">
            {currentStep > 1 && (
              <button className="addEmployee-btn-secondary" onClick={handlePrevious}>
                Previous
              </button>
            )}
            <button className="addEmployee-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            {currentStep < 4 ? (
              <button
                className="addEmployee-btn-primary"
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                Next
             </button>
            ) : (
              <button
                className="addEmployee-btn-primary"
                onClick={handleSave}
                disabled={!isStepValid()}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
