import React, { useState } from 'react';
import './AdminAttendanceLogs.css';
import AddLogsModal from './Modals/AddLogsModal';

const AdminAttendanceLogs = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedDate, setSelectedDate] = useState('2024-02-02');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [editingRow, setEditingRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      employeeName: 'Regine Hambiol',
      department: 'IT',
      date: '2024-02-02',
      clockIn: '09:00',
      clockOut: '17:30',
      status: 'Present',
      totalHrs: '8.5',
      regularHrs: '8.0',
      overtime: '0.5'
    },
    {
      id: 2,
      employeeName: 'Lim Alcovendas',
      department: 'HR',
      date: '2024-02-02',
      clockIn: '08:45',
      clockOut: '17:15',
      status: 'Present',
      totalHrs: '8.5',
      regularHrs: '8.0',
      overtime: '0.5'
    },
    {
      id: 3,
      employeeName: 'Klei Ishia Pagatpatan',
      department: 'Finance',
      date: '2024-02-02',
      clockIn: '09:15',
      clockOut: '18:00',
      status: 'Late',
      totalHrs: '8.75',
      regularHrs: '8.0',
      overtime: '0.75'
    },
    {
      id: 4,
      employeeName: 'Ezekiel Olasiman',
      department: 'Operations',
      date: '2024-02-02',
      clockIn: '--',
      clockOut: '--',
      status: 'Absent',
      totalHrs: '0',
      regularHrs: '0',
      overtime: '0'
    },
    {
      id: 5,
      employeeName: 'Kai Cruz',
      department: 'IT',
      date: '2024-02-02',
      clockIn: '09:00',
      clockOut: '13:00',
      status: 'Half Day',
      totalHrs: '4.0',
      regularHrs: '4.0',
      overtime: '0'
    }
  ]);

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
    const newId = Math.max(...attendanceData.map(item => item.id)) + 1;
    const newLogEntry = {
      id: newId,
      ...newLogData
    };

    setAttendanceData(prev => [...prev, newLogEntry]);
    setShowAddModal(false);
  };

  const calculateHours = (clockIn, clockOut) => {
    if (clockIn === '--' || clockOut === '--' || !clockIn || !clockOut) {
      return { totalHrs: '0', regularHrs: '0', overtime: '0' };
    }
    
    const startTime = new Date(`2024-01-01 ${clockIn}`);
    const endTime = new Date(`2024-01-01 ${clockOut}`);
    const diffMs = endTime - startTime;
    const totalHours = diffMs / (1000 * 60 * 60);
    
    const regularHrs = Math.min(totalHours, 8);
    const overtime = Math.max(0, totalHours - 8);
    
    return {
      totalHrs: totalHours.toFixed(1),
      regularHrs: regularHrs.toFixed(1),
      overtime: overtime.toFixed(1)
    };
  };

  const EditableRow = ({ item }) => {
    const [editData, setEditData] = useState({
      clockIn: item.clockIn,
      clockOut: item.clockOut,
      status: item.status
    });

    const handleInputChange = (field, value) => {
      setEditData(prev => ({
        ...prev,
        [field]: value
      }));
    };

    const handleSaveClick = () => {
      const calculatedHours = calculateHours(editData.clockIn, editData.clockOut);
      handleSave(item.id, { ...editData, ...calculatedHours });
    };

    return (
      <tr className="edit-row">
        <td>{item.employeeName}</td>
        <td>{item.department}</td>
        <td>{item.date}</td>
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
