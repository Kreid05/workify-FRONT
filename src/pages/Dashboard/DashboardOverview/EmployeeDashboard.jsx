import React, { useState, useEffect } from 'react';
import { Calendar, Filter, ChevronDown } from 'lucide-react';
import ClockModal from './ClockModal';
import StatsSection from './StatsSection';
import AttendanceRecord from './AttendanceRecord';
import TasksSection from './TasksSection';
import CurrentTimeSection from './CurrentTimeSection';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeframe, setSelectedTimeframe] = useState('');
  const [showClockModal, setShowClockModal] = useState(false);
  const [clockType, setClockType] = useState('in');
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('Clocked Out');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const timeframes = ['This Week', 'This Month'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatTimeForDisplay = (date) => {
    if (!date) return '--';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleClockIn = () => {
    setClockType('in');
    setShowClockModal(true);
  };

  const handleClockOut = () => {
    setClockType('out');
    setShowClockModal(true);
  };

  const handleCloseModal = () => {
    setShowClockModal(false);
  };

  const handleClockSuccess = (clockData) => {
    if (clockData.type === 'in') {
      setClockInTime(clockData.datetime);
      setClockOutTime(null);
      setCurrentStatus('Clocked In');
    } else {
      setClockOutTime(clockData.datetime);
      setCurrentStatus('Clocked Out');
    }
  };

  const calculateWorkedHours = () => {
    if (!clockInTime) return '0.00';
    if (!clockOutTime) {
      const now = new Date();
      const diff = now - clockInTime;
      return (diff / (1000 * 60 * 60)).toFixed(2);
    }
    const diff = clockOutTime - clockInTime;
    return (diff / (1000 * 60 * 60)).toFixed(2);
  };

  const handleTimeframeSelect = (timeframe) => {
    setSelectedTimeframe(timeframe);
    setShowFilterDropdown(false);
  };

  const handleClearFilters = () => {
    setSelectedTimeframe('');
    setShowFilterDropdown(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome Back!</h1>
        
        <div className="filter-container" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
          <div className={`week-selector ${showFilterDropdown ? 'active' : ''}`}>
            <Filter className="filter-icon" />
            Filter by
            <ChevronDown className="filter-icon" />
          </div>
          {showFilterDropdown && (
            <div className="filter-dropdown show">
              <div className="filter-section">
                <div className="filter-section-title">Timeframes</div>
                {timeframes.map((timeframe) => (
                  <div 
                    key={timeframe}
                    className={`filter-option ${selectedTimeframe === timeframe ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTimeframeSelect(timeframe);
                    }}
                  >
                    {timeframe}
                  </div>
                ))}
              </div>
              <div className="filter-section">
                <div 
                  className="clear-filters"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearFilters();
                  }}
                >
                  Clear
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <StatsSection
        calculateWorkedHours={calculateWorkedHours}
        handleClockIn={handleClockIn}
        handleClockOut={handleClockOut}
        clockInTime={clockInTime}
        clockOutTime={clockOutTime}
        formatTimeForDisplay={formatTimeForDisplay}
        currentStatus={currentStatus}
      />

      <div className="lower-section-grid">
        <AttendanceRecord />
        <TasksSection />
      </div>

      <CurrentTimeSection
        currentTime={currentTime}
        currentStatus={currentStatus}
        formatTime={formatTime}
      />

      <ClockModal 
        isOpen={showClockModal}
        onClose={handleCloseModal}
        clockType={clockType}
        onClockSuccess={handleClockSuccess}
      />
    </div>
  );
};

export default EmployeeDashboard;