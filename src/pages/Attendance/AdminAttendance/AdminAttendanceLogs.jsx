import React, { useState, useEffect } from 'react';
import './AdminAttendanceLogs.css';
import AddLogsModal from './Modals/AddLogsModal';
import api from "../../../api/api";

const AdminAttendanceLogs = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [editingRow, setEditingRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  // fetch attendance logs
  useEffect(() => {
    // build query params based on filters
    let params = {};
    // only filter dept if not all dept
    if (selectedDepartment && selectedDepartment !== "All Departments") {
      params.department = selectedDepartment;
    }
    // only filter date if selectedDate is not empty
    if (selectedDate) {
      params.date = selectedDate;
    }

    api.get("/attendance-logs", { params })
      .then(res => {
        console.log("Attendance logs from backend:", res.data);
        const logs = res.data.map((log, idx) => ({
          id: log._id, 
          employeeName: log.employeeName,
          department: log.department,
          date: log.date,
          clockIn: log.clockIn,
          clockOut: log.clockOut,
          status: log.status,
          totalHrs: Number(log.totalHrs ?? 0).toFixed(1),
          regularHrs: Math.min(Number(log.totalHrs ?? 0), 8).toFixed(1), 
          overtime: Number(log.overtime ?? 0).toFixed(1)
        }));
        setAttendanceData(logs);
      })
      .catch(err => {
        console.error("Error fetching attendance logs:", err);
        setAttendanceData([]); 
      });
  }, [selectedDepartment, selectedDate]);

  const handleEdit = (id) => {
    setEditingRow(id);
  };

  const handleSave = (id, updatedData) => {
    setAttendanceData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleAddLog = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleSaveNewLog = (newLogData) => {
    const { clockIn, clockOut } = newLogData;
    const calculated = calculateHours(clockIn, clockOut);

    const newId = Math.max(0, ...attendanceData.map(item => item.id)) + 1;
    const newLogEntry = {
      id: newId,
      ...newLogData,
      ...calculated 
    };

    setAttendanceData(prev => [...prev, newLogEntry]);
    setShowAddModal(false);
  };

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

  const EditableRow = ({ item }) => {
    const [editData, setEditData] = useState({
      clockIn: item.clockIn,
      clockOut: item.clockOut,
      status: item.status,
      date: item.date
    });

    const handleInputChange = (field, value) => {
      setEditData(prev => ({
        ...prev,
        [field]: value
      }));
    };

    const handleSaveClick = async () => {
    const calculatedHours = calculateHours(editData.clockIn, editData.clockOut);

    // build update payload for backend
    const payload = {
      clockIn: editData.clockIn,
      clockOut: editData.clockOut,
      status: editData.status,
      date: editData.date,
      ...calculatedHours
    };

    try {
      await api.put(`/attendance-logs/${item.id}`, payload);
      handleSave(item.id, { ...editData, ...calculatedHours }); // update frontend state
    } catch (err) {
      alert("Error updating attendance log: " + (err.response?.data?.message || err.message));
    }
  };

    return (
      <tr className="edit-row">
        <td>{item.employeeName}</td>
        <td>{item.department}</td>
        <td>{item.date}</td>
        <td>
          <input 
            type="date" 
            value={editData.date || ''}
            onChange={e => handleInputChange('date', e.target.value)}
            className="edit-input"
          />
        </td>
        <td>
          <input 
            type="time" 
            value={editData.clockIn !== '--' ? editData.clockIn : ''}
            onChange={(e) => handleInputChange('clockIn', e.target.value || '--')}
            className="edit-input"
          />
        </td>
        <td>
          <input 
            type="time" 
            value={editData.clockOut !== '--' ? editData.clockOut : ''}
            onChange={(e) => handleInputChange('clockOut', e.target.value || '--')}
            className="edit-input"
          />
        </td>
        <td>
          <select 
            value={editData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="edit-select"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Half Day">Half Day</option>
            <option value="Leave">Leave</option>
          </select>
        </td>
        <td>{calculateHours(editData.clockIn, editData.clockOut).totalHrs}</td>
        <td>{calculateHours(editData.clockIn, editData.clockOut).regularHrs}</td>
        <td>{calculateHours(editData.clockIn, editData.clockOut).overtime}</td>
        <td>
          <div className="action-buttons">
            <button className="save-btn" onClick={handleSaveClick}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </td>
      </tr>
    );
  };

  const filteredData = attendanceData.filter(item =>
    item.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-attendance-logs">
      <div className="page-header">
        <h2>Daily Attendance Logs</h2>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Department</label>
          <select 
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="filter-select"
          >
            <option value="All Departments">All Departments</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>

        <button className="get-employees-btn">Get Employees</button>
        <button className="add-logs-btn" onClick={handleAddLog}>Add Logs</button>
      </div>

      <div className="table-controls">
        <div className="show-entries">
          <label>Show </label>
          <select 
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(e.target.value)}
            className="entries-select"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
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
          />
        </div>
      </div>

      <div className="table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee Name <span className="sort-arrows">⇅</span></th>
              <th>Department <span className="sort-arrows">⇅</span></th>
              <th>Date <span className="sort-arrows">⇅</span></th>
              <th>Clock In <span className="sort-arrows">⇅</span></th>
              <th>Clock Out <span className="sort-arrows">⇅</span></th>
              <th>Status <span className="sort-arrows">⇅</span></th>
              <th>Total Hrs <span className="sort-arrows">⇅</span></th>
              <th>Regular Hrs <span className="sort-arrows">⇅</span></th>
              <th>Overtime <span className="sort-arrows">⇅</span></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              editingRow === item.id ? (
                <EditableRow key={item.id} item={item} />
              ) : (
                <tr key={item.id}>
                  <td>{item.employeeName}</td>
                  <td>{item.department}</td>
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
                  <td>
                    <button 
                      className="update-btn"
                      onClick={() => handleEdit(item.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="showing-info">
          Showing 1 to {Math.min(entriesPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="pagination">
          <button className="page-btn">Previous</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">Next</button>
        </div>
      </div>

      <AddLogsModal 
        show={showAddModal}
        onClose={handleCloseModal}
        onSave={handleSaveNewLog}
        calculateHours={calculateHours}
      />
    </div>
  );
};

export default AdminAttendanceLogs;