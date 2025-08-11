import React from "react";
import "./EmployeeDetails.css";

function EmployeeDetails({ employee, onClose }) {
  if (!employee) return null;

  // Mask bank account number except last 3 digits
  const maskBankAccount = (account) => {
    if (!account) return "";
    const visibleDigits = account.slice(-3);
    return "********" + visibleDigits;
  };

  return (
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
            <div className="employee-info-item">
              <label>Job Title</label>
              <div className="employee-info-value">{employee.jobTitle || "Sales Manager"}</div>
            </div>
            <div className="employee-info-item">
              <label>Department</label>
              <div className="employee-info-value">{employee.department}</div>
            </div>
            <div className="employee-info-item">
              <label>Salary</label>
              <div className="employee-info-value">
                {employee.salary ? `₱${employee.salary.toLocaleString()}` : "₱0"}
              </div>
            </div>
            <div className="employee-info-item">
              <label>Bank Account No.</label>
              <div className="employee-info-value">{maskBankAccount(employee.bankAccountNo)}</div>
            </div>
            <div className="employee-info-item">
              <label>Hired Date</label>
              <div className="employee-info-value">{employee.hiredDate}</div>
            </div>
          </div>
          <div className="employee-right-panel">
            <div className="section-header">PERSONAL INFORMATION</div>
            <div className="personal-info-grid">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" value={employee.firstName || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Middle Name</label>
                <input type="text" value={employee.middleName || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" value={employee.lastName || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Employee Number</label>
                <input type="text" value={employee.employeeNumber || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" value={employee.phoneNumber || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <input type="text" value={employee.gender || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Age</label>
                <input type="text" value={employee.age || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Birth Date</label>
                <input type="text" value={employee.birthDate || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Birth Place</label>
                <input type="text" value={employee.birthPlace || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Civil Status</label>
                <input type="text" value={employee.civilStatus || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Nationality</label>
                <input type="text" value={employee.nationality || ""} readOnly />
              </div>
              <div className="input-group full-width">
                <label>Full Address</label>
                <input type="text" value={employee.fullAddress || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Government Number: SSS</label>
                <input type="text" value={employee.sss || ""} readOnly />
              </div>
              <div className="input-group">
                <label>TIN</label>
                <input type="text" value={employee.tin || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Philhealth</label>
                <input type="text" value={employee.philhealth || ""} readOnly />
              </div>
              <div className="input-group">
                <label>GSIS</label>
                <input type="text" value={employee.gsis || ""} readOnly />
              </div>
            </div>

            <div className="section-header">PARENTS INFORMATION</div>
            <div className="parents-info-grid">
              <div className="input-group">
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

            <div className="section-header">CONTACT INFORMATION</div>
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
  );
}

export default EmployeeDetails;
