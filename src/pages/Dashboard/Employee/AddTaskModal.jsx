import React, { useState, useEffect } from 'react';
import './AddTaskModal.css';

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
    assignedTo: '',
    assignedBy: '',
    department: '',
    dueDate: ''
  });
  
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock departments - replace with actual data from your backend
  const departments = [
    'IT',
    'HR',
    'Finance',
    'Marketing',
    'Operations',
    'Sales',
    'Customer Service'
  ];

  // Fetch employees for the dropdown
  useEffect(() => {
    // Replace this with actual API call to fetch employees
    const mockEmployees = [
      { id: 1, name: 'John Doe', email: 'john@company.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@company.com' },
      { id: 3, name: 'Mike Johnson', email: 'mike@company.com' },
      { id: 4, name: 'Sarah Williams', email: 'sarah@company.com' }
    ];
    setEmployees(mockEmployees);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle assignedTo search
    if (name === 'assignedTo') {
      if (value) {
        const filtered = employees.filter(emp => 
          emp.name.toLowerCase().includes(value.toLowerCase()) ||
          emp.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredEmployees(filtered);
        setShowDropdown(true);
      } else {
        setFilteredEmployees([]);
        setShowDropdown(false);
      }
    }
  };

  const handleEmployeeSelect = (employee) => {
    setFormData(prev => ({
      ...prev,
      assignedTo: employee.name
    }));
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.taskName || !formData.assignedTo || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Create task object
    const newTask = {
      ...formData,
      assignedTo: employees.find(emp => emp.name === formData.assignedTo)?.id || formData.assignedTo,
      createdAt: new Date().toISOString()
    };

    onAddTask(newTask);
    
    // Reset form
    setFormData({
      taskName: '',
      description: '',
      assignedTo: '',
      assignedBy: '',
      department: '',
      dueDate: ''
    });
    
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      taskName: '',
      description: '',
      assignedTo: '',
      assignedBy: '',
      department: '',
      dueDate: ''
    });
    setShowDropdown(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="addTask-modal-overlay">
      <div className="addTask-modal-container">
        <div className="addTask-modal-header">
          <h2>Add New Task</h2>
          <button className="addTask-close-button" onClick={handleClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="addTask-task-form">
          <div className="addTask-form-group">
            <label htmlFor="taskName">Task Name *</label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={formData.taskName}
              onChange={handleInputChange}
              required
              placeholder="Enter task name"
            />
          </div>

          <div className="addTask-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              rows="3"
            />
          </div>

          <div className="addTask-form-group">
            <label htmlFor="assignedTo">Assigned To *</label>
            <div className="addTask-dropdown-container">
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                required
                placeholder="Type to search employee"
                autoComplete="off"
              />
              {showDropdown && filteredEmployees.length > 0 && (
                <div className="addTask-dropdown-menu">
                  {filteredEmployees.map(employee => (
                    <div
                      key={employee.id}
                      className="addTask-dropdown-item"
                      onClick={() => handleEmployeeSelect(employee)}
                    >
                      {employee.name} ({employee.email})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="addTask-form-group">
            <label htmlFor="assignedBy">Assigned By</label>
            <input
              type="text"
              id="assignedBy"
              name="assignedBy"
              value={formData.assignedBy}
              onChange={handleInputChange}
              placeholder="Enter assigner's name"
            />
          </div>

          <div className="addTask-form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="addTask-form-group">
            <label htmlFor="dueDate">Due Date *</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="addTask-form-actions">
            <button type="button" className="addTask-cancel-button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="addTask-submit-button">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
