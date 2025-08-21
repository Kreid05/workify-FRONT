import React, { useState, useEffect } from 'react';
import './EditScheduleModal.css';

const EditScheduleModal = ({ schedule, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    scheduleName: '',
    scheduleDescription: '',
    startDate: '',
    endDate: '',
    scheduleType: 'Full Time',
    workDays: [],
    workStart: '07:30',
    workEnd: '16:00',
    latenessGrace: 15,
    absenceGrace: 30,
    employeeName: '',
    employeeNo: '',
    department: '',
    jobTitle: ''
  });

  useEffect(() => {
    if (schedule) {
      setFormData({
        scheduleName: schedule.scheduleName || '',
        scheduleDescription: schedule.scheduleDescription || '',
        startDate: schedule.startDate || '',
        endDate: schedule.endDate || '',
        scheduleType: schedule.scheduleType || 'Full Time',
        workDays: schedule.workDays || [],
        workStart: schedule.workStart || '07:30',
        workEnd: schedule.workEnd || '16:00',
        latenessGrace: schedule.latenessGrace || 15,
        absenceGrace: schedule.absenceGrace || 30,
        employeeName: schedule.employeeName || '',
        employeeNo: schedule.employeeNo || '',
        department: schedule.department || '',
        jobTitle: schedule.jobTitle || ''
      });
    }
  }, [schedule]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      workDays: prev.workDays.includes(day)
        ? prev.workDays.filter(d => d !== day)
        : [...prev.workDays, day]
    }));
  };

  const formatWorkDays = (days) => {
    const dayMap = {
      'S': 'Sunday',
      'M': 'Monday',
      'T': 'Tuesday',
      'W': 'Wednesday',
      'Th': 'Thursday',
      'F': 'Friday',
      'Sa': 'Saturday'
    };

    if (days.length === 0) return 'No days selected';
    if (days.length === 5 && ['M', 'T', 'W', 'Th', 'F'].every(d => days.includes(d))) {
      return 'Monday - Friday';
    }
    if (days.length === 7) return 'Monday - Sunday';
    
    return days.map(d => dayMap[d]).join(', ');
  };

  const handleSave = () => {
    const updatedSchedule = {
      ...schedule,
      ...formData,
      day: formatWorkDays(formData.workDays),
      time: `${formData.workStart} - ${formData.workEnd}`
    };

    onSave(updatedSchedule);
  };

  const isFormValid = () => {
    return formData.scheduleName && 
           formData.scheduleDescription && 
           formData.startDate && 
           formData.workDays.length > 0 && 
           formData.workStart && 
           formData.workEnd;
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-container">
        <div className="edit-modal-header">
          <h2>Edit Schedule</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="edit-modal-content">
          <div className="edit-section">
            <h3>Schedule Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Schedule Name *</label>
                <input
                  type="text"
                  value={formData.scheduleName}
                  onChange={(e) => handleInputChange('scheduleName', e.target.value)}
                  placeholder="Enter schedule name"
                />
              </div>
              <div className="form-group">
                <label>Schedule Type</label>
                <select
                  value={formData.scheduleType}
                  onChange={(e) => handleInputChange('scheduleType', e.target.value)}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Half Day">Half Day</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Schedule Description *</label>
              <textarea
                value={formData.scheduleDescription}
                onChange={(e) => handleInputChange('scheduleDescription', e.target.value)}
                placeholder="What will the employees in this schedule do?"
                rows="3"
              />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="edit-section">
            <h3>Employee Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Employee Name</label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) => handleInputChange('employeeName', e.target.value)}
                  placeholder="Employee name"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Employee No.</label>
                <input
                  type="text"
                  value={formData.employeeNo}
                  onChange={(e) => handleInputChange('employeeNo', e.target.value)}
                  placeholder="Employee number"
                  disabled
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="Department"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder="Job title"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="edit-section">
            <h3>Work Schedule</h3>
            <div className="form-group">
              <label>Work Days *</label>
              <div className="work-days">
                {['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'].map(day => (
                  <button
                    key={day}
                    type="button"
                    className={`day-button ${formData.workDays.includes(day) ? 'selected' : ''}`}
                    onClick={() => handleWorkDayToggle(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Work Start *</label>
                <input
                  type="time"
                  value={formData.workStart}
                  onChange={(e) => handleInputChange('workStart', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Work End *</label>
                <input
                  type="time"
                  value={formData.workEnd}
                  onChange={(e) => handleInputChange('workEnd', e.target.value)}
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Lateness Grace Period (mins)</label>
                <select
                  value={formData.latenessGrace}
                  onChange={(e) => handleInputChange('latenessGrace', parseInt(e.target.value))}
                >
                  <option value={5}>5 mins</option>
                  <option value={10}>10 mins</option>
                  <option value={15}>15 mins</option>
                  <option value={20}>20 mins</option>
                </select>
              </div>
              <div className="form-group">
                <label>Absence Grace Period (mins)</label>
                <select
                  value={formData.absenceGrace}
                  onChange={(e) => handleInputChange('absenceGrace', parseInt(e.target.value))}
                >
                  <option value={20}>20 mins</option>
                  <option value={30}>30 mins</option>
                  <option value={45}>45 mins</option>
                  <option value={60}>60 mins</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="edit-modal-footer">
          <div className="footer-buttons">
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button 
              className="btn-save" 
              onClick={handleSave}
              disabled={!isFormValid()}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditScheduleModal;