import React, { useState } from 'react';
import './EmployeeList.css';

const RoleChangeModal = ({ isOpen, onClose, employee, onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState(employee?.role || 'Employee');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !employee) return null;

  const handleRoleChange = async () => {
    setIsLoading(true);
    try {
      await onRoleChange(employee._id, selectedRole);
      onClose();
    } catch (error) {
      console.error('Error changing role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="role-modal-overlay" onClick={onClose}>
      <div className="role-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="role-modal-header">
          <h3>Change Role</h3>
          <button className="role-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="role-selection">
            <div className="role-options">
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="HR"
                  checked={selectedRole === 'HR'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <span>HR</span>
              </label>
              
              <label className="role-option">
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
        </div>
          
        
        <div className="role-modal-footer">
          <button 
            className="role-save-button" 
            onClick={handleRoleChange}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleChangeModal;
