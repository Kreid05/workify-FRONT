import React, { useState, useEffect } from 'react';
import './AdminAttendanceLogs.css';
import AddLogsModal from './Modals/AddLogsModal';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import api from "../../../api/api";
import { FaFilter } from "react-icons/fa";

const AdminAttendanceLogs = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [editingRow, setEditingRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      <tr className="admin-attendance-edit-row">
        <td>{item.employeeName}</td>
        <td>{item.department}</td>
        <td>
          <input 
            type="date" 
            value={editData.date || ''}
            onChange={e => handleInputChange('date', e.target.value)}
            className="admin-attendance-edit-input"
          />
        </td>
        <td>
          <input 
            type="time" 
            value={editData.clockIn !== '--' ? editData.clockIn : ''}
            onChange={(e) => handleInputChange('clockIn', e.target.value || '--')}
            className="admin-attendance-edit-input"
          />
        </td>
        <td>
          <input 
            type="time" 
            value={editData.clockOut !== '--' ? editData.clockOut : ''}
            onChange={(e) => handleInputChange('clockOut', e.target.value || '--')}
            className="admin-attendance-edit-input"
          />
        </td>
        <td>
          <select 
            value={editData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="admin-attendance-edit-select"
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
          <div className="admin-attendance-action-buttons">
            <button className="admin-attendance-save-btn" onClick={handleSaveClick}><FaCheckCircle size={16} /></button>
            <button className="admin-attendance-cancel-btn" onClick={handleCancel}><FaTimesCircle size={16} /></button>
          </div>
        </td>
      </tr>
    );
  };

  const filteredData = attendanceData.filter(item =>
    item.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique departments from attendance data
  const uniqueDepartments = [...new Set(attendanceData.map(item => item.department))].sort();
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setIsFilterOpen(false);
  };

  const clearFilter = () => {
    setSelectedDepartment('All Departments');
    setIsFilterOpen(false);
  };

  return (
    <div className="admin-attendance-logs">
      <div className="admin-attendance-control-container">
        <div className="admin-attendance-search-container">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-attendance-search-input"
            placeholder="Search employees..."
          />
        </div>

        <div className="admin-attendance-filter-group">
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="admin-attendance-date-input"
          />
        </div>
        
        <div className="admin-attendance-filter-container">
          <button 
            className={`admin-attendance-filter-button ${selectedDepartment !== 'All Departments' ? 'active' : ''}`}
            onClick={toggleFilter}
          >
            <FaFilter />
          </button>
          {isFilterOpen && (
            <div className="admin-attendance-filter-dropdown">
              <div className="admin-attendance-filter-dropdown-header">
                <span>Filter by Department</span>
                <button 
                  className="admin-attendance-clear-filter-btn"
                  onClick={clearFilter}
                >
                  Clear
                </button>
              </div>
              <div
                className={`admin-attendance-filter-option ${selectedDepartment === 'All Departments' ? 'selected' : ''}`}
                onClick={() => handleDepartmentSelect('All Departments')}
              >
                All Departments
              </div>
              {uniqueDepartments.map((department) => (
                <div
                  key={department}
                  className={`admin-attendance-filter-option ${selectedDepartment === department ? 'selected' : ''}`}
                  onClick={() => handleDepartmentSelect(department)}
                >
                  {department}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="admin-attendance-add-logs-btn" onClick={handleAddLog}>Add Logs</button>
      </div>

      <div className="admin-attendance-table-container">
        <table className="admin-attendance-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Status</th>
              <th>Total Hrs</th>
              <th>Regular Hrs</th>
              <th>Overtime</th>
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
                    <span className={`admin-attendance-status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.totalHrs}</td>
                  <td>{item.regularHrs}</td>
                  <td>{item.overtime}</td>
                  <td>
                    <button 
                      className="admin-attendance-update-btn"
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

      <div className="admin-attendance-table-footer">
        <div className="admin-attendance-show-entries">
          <label>Show </label>
          <select 
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(e.target.value)}
            className="admin-attendance-entries-select"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span> entries</span>
        </div>
        <div className="admin-attendance-showing-info">
          Showing 1 to {Math.min(entriesPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="admin-attendance-pagination">
          <button className="admin-attendance-page-btn">Previous</button>
          <button className="admin-attendance-page-btn active">1</button>
          <button className="admin-attendance-page-btn">Next</button>
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