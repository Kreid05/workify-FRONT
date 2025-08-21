import React from 'react';
import './AttendanceRecord.css';

const AttendanceRecord = () => {
  const attendanceData = [
    { date: '05-06-2024', clockIn: '--', clockOut: '--', status: 'ABSENT', totalHours: '0.00', regularHours: '0.00', overtime: '0.00' },
    { date: '04-06-2024', clockIn: '--', clockOut: '--', status: 'ABSENT', totalHours: '0.00', regularHours: '0.00', overtime: '0.00' },
    { date: '03-06-2024', clockIn: '--', clockOut: '--', status: 'ABSENT', totalHours: '0.00', regularHours: '0.00', overtime: '0.00' },
    { date: '31-05-2024', clockIn: '08:02', clockOut: '17:15', status: 'PRESENT', totalHours: '9.13', regularHours: '8.00', overtime: '1.13' },
    { date: '30-05-2024', clockIn: '08:15', clockOut: '17:00', status: 'PRESENT', totalHours: '8.45', regularHours: '8.45', overtime: '0.00' }
  ];

  return (
    <div className="card-white">
      <div className="attendance-header">
        <h3 className="attendance-title">Attendance Record</h3>
        <button className="view-all-link">View All</button>
      </div>
      
      <div className="table-header">
        <div>DATE</div>
        <div>CLOCK IN</div>
        <div>CLOCK OUT</div>
        <div>STATUS</div>
        <div>TOTAL HOURS</div>
        <div>REGULAR HOURS</div>
        <div>OVERTIME</div>
      </div>
    
      <div className="table-body">
        {attendanceData.map((record, index) => (
          <div key={index} className="table-row">
            <div>{record.date}</div>
            <div>{record.clockIn}</div>
            <div>{record.clockOut}</div>
            <div>{record.status}</div>
            <div>{record.totalHours}</div>
            <div>{record.regularHours}</div>
            <div>{record.overtime}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceRecord;