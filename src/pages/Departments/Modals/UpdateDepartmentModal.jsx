import React, { useState, useEffect } from "react";
import "./UpdateDepartmentModal.css";

function UpdateDepartmentModal({ isOpen, onClose, department, onUpdateDepartment }) {
  const [formData, setFormData] = useState({
    departmentName: "",
    jobTitle: "",
  });

  useEffect(() => {
    if (department) {
      setFormData({
        departmentName: department.departmentName || "",
        jobTitle: department.jobTitle || "",
      });
    }
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdateDepartment(department._id, formData);
      onClose();
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="updateDept-modal-overlay">
      <div className="updateDept-modal-content">
        <div className="updateDept-modal-header">
            <h2>Update Department</h2>
            <button className="updateDept-modal-close" onClick={onClose}>
                &times;
            </button>
        </div>

        <form onSubmit={handleSubmit} className="updateDept-form">
          <div className="form-group">
            <label htmlFor="departmentName">Department Name</label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Update Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDepartmentModal;
