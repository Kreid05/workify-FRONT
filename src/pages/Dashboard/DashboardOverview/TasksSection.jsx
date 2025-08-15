import React from 'react';
import { CheckCircle } from 'lucide-react';
import './TasksSection.css';

const TasksSection = () => {
  const tasks = [
    { id: 1, title: 'Make work certificate', date: '30/06/2023', progress: 60, status: 'In progress' },
    { id: 2, title: 'Call Ezekiel Olasiman', date: '3 June 2023 at 10:30 am', completed: true },
    { id: 3, title: 'Interview preparation', date: '5 June 2023', priority: 'high' }
  ];

  const schedule = [
    { time: '10:30 am', title: 'Meeting with Klei Pagatpatan', type: 'meeting' },
    { time: '10:30 am', title: 'Interview with Lim Alcovendas', type: 'interview' },
    { time: '2:00 pm', title: 'Lunch Break', type: 'break' }
  ];

  return (
    <div className="card-white">
      <div>
        <h3 className="tasks-title">Tasks (4)</h3>
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-header">
                <h4 className="task-title">{task.title}</h4>
                {task.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
              <div className="task-date">{task.date}</div>
              {task.progress && (
                <div className="task-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-status">{task.status}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="schedule-title">Schedule (3)</h3>
        <div className="schedule-list">
          {schedule.map((item, index) => (
            <div key={index} className="schedule-item">
              <div className="schedule-dot"></div>
              <div className="schedule-content">
                <div className="schedule-item-title">{item.title}</div>
                <div className="schedule-time">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksSection;