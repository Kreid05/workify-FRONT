import React from 'react'; 
import { Clock, Timer, Users } from 'lucide-react'; 
import './StatsSection.css'; 
 
const StatsSection = ({  
  calculateWorkedHours,  
  handleClockIn,  
  handleClockOut,  
  clockInTime,  
  clockOutTime,  
  formatTimeForDisplay,  
  currentStatus  
}) => { 
  return ( 
    <div className="stats-grid"> 
      <div className="card-gradient"> 
        <div className="summary-card-header"> 
          <h3 className="summary-card-title">Today's Summary</h3> 
          <p className="summary-card-subtitle">You have "Full time schedule" today</p> 
        </div> 
        <div> 
          <div className="summary-hours">{calculateWorkedHours()} hrs</div> 
          <div className="clock-buttons"> 
            <button  
              onClick={handleClockIn} 
              disabled={clockInTime && !clockOutTime} 
              className="clock-button" 
            > 
              Clock In 
            </button> 
            <button  
              onClick={handleClockOut} 
              disabled={!clockInTime || clockOutTime} 
              className="clock-button" 
            > 
              Clock Out 
            </button> 
          </div> 
          <div className="clock-times"> 
            <div className="clock-time-item"> 
              <div>Clock-In Time</div> 
              <div>{formatTimeForDisplay(clockInTime)}</div> 
            </div> 
            <div className="clock-time-item"> 
              <div>Clock-Out Time</div> 
              <div>{formatTimeForDisplay(clockOutTime)}</div> 
            </div> 
          </div> 
        </div> 
      </div> 
 
      <div className="stat-card"> 
        <div className="stat-card-content"> 
          <h3 className="stat-card-title">Total Hours Worked (Last 15d)</h3> 
          <div className="stat-number">12.0</div> 
        </div> 
        <div className="stat-card-icon-container"> 
          <Clock className="stat-card-icon text-blue-500" /> 
          <div className="online-indicator"></div> 
        </div> 
      </div> 
 
      <div className="stat-card stat-card-late"> 
        <div className="stat-card-content"> 
          <h3 className="stat-card-title">Number of Late Resumptions (15d)</h3> 
          <div className="stat-number">0</div> 
        </div> 
        <div className="stat-card-icon-container"> 
          <Timer className="stat-card-icon text-orange-500" /> 
          <div className="online-indicator"></div> 
        </div> 
      </div> 
 
      <div className="stat-card stat-card-absences"> 
        <div className="stat-card-content"> 
          <h3 className="stat-card-title">Number of Absences (15d)</h3> 
          <div className="stat-number">3</div> 
        </div> 
        <div className="stat-card-icon-container"> 
          <Users className="stat-card-icon text-red-500" /> 
          <div className="online-indicator"></div> 
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default StatsSection;