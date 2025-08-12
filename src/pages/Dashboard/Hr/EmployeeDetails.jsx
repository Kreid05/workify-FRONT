import React, { useState } from "react";
import "./EmployeeDetails.css";

function EmployeeDetails({ employee, onClose, onRoleChange }) {
  if (!employee) return null;

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(employee.role || 'Employee');

  // Mask bank account number except last 3 digits
  const maskBankAccount = (account) => {
    if (!account) return "";
    const visibleDigits = account.slice(-3);
    return "********" + visibleDigits;
  };

  const handleRoleChange = () => {
    if (onRoleChange) {
      onRoleChange(employee._id, selectedRole);
    }
    setShowRoleModal(false);
  };

  return (
    <>
      {/* Main Employee Details Modal */}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
          <div className="employee-modal-container">
            <div className="employee-left-panel">
              <div className="employee-avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="#000000"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M12 14c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5z" />
                </svg>
              </div>
              <h2 className="employee-name">{employee.name}</h2>
              <p className="employee-email">{employee.email}</p>
              <p className="employee-email">{employee.phoneNumber || "No phone number"}</p>
              <div className="employee-info-item">
                <label>Employee Number</label>
                <div className="employee-info-value">{employee.employeeNumber || "N/A"}</div>
              </div>
              <div className="employee-info-item">
                <label>Hired Date</label>
                <div className="employee-info-value">{employee.hiredDate}</div>
              </div>
              <div className="employee-info-item">
                <label>Job Title</label>
                <div className="employee-info-value">{employee.jobTitle || "Sales Manager"}</div>
              </div>
              <div className="employee-info-item">
                <label>Department</label>
                <div className="employee-info-value">{employee.department}</div>
              </div>
              <div className="employee-info-item">
                <label>Current Role</label>
                <div className="employee-info-value">{employee.role || 'Employee'}</div>
              </div>
              <button 
                className="role-change-button"
                onClick={() => setShowRoleModal(true)}
              >
                Change Role
              </button>
            </div>
            <div className="employee-right-panel">
              <div className="section-header">PERSONAL INFORMATION</div>
              <div className="personal-info-grid">
                <div className="input-group medium">
                  <label>First Name</label>
                  <input type="text" value={employee.firstName || ""} readOnly />
                </div>
                <div className="input-group medium">
                  <label>Middle Name</label>
                  <input type="text" value={employee.middleName || ""} readOnly />
                </div>
                <div className="input-group wide">
                  <label>Last Name</label>
                  <input type="text" value={employee.lastName || ""} readOnly />
                </div>
                <div className="input-group narrow">
                  <label>Age</label>
                  <input type="text" value={employee.age || ""} readOnly />
                </div>
                <div className="input-group medium">
                  <label>Birth Date</label>
                  <input type="text" value={employee.birthDate || ""} readOnly />
                </div>
                <div className="input-group wide">
                  <label>Birth Place</label>
                  <input type="text" value={employee.birthPlace || ""} readOnly />
                </div>
                <div className="input-group medium">
                  <label>Civil Status</label>
                  <input type="text" value={employee.civilStatus || ""} readOnly />
                </div>
                <div className="input-group medium">
                  <label>Nationality</label>
                  <input type="text" value={employee.nationality || ""} readOnly />
                </div>
                <div className="input-group full-width">
                  <label>Full Address</label>
                  <input type="text" value={employee.fullAddress || ""} readOnly />
                </div>
                <div className="input-group medium">
                  <label>Government Number: SSS</label>
                  <input type="text" value={employee.sss || ""} readOnly />
                </div>
                <div className="input-group medium">
                  <label>TIN</label>
                  <input type="text" value={employee.tin || ""} readOnly />
                </div>
                <div className="input-group medium">
                  <label>Philhealth</label>
                  <input type="text" value={employee.philhealth || ""} readOnly />
                </div>
                <div className="input-group medium">
                  <label>GSIS</label>
                  <input type="text" value={employee.gsis || ""} readOnly />
                </div>
              </div>

              <div className="section-header">PARENTS INFORMATION</div>
              <div className="parents-info-grid">
                <div className="input-group medium">
                  <label>Mother's Maiden Name</label>
                  <input type="text" value={employee.motherMaidenName || ""} readOnly />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="text" value={employee.motherPhoneNumber || ""} readOnly />
                </div>
                <div className="input-group">
                  <label>Occupation</label>
                  <input type="text" value={employee.motherOccupation || ""} readOnly />
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <input type="text" value={employee.motherStatus || ""} readOnly />
                </div>
                <div className="input-group full-width">
                  <label>Address</label>
                  <input type="text" value={employee.motherAddress || ""} readOnly />
                </div>
                <div className="input-group">
                  <label>Father's Maiden Name</label>
                  <input type="text" value={employee.fatherMaidenName || ""} readOnly />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="text" value={employee.fatherPhoneNumber || ""} readOnly />
                </div>
                <div className="input-group">
                  <label>Occupation</label>
                  <input type="text" value={employee.fatherOccupation || ""} readOnly />
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <input type="text" value={employee.fatherStatus || ""} readOnly />
                </div>
                <div className="input-group full-width">
                  <label>Address</label>
                  <input type="text" value={employee.fatherAddress || ""} readOnly />
                </div>
              </div>

              <div className="section-header">EMERGENCY INFORMATION</div>
              <div className="contact-info-grid">
                <div className="input-group">
                  <label>Name</label>
                  <input type="text" value={employee.contactName || ""} readOnly />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="text" value={employee.contactPhoneNumber || ""} readOnly />
                </div>
                <div className="input-group">
                  <label>Relationship</label>
                  <input type="text" value={employee.contactRelationship || ""} readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Role Modal */}
      {showRoleModal && (
        <div className="modal-overlay" onClick={() => setShowRoleModal(false)}>
          <div className="role-modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-button" onClick={() => setShowRoleModal(false)}>&times;</button>
            <h3>Change Role</h3>
            <div className="role-selection">
              <label className="radio-option">
                <input
                  type="radio"
                  name="role"
                  value="HR"
                  checked={selectedRole === 'HR'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <span>HR</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="role"
                  value="Employee"
                  checked={selectedRole === 'Employee'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <span>Employee</span>
              </label>
            </div>
            <div className="role-modal-actions">
              <button className="confirm-button" onClick={handleRoleChange}>
                Change Role
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmployeeDetails;
