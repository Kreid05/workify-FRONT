import React, { useState, useEffect } from 'react';
import './SchedulingPage.css';
import ScheduleInformationModal from './Modals/ScheduleInformationModal';
import EditScheduleModal from './Modals/EditScheduleModal';
import ViewDetailsModal from './Modals/ViewDetailsModal';
import api from "../../api/api";

const SchedulingPage = () => {
  const [rawSchedules, setRawSchedules] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSchedules, setFilteredSchedules] = useState([]);

 // fetch schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data } = await api.get("/schedule");
        setRawSchedules(data); // <-- store originals
        setFilteredSchedules(data); // <-- use originals for table
      } catch (err) {
        console.error("Error fetching schedules:", err);
      }
    };
    fetchSchedules();
  }, []);

  // filtering
  useEffect(() => {
    if (!searchTerm) {
      setFilteredSchedules(rawSchedules);
    } else {
      setFilteredSchedules(
        rawSchedules.filter(schedule =>
          schedule.scheduleName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, rawSchedules]);

  const handleAddSchedule = (newSchedule) => {
    setRawSchedules(prev => [...prev, newSchedule]);
    setIsModalOpen(false);
  };

  const handleUpdateSchedule = (updatedSchedule) => {
    setRawSchedules(prev =>
      prev.map(sch => sch._id === updatedSchedule._id ? updatedSchedule : sch)
    );
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
      <div className="page-header">
        <h1>Employee Scheduling</h1>
        <button 
          className="btn-add-schedule"
          onClick={() => setIsModalOpen(true)}
        >
          Add Schedule
        </button>
      </div>

      <div className="search-filter-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Schedule Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="filter-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 4H21V6H3V4ZM7 10H17V12H7V10ZM9 16H15V18H9V16Z" fill="#002347"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="schedules-table">
          <thead>
            <tr>
              <th>Schedule Name</th>
              <th>Day</th>
              <th>Time</th>
              <th>Schedule Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) => (
                <tr key={schedule._id}>
                  <td>{schedule.scheduleName}</td>
                  <td>{schedule.workDays && schedule.workDays.length > 0 ? schedule.workDays.join(', ') : 'No days selected'}</td>
                  <td>{`${schedule.workStart} - ${schedule.workEnd}`}</td>
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