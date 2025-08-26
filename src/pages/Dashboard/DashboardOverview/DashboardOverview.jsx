import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaClipboardList, FaCreditCard, FaUsers } from "react-icons/fa";
import "./DashboardOverview.css";
import api from "../../../api/api";

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [remainingTasks, setRemainingTasks] = useState(0); 
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [pendingTaskCount, setPendingTaskCount] = useState(0);
  const [totalTaskCount, setTotalTaskCount] = useState(0);

  // fetch tasks and calculate totals for stats
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        let inProgress = 0;
        let completed = 0;
        let pending = 0;

        res.data.forEach(task => {
          const status = (task.status || "").toLowerCase();
          if (status === "in progress") inProgress += 1;
          if (status === "completed") completed += 1;
          if (status === "pending") pending += 1;
        });

        setRemainingTasks(inProgress);
        setCompletedTasks(completed);
        setPendingTasks(pending);
        setPendingTaskCount(pending); 
        setTotalTaskCount(res.data.length); 
      } catch (err) {
        setRemainingTasks(0);
        setCompletedTasks(0);
        setPendingTasks(0);
        setPendingTaskCount(0);
        setTotalTaskCount(0);
      }
    };

    fetchTasks();
  }, []);

  const totalEmployees = 45;

  const handleRemainingTasksClick = () => {
    navigate('/dashboard/progress');
  };

  const handleCompletedTasksClick = () => {
    navigate('/dashboard/progress');
  };

  const handlePendingTasksClick = () => {
    navigate('/dashboard/task');
  };

  const recentlyHired = [
    { name: "Chris Friedkly", department: "Engineering", jobTitle: "Software Engineer", hiredDate: "August 11, 2025" },
    { name: "Maggie Johnson", department: "Marketing", jobTitle: "Marketing Manager", hiredDate: "August 9, 2025" },
    { name: "Gael Harry", department: "Finance", jobTitle: "Financial Analyst", hiredDate: "August 9, 2025" },
    { name: "Jenna Sullivan", department: "HR", jobTitle: "HR Specialist", hiredDate: "August 5, 2025" },
  ];

  const hiredHistoryData = [
    { year: 2016, monthlyRate: 5 },
    { year: 2017, monthlyRate: 8 },
    { year: 2018, monthlyRate: 12 },
    { year: 2019, monthlyRate: 15 },
    { year: 2020, monthlyRate: 10 },
    { year: 2021, monthlyRate: 18 },
    { year: 2022, monthlyRate: 22 },
    { year: 2023, monthlyRate: 25 },
  ];

  const topEmployeeMonth = {
    name: "Chris Redfield",
    month: "August",
  };

  const topEmployeeYear = {
    name: "Leon Kennedy",
    year: 2024,
  };

  // circular progress bar calculation
  const progressPercent = totalTaskCount > 0 ? (pendingTaskCount / totalTaskCount) * 100 : 0;

  return (
    <div className="hr-dashboard-container">
      <div className="hr-dashboard-stats-row">
      <div className="hr-stat-card stat-card-remainingTask" onClick={handleRemainingTasksClick} style={{ cursor: 'pointer' }}>
        <div className="hr-stat-header">
          <h3>Remaining Tasks</h3>
        </div>
        <div className="hr-stat-main">
          <div className="hr-stat-number">{remainingTasks}</div>
          <FaClipboardList className="stat-icon" />
        </div>
        <div className="hr-stat-subtext">In progress tasks</div>
        <div className="hr-stat-link">Progress &rarr;</div>
      </div>

      <div className="hr-stat-card stat-card-completedTask" onClick={handleCompletedTasksClick} style={{ cursor: 'pointer' }}>
        <div className="hr-stat-header">
          <h3>Completed Tasks</h3>
        </div>
        <div className="hr-stat-main">
          <div className="hr-stat-number">{completedTasks}</div>
          <FaClipboardList className="stat-icon" />
        </div>
        <div className="hr-stat-subtext">Finished tasks</div>
        <div className="hr-stat-link">Details &rarr;</div>
      </div>

      <div className="hr-stat-card stat-card-totalPaid" onClick={handlePendingTasksClick} style={{ cursor: 'pointer' }}>
        <div className="hr-stat-header">
          <h3>Pending Tasks</h3>
        </div>
        <div className="hr-stat-main">
          <div className="hr-stat-number">{pendingTasks}</div>
          <FaClipboardList className="stat-icon" />
        </div>
        <div className="hr-stat-subtext">
          Pending Tasks
        </div>
        <div className="hr-stat-link">Details &rarr;</div>
      </div>

          <div className="hr-stat-card stat-card-pendingPayments">
          <div className="hr-stat-header">
            <h3>Pending Tasks</h3>
          </div>
          <div className="hr-semi-circle-progress-container">
            <svg
              className="hr-semi-circle-progress"
              width="120"
              height="60"
              viewBox="0 0 120 60"
            >
              <path
                className="hr-progress-bg-semi"
                d="M 10 60 A 50 50 0 0 1 110 60"
                strokeWidth="12"
                fill="none"
              />
              <path
                className="hr-progress-bar-semi"
                d="M 10 60 A 50 50 0 0 1 110 60"
                strokeWidth="12"
                fill="none"
                strokeDasharray="157"
                strokeDashoffset={157 * (1 - progressPercent / 100)}
              />
              <text
                x="60"
                y="45"
                textAnchor="middle"
                dominantBaseline="middle"
                className="hr-progress-text-semi"
              >
                {pendingTaskCount}/{totalTaskCount}
              </text>
            </svg>
          </div>
          <div className="hr-stat-subtext-small">
            Pending Tasks out of Total Tasks
          </div>
        </div>
      </div>

      <div className="hr-dashboard-lower-row">
        <div className="hr-recently-hired-card">
          <h3>Recently Hired</h3>
          <ul className="hr-recently-hired-list">
            {recentlyHired.map((employee, index) => (
              <li key={index} className="recently-hired-item">
                <div className="hr-hired-name">{employee.name}</div>
                <div className="hr-hired-department">{employee.department}</div>
                <div className="hr-hired-job-title">{employee.jobTitle}</div>
                <div className="hr-hired-hired-date">{employee.hiredDate}</div>
              </li>
            ))}
          </ul>
          <div className="hr-stat-link-orange">Hired History &rarr;</div>
        </div>

        <div className="hr-hired-history-card">
          <div className="hr-hired-history-header">
            <h3>Hired History</h3>
            <select className="hr-yearly-select" defaultValue="yearly">
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={hiredHistoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#333" />
              <YAxis stroke="#333" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="monthlyRate"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorSalary)"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="hr-bottom-cards-row">
            <div className="hr-bottom-card">
              <div className="hr-bottom-card-title">Top Employee of the Month</div>
              <div className="hr-bottom-card-name">{topEmployeeMonth.name}</div>
              <div className="hr-bottom-card-sub">{topEmployeeMonth.month}</div>
            </div>
            <div className="hr-bottom-card">
              <div className="hr-bottom-card-title">Top Employee of the Year</div>
              <div className="hr-bottom-card-name">{topEmployeeYear.name}</div>
              <div className="hr-bottom-card-sub">{topEmployeeYear.year}</div>
            </div>
            <div className="hr-bottom-card">
              <div className="hr-bottom-card-title">Total Employee</div>
              <FaUsers className="hr-bottom-card-icon" />
              <div className="hr-bottom-card-number">{totalEmployees}</div>
              <div className="hr-bottom-card-sub">Employees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;