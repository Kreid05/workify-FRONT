import React, { useState } from 'react';
import './AddLogsModal.css';

const AddLogsModal = ({ show, onClose, onSave, calculateHours }) => {
  const [newLog, setNewLog] = useState({
    employeeName: '',
    department: 'IT',
    date: '',
    clockIn: '',
    clockOut: '',
    status: 'Present'
  });

  const handleInputChange = (field, value) => {
    setNewLog(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!newLog.employeeName || !newLog.date) {
      alert('Please fill in Employee Name and Date');
      return;
    }

    const calculatedHours = calculateHours(newLog.clockIn, newLog.clockOut);
    const logData = {
      ...newLog,
      clockIn: newLog.clockIn || '--',
      clockOut: newLog.clockOut || '--',
      ...calculatedHours
    };

    onSave(logData);
    
    // Reset form
    setNewLog({
      employeeName: '',
      department: 'IT',
      date: '',
      clockIn: '',
      clockOut: '',
      status: 'Present'
    });
  };

  const handleClose = () => {
    setNewLog({
      employeeName: '',
      department: 'IT',
      date: '',
      clockIn: '',
      clockOut: '',
      status: 'Present'
    });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="addLogs-modal-overlay" onClick={handleClose}>
      <div className="addLogs-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="addLogs-modal-header">
          <h3>Add New Attendance Log</h3>
          <button className="addLogs-close-btn" onClick={handleClose}>×</button>
        </div>
        <div className="addLogs-modal-body">
          <div className="addLogs-form-row">
            <div className="addLogs-form-group">
              <label>Employee Name *</label>
              <input
                type="text"
                value={newLog.employeeName}
                onChange={(e) => handleInputChange('employeeName', e.target.value)}
                className="addLogs-form-input"
                placeholder="Enter employee name"
              />
            </div>
            <div className="addLogs-form-group">
              <label>Department</label>
              <select
                value={newLog.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="addLogs-form-select"
              >
                <option value="IT">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>
          <div className="addLogs-form-row">
            <div className="addLogs-form-group">
              <label>Date *</label>
              <input
                type="date"
                value={newLog.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="addLogs-form-input"
              />
            </div>
            <div className="addLogs-form-group">
              <label>Status</label>
              <select
                value={newLog.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="addLogs-form-select"
              >
                <option value="Present">Select Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Half Day">Half Day</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
          </div>
          <div className="addLogs-form-row">
            <div className="addLogs-form-group">
              <label>Clock In</label>
              <input
                type="time"
                value={newLog.clockIn}
                onChange={(e) => handleInputChange('clockIn', e.target.value)}
                className="addLogs-form-input"
              />
            </div>
            <div className="addLogs-form-group">
              <label>Clock Out</label>
              <input
                type="time"
                value={newLog.clockOut}
                onChange={(e) => handleInputChange('clockOut', e.target.value)}
                className="addLogs-form-input"
              />
            </div>
          </div>
          {newLog.clockIn && newLog.clockOut && (
            <div className="addLogs-hours-preview">
              <div className="addLogs-preview-item">
                <span>Total Hours: {calculateHours(newLog.clockIn, newLog.clockOut).totalHrs}</span>
              </div>
              <div className="addLogs-preview-item">
                <span>Regular Hours: {calculateHours(newLog.clockIn, newLog.clockOut).regularHrs}</span>
              </div>
              <div className="addLogs-preview-item">
                <span>Overtime: {calculateHours(newLog.clockIn, newLog.clockOut).overtime}</span>
              </div>
            </div>
          )}
        </div>
        <div className="addLogs-modal-footer">
          <button className="addLogs-cancel-btn" onClick={handleClose}>Cancel</button>
          <button className="addLogs-save-btn" onClick={handleSave}>Add Log</button>
        </div>
      </div>
    </div>
  );
};

export default AddLogsModal;