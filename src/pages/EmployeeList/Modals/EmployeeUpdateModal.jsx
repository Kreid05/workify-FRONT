import React, { useState, useEffect } from "react";
import "./EmployeeUpdateModal.css";

const EmployeeUpdateModal = ({ isOpen, onClose, employee, onUpdateEmployee }) => {
  const [formData, setFormData] = useState({
    employeeNumber: "",
    hiredDate: "",
    jobTitle: "",
    department: "",
    currentRole: ""
  });

  const departmentOptions = [
    "Sales",
    "Marketing", 
    "Compliance",
    "Human Resources",
    "Finance",
    "IT",
    "Operations"
  ];

  const roleOptions = [
    "Employee",
    "HR", 
  ];

  useEffect(() => {
    if (employee && isOpen) {
      setFormData({
        employeeNumber: employee.employeeNumber || "",
        hiredDate: employee.hiredDate || "",
        jobTitle: employee.jobTitle || "",
        department: employee.department || "",
        currentRole: employee.currentRole || ""
      });
    }
  }, [employee, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee) {
      
      const { currentRole, ...updateData } = formData;
      onUpdateEmployee(employee._id, updateData);
    }
    onClose();
  };

  const handleCancel = () => {
    
    if (employee) {
      setFormData({
        employeeNumber: employee.employeeNumber || "",
        hiredDate: employee.hiredDate || "",
        jobTitle: employee.jobTitle || "",
        department: employee.department || "",
        currentRole: employee.currentRole || ""
      });
    }
    onClose();
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="update-modal-overlay">
      <div className="update-modal-content">
        <div className="update-modal-header">
          <h2>Update Employee Information</h2>
          <button 
            className="update-modal-close"
            onClick={handleCancel}
            type="button"
          >
            ×
          </button>
        </div>
        
        <div className="employee-info-header">
          <h3>{employee.name}</h3>
          <p>{employee.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label htmlFor="employeeNumber">Employee Number</label>
            <input
              type="text"
              id="employeeNumber"
              name="employeeNumber"
              value={formData.employeeNumber}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="hiredDate">Hired Date</label>
            <input
              type="text"
              id="hiredDate"
              name="hiredDate"
              value={formData.hiredDate}
              onChange={handleInputChange}
              className="form-input"
              placeholder="MM-DD-YYYY"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">Select Department</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="currentRole">Current Role</label>
            <select
              id="currentRole"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleInputChange}
              className="form-select disabled"
              disabled
              style={{ 
                opacity: 0.5, 
                cursor: 'not-allowed',
                backgroundColor: '#f5f5f5' 
              }}
            >
              <option value="">Select Role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <small className="role-restriction-note">
              * Only administrators can edit employee roles
            </small>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-button"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeUpdateModal;