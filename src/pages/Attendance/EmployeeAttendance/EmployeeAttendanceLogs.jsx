import React, { useState, useEffect } from 'react';
import './EmployeeAttendanceLogs.css';
import api from "../../../api/api";

const EmployeeAttendanceLogs = () => {
  const [selectedDate, setSelectedDate] = useState('2024-02-02');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // build query params based on filters
    let params = {};
    if (selectedDate) params.date = selectedDate;

    api.get("/attendance-logs", { params }) 
      .then(res => {
        // map backend
        const logs = res.data.map((log, idx) => {
          const calculated = calculateHours(log.clockIn, log.clockOut, log.status);

          return {
            id: log._id,
            date: log.date,
            clockIn: log.clockIn,
            clockOut: log.clockOut,
            status: log.status,
            ...calculated
          };
        });
        setAttendanceData(logs);
      })
      .catch(err => {
        console.error("Error fetching employee attendance logs:", err);
        setAttendanceData([]);
      });
  }, [selectedDate]);

  // filtering
  const filteredData = attendanceData.filter(item =>
    item.date.includes(searchTerm) || 
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateHours = (clockIn, clockOut, status = "Present") => {
    if (clockIn === '--' || clockOut === '--' || !clockIn || !clockOut) {
      return { totalHrs: '0', regularHrs: '0', overtime: '0' };
    }

    const startTime = new Date(`2024-01-01 ${clockIn}`);
    const endTime = new Date(`2024-01-01 ${clockOut}`);
    const diffMs = endTime - startTime;
    const totalHours = diffMs / (1000 * 60 * 60);

    let regularCap = 8;
    if (status === "Half Day") regularCap = 4;
    if (status === "Absent" || status === "Leave") regularCap = 0;

    const regularHrs = Math.min(totalHours, regularCap);
    const overtime = Math.max(0, totalHours - regularCap);

    return {
      totalHrs: parseFloat(totalHours.toFixed(1)),
      regularHrs: parseFloat(regularHrs.toFixed(1)),
      overtime: parseFloat(overtime.toFixed(1))
    };
  };
  
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEntriesPerPageChange = (value) => {
    setEntriesPerPage(parseInt(value));
    setCurrentPage(1); 
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
              <th>Total Hrs</th>
              <th>Regular Hrs</th>
              <th>Overtime</th>
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
                <td>{item.totalHrs}</td>
                <td>{item.regularHrs}</td>
                <td>{item.overtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="showing-info">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="pagination">
          <button className="page-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          {[...Array(totalPages).keys()].map(pageNum => (
            <button
              key={pageNum + 1}
              className={`page-btn${currentPage === pageNum + 1 ? " active" : ""}`}
              onClick={() => handlePageChange(pageNum + 1)}
            >
              {pageNum + 1}
            </button>
          ))}
          <button className="page-btn" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceLogs;