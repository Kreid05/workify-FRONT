import React, { useState } from 'react';
import './EmployeeAttendanceLogs.css';

const EmployeeAttendanceLogs = () => {
  const [selectedDate, setSelectedDate] = useState('2024-02-02');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const attendanceData = [
    {
      id: 1,
      date: '2024-02-01',
      clockIn: '09:00',
      clockOut: '17:30',
      status: 'Present'
    },
    {
      id: 2,
      date: '2024-02-02',
      clockIn: '08:45',
      clockOut: '17:15',
      status: 'Present'
    },
    {
      id: 3,
      date: '2024-02-03',
      clockIn: '09:15',
      clockOut: '18:00',
      status: 'Late'
    },
    {
      id: 4,
      date: '2024-02-04',
      clockIn: '--',
      clockOut: '--',
      status: 'Leave'
    },
    {
      id: 5,
      date: '2024-02-05',
      clockIn: '09:00',
      clockOut: '13:00',
      status: 'Half Day'
    },
    {
      id: 6,
      date: '2024-02-06',
      clockIn: '09:00',
      clockOut: '17:00',
      status: 'Present'
    },
    {
      id: 7,
      date: '2024-02-07',
      clockIn: '08:30',
      clockOut: '17:45',
      status: 'Present'
    }
  ];

  const filteredData = attendanceData.filter(item =>
    item.date.includes(searchTerm) || 
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEntriesPerPageChange = (value) => {
    setEntriesPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="employee-attendance-logs">
      <div className="page-header">
        <h2>My Attendance Logs</h2>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Date Filter</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>
      </div>

      <div className="table-controls">
        <div className="show-entries">
          <label>Show </label>
          <select 
            value={entriesPerPage}
            onChange={(e) => handleEntriesPerPageChange(e.target.value)}
            className="entries-select"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={18}>18</option>
            <option value={24}>24</option>
          </select>
          <span> entries</span>
        </div>

        <div className="search-box">
          <label>Search: </label>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            placeholder="Search by date or status..."
          />
        </div>
      </div>

      <div className="table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date <span className="sort-arrows">⇅</span></th>
              <th>Clock In <span className="sort-arrows">⇅</span></th>
              <th>Clock Out <span className="sort-arrows">⇅</span></th>
              <th>Status <span className="sort-arrows">⇅</span></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.clockIn}</td>
                <td>{item.clockOut}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="showing-info">
          {filteredData.length === 0 ? (
            "Showing 0 to 0 of 0 entries"
          ) : (
            `${startIndex + 1}-${Math.min(endIndex, filteredData.length)} of ${filteredData.length}`
          )}
        </div>
        <div className="pagination">
          <div className="pagination-text">
            Rows per page:
            <select 
              value={entriesPerPage}
              onChange={(e) => handleEntriesPerPageChange(e.target.value)}
              className="pagination-select"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
              <option value={24}>24</option>
            </select>
          </div>
          <div className="pagination-controls">
            <button 
              className="page-btn" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            <button 
              className="page-btn" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceLogs;