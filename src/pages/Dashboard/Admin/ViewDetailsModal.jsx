import React from 'react';
import './ViewDetailsModal.css';

const ViewDetailsModal = ({ schedule, onClose }) => {
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

    if (!days || days.length === 0) return 'No days selected';
    if (days.length === 5 && ['M', 'T', 'W', 'Th', 'F'].every(d => days.includes(d))) {
      return 'Monday - Friday';
    }
    if (days.length === 7) return 'Monday - Sunday';
    
    return days.map(d => dayMap[d]).join(', ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not set';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (!schedule) return null;

  return (
    <div className="view-modal-overlay">
      <div className="view-modal-container">
        <div className="view-modal-header">
          <h2>Schedule Details</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="view-modal-content">
          <div className="details-section">
            <h3>Schedule Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Schedule Name</label>
                <span>{schedule.scheduleName || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <label>Schedule Type</label>
                <span className={`schedule-type ${schedule.scheduleType?.toLowerCase().replace(' ', '-')}`}>
                  {schedule.scheduleType || 'N/A'}
                </span>
              </div>
              <div className="detail-item full-width">
                <label>Description</label>
                <span>{schedule.scheduleDescription || 'No description provided'}</span>
              </div>
              <div className="detail-item">
                <label>Start Date</label>
                <span>{formatDate(schedule.startDate)}</span>
              </div>
              <div className="detail-item">
                <label>End Date</label>
                <span>{formatDate(schedule.endDate)}</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>Employee Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Employee Name</label>
                <span>{schedule.employeeName || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <label>Employee Number</label>
                <span>{schedule.employeeNo || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <label>Department</label>
                <span>{schedule.department || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <label>Job Title</label>
                <span>{schedule.jobTitle || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>Work Schedule</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Work Days</label>
                <span>{formatWorkDays(schedule.workDays)}</span>
              </div>
              <div className="detail-item">
                <label>Schedule Summary</label>
                <span>{schedule.day || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <label>Work Start Time</label>
                <span>{formatTime(schedule.workStart)}</span>
              </div>
              <div className="detail-item">
                <label>Work End Time</label>
                <span>{formatTime(schedule.workEnd)}</span>
              </div>
              <div className="detail-item">
                <label>Total Hours</label>
                <span>{schedule.workStart && schedule.workEnd ? 
                  (() => {
                    const start = new Date(`2000-01-01T${schedule.workStart}`);
                    const end = new Date(`2000-01-01T${schedule.workEnd}`);
                    const diff = (end - start) / (1000 * 60 * 60);
                    return `${diff} hours`;
                  })() : 'N/A'
                }</span>
              </div>
              <div className="detail-item">
                <label>Time Range</label>
                <span>{schedule.time || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>Attendance Policies</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Lateness Grace Period</label>
                <span>{schedule.latenessGrace || 0} minutes</span>
              </div>
              <div className="detail-item">
                <label>Absence Grace Period</label>
                <span>{schedule.absenceGrace || 0} minutes</span>
              </div>
            </div>
            <div className="policy-info">
              <div className="policy-item">
                <div className="policy-icon lateness">⏰</div>
                <div className="policy-text">
                  <strong>Lateness Policy</strong>
                  <p>Employee will be marked as late if they arrive more than {schedule.latenessGrace || 0} minutes after their scheduled start time.</p>
                </div>
              </div>
              <div className="policy-item">
                <div className="policy-icon absence">🚫</div>
                <div className="policy-text">
                  <strong>Absence Policy</strong>
                  <p>Employee will be marked as absent if they arrive more than {schedule.absenceGrace || 0} minutes after their scheduled start time.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>Schedule Status</h3>
            <div className="status-container">
              <div className="status-badge active">
                <span className="status-dot"></span>
                Active Schedule
              </div>
              <div className="status-info">
                <p>This schedule is currently active and will apply to the assigned employee during the specified date range.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="view-modal-footer">
          <div className="footer-buttons">
            <button className="btn-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;