import React, { useState, useEffect } from 'react';
import './SchedulingPage.css';
import ScheduleInformationModal from './Modals/ScheduleInformationModal';
import EditScheduleModal from './Modals/EditScheduleModal';
import ViewDetailsModal from './Modals/ViewDetailsModal';

const SchedulingPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  // Sample data
  useEffect(() => {
    const sampleSchedules = [
      {
        id: 1,
        employeeName: 'Lim Alcovendas',
        employeeNo: 'EM25001',
        day: 'Monday - Friday',
        time: '07:30 - 16:00',
        scheduleType: 'Full Time',
        department: 'IT',
        jobTitle: 'Frontend Developer',
        scheduleName: 'Development Team Schedule',
        scheduleDescription: 'Standard working hours for development team',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        workDays: ['M', 'T', 'W', 'T', 'F'],
        workStart: '07:30',
        workEnd: '16:00',
        latenessGrace: 15,
        absenceGrace: 30
      },
      {
        id: 2,
        employeeName: 'Klei Ishia Pagatpatan',
        employeeNo: 'EM25002',
        day: 'Monday - Wednesday',
        time: '08:00 - 12:00',
        scheduleType: 'Half Day',
        department: 'IT',
        jobTitle: 'Frontend Developer',
        scheduleName: 'Half Day Morning Shift',
        scheduleDescription: 'Morning shift for part-time employees',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        workDays: ['M', 'T', 'W'],
        workStart: '08:00',
        workEnd: '12:00',
        latenessGrace: 10,
        absenceGrace: 20
      }
    ];
    setSchedules(sampleSchedules);
    setFilteredSchedules(sampleSchedules);
  }, []);


  useEffect(() => {
    const filtered = schedules.filter(schedule =>
      schedule.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.employeeNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSchedules(filtered);
  }, [searchTerm, schedules]);

  const handleAddSchedule = (newSchedule) => {
    const scheduleWithId = {
      ...newSchedule,
      id: schedules.length + 1
    };
    const updatedSchedules = [...schedules, scheduleWithId];
    setSchedules(updatedSchedules);
    setIsModalOpen(false);
  };

  const handleUpdateSchedule = (updatedSchedule) => {
    const updatedSchedules = schedules.map(schedule =>
      schedule.id === updatedSchedule.id ? updatedSchedule : schedule
    );
    setSchedules(updatedSchedules);
    setIsEditModalOpen(false);
    setSelectedSchedule(null);
  };

  const handleEditClick = (schedule) => {
    setSelectedSchedule(schedule);
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (schedule) => {
    setSelectedSchedule(schedule);
    setIsViewModalOpen(true);
  };

  return (
    <div className="scheduling-page">
      <div className="top-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by username, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button 
          className="btn-add-schedule"
          onClick={() => setIsModalOpen(true)}
        >
          Add Schedule
        </button>
      </div>

      <div className="table-container">
        <table className="schedules-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Day</th>
              <th>Time</th>
              <th>Schedule Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.employeeName}</td>
                  <td>{schedule.day}</td>
                  <td>{schedule.time}</td>
                  <td>{schedule.scheduleType}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-update"
                        onClick={() => handleEditClick(schedule)}
                      >
                        Update
                      </button>
                      <button
                        className="btn-view"
                        onClick={() => handleViewDetails(schedule)}
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No schedules found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Rows per page: 6</span>
        <span>1-{filteredSchedules.length} of {filteredSchedules.length}</span>
        <div className="pagination-controls">
          <button disabled>‹</button>
          <button disabled>›</button>
        </div>
      </div>

      {isModalOpen && (
        <ScheduleInformationModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddSchedule}
        />
      )}

      {isEditModalOpen && selectedSchedule && (
        <EditScheduleModal
          schedule={selectedSchedule}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedSchedule(null);
          }}
          onSave={handleUpdateSchedule}
        />
      )}

      {isViewModalOpen && selectedSchedule && (
        <ViewDetailsModal
          schedule={selectedSchedule}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedSchedule(null);
          }}
        />
      )}
    </div>
  );
};

export default SchedulingPage;