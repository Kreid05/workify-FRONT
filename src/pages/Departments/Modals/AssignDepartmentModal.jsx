import React, { useState, useEffect } from 'react';
import './AssignDepartmentModal.css';
import api from '../../../api/api';

const AssignDepartmentModal = ({ isOpen, onClose, onAssignDepartment }) => {
  const [formData, setFormData] = useState({
    username: '',
    department: '',
    jobTitle: ''
  });
  const [departments, setDepartments] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock departments data - will be replaced with actual API call
  const mockDepartments = [
    { _id: '1', departmentName: 'Human Resources', jobTitles: ['HR Manager', 'HR Specialist', 'Recruiter', 'HR Coordinator'] },
    { _id: '2', departmentName: 'Information Technology', jobTitles: ['Software Engineer', 'IT Manager', 'System Administrator', 'DevOps Engineer'] },
    { _id: '3', departmentName: 'Finance', jobTitles: ['Accountant', 'Finance Manager', 'Financial Analyst', 'Bookkeeper'] },
    { _id: '4', departmentName: 'Marketing', jobTitles: ['Marketing Manager', 'Digital Marketer', 'Content Writer', 'SEO Specialist'] },
    { _id: '5', departmentName: 'Sales', jobTitles: ['Sales Manager', 'Sales Representative', 'Account Executive', 'Business Development'] }
  ];

  useEffect(() => {
    // Fetch departments when modal opens
    const fetchDepartments = async () => {
      try {
        // In production, this would be an API call
        setDepartments(mockDepartments);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setDepartments(mockDepartments); // Fallback to mock data
      }
    };

    if (isOpen) {
      fetchDepartments();
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'department') {
      const selectedDept = departments.find(dept => dept.departmentName === value);
      setJobTitles(selectedDept ? selectedDept.jobTitles : []);
      setFormData(prev => ({
        ...prev,
        department: value,
        jobTitle: '' // Reset job title when department changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.department || !formData.jobTitle) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock assignment - in production this would be an API call
      const assignmentData = {
        username: formData.username.trim(),
        department: formData.department,
        jobTitle: formData.jobTitle,
        assignedAt: new Date().toISOString()
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call parent callback with assignment data
      onAssignDepartment(assignmentData);
      
      // Reset form
      setFormData({
        username: '',
        department: '',
        jobTitle: ''
      });
      
      onClose();
    } catch (err) {
      console.error('Error assigning department:', err);
      setError('Failed to assign department. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      username: '',
      department: '',
      jobTitle: ''
    });
    setJobTitles([]);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="assign-department-modal-overlay" onClick={handleClose}>
      <div className="assign-department-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="assign-department-modal-header">
          <h2>Assign Department to User</h2>
          <button className="assign-department-close-button" onClick={handleClose}>×</button>
        </div>
        
        {error && (
          <div className="assign-department-error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="assign-department-form">
          <div className="assign-department-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              required
              disabled={isLoading}
            />
          </div>

          <div className="assign-department-form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.departmentName}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </div>

          <div className="assign-department-form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <select
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              required
              disabled={isLoading || !formData.department}
            >
              <option value="">Select Job Title</option>
              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div className="assign-department-form-actions">
            <button 
              type="button" 
              className="assign-department-cancel-button" 
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="assign-department-submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Assigning...' : 'Assign Department'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignDepartmentModal;
