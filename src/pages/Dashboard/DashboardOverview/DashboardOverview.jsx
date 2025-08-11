import React from "react";
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

const DashboardOverview = () => {
  const navigate = useNavigate();
  
  // Hardcoded data for demo purposes
  const remainingTasks = 7;
  const completedTasks = 15;
  const totalEmployees = 45;
  const totalPaidEmployees = 38;
  const pendingPayments = 7;
  const pendingTotal = 45;

  const handleRemainingTasksClick = () => {
    navigate('/dashboard/progress');
  };

  const handleCompletedTasksClick = () => {
    navigate('/dashboard/progress');
  };

  const handleTotalPaidEmployeesClick = () => {
    navigate('/dashboard/payment-history');
  };

  const recentPayments = [
    { name: "Chris Friedkly", amount: 50000, date: "August 11, 2025" },
    { name: "Maggie Johnson", amount: 50000, date: "August 9, 2025" },
    { name: "Gael Harry", amount: 50000, date: "August 9, 2025" },
    { name: "Jenna Sullivan", amount: 50000, date: "August 5, 2025" },
  ];

  const salaryHistoryData = [
    { year: 2016, salary: 5000 },
    { year: 2017, salary: 10000 },
    { year: 2018, salary: 30000 },
    { year: 2019, salary: 60000 },
    { year: 2020, salary: 8000 },
    { year: 2021, salary: 12000 },
    { year: 2022, salary: 55000 },
    { year: 2023, salary: 100000 },
  ];

  const topEmployeeMonth = {
    name: "Chris Redford",
    month: "August",
  };

  const topEmployeeYear = {
    name: "Leon Kennedy",
    year: 2024,
  };

  // Circular progress bar calculation
  const progressPercent = (pendingPayments / pendingTotal) * 100;

  return (
    <div className="dashboard-container">
      <div className="dashboard-stats-row">
      <div className="stat-card stat-card-black" onClick={handleRemainingTasksClick} style={{ cursor: 'pointer' }}>
        <div className="stat-header">
          <h3>Remaining Tasks</h3>
        </div>
        <div className="stat-main">
          <div className="stat-number">{remainingTasks}</div>
          <FaClipboardList className="stat-icon" />
        </div>
        <div className="stat-subtext">On progress tasks</div>
        <div className="stat-link">Progress &rarr;</div>
      </div>

      <div className="stat-card stat-card-grey" onClick={handleCompletedTasksClick} style={{ cursor: 'pointer' }}>
        <div className="stat-header">
          <h3>Completed Tasks</h3>
        </div>
        <div className="stat-main">
          <div className="stat-number">{completedTasks}</div>
          <FaClipboardList className="stat-icon" />
        </div>
        <div className="stat-subtext">Finished tasks</div>
        <div className="stat-link">Details &rarr;</div>
      </div>

      <div className="stat-card stat-card-orange" onClick={handleTotalPaidEmployeesClick} style={{ cursor: 'pointer' }}>
        <div className="stat-header">
          <h3>Total Paid Employees</h3>
        </div>
        <div className="stat-main">
          <div className="stat-number">{totalPaidEmployees}</div>
          <FaCreditCard className="stat-icon" />
        </div>
        <div className="stat-subtext">
          Already paid the salaries of the employees
        </div>
        <div className="stat-link">Payment History &rarr;</div>
      </div>

          <div className="stat-card stat-card-white">
          <div className="stat-header">
            <h3>Pending Payments</h3>
          </div>
          <div className="semi-circle-progress-container">
            <svg
              className="semi-circle-progress"
              width="120"
              height="60"
              viewBox="0 0 120 60"
            >
              <path
                className="progress-bg-semi"
                d="M 10 60 A 50 50 0 0 1 110 60"
                strokeWidth="12"
                fill="none"
              />
              <path
                className="progress-bar-semi"
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
                className="progress-text-semi"
              >
                {pendingPayments}/{pendingTotal}
              </text>
            </svg>
          </div>
          <div className="stat-subtext-small">
            Employees has not yet given their salary
          </div>
        </div>
      </div>

      <div className="dashboard-lower-row">
        <div className="recent-payments-card">
          <h3>Recent Payments</h3>
          <ul className="recent-payments-list">
            {recentPayments.map((payment, index) => (
              <li key={index} className="recent-payment-item">
                <div className="payment-name">{payment.name}</div>
                <div className="payment-amount">₱ {payment.amount.toLocaleString()}</div>
                <div className="payment-date">{payment.date}</div>
              </li>
            ))}
          </ul>
          <div className="stat-link-orange">Payment History &rarr;</div>
        </div>

        <div className="salary-history-card">
          <div className="salary-history-header">
            <h3>Salary History</h3>
            <select className="yearly-select" defaultValue="yearly">
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salaryHistoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                dataKey="salary"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorSalary)"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="bottom-cards-row">
            <div className="bottom-card">
              <div className="bottom-card-title">Top Employee of the Month</div>
              <div className="bottom-card-name">{topEmployeeMonth.name}</div>
              <div className="bottom-card-sub">{topEmployeeMonth.month}</div>
            </div>
            <div className="bottom-card">
              <div className="bottom-card-title">Top Employee of the Year</div>
              <div className="bottom-card-name">{topEmployeeYear.name}</div>
              <div className="bottom-card-sub">{topEmployeeYear.year}</div>
            </div>
            <div className="bottom-card">
              <div className="bottom-card-title">Total Employee</div>
              <FaUsers className="bottom-card-icon" />
              <div className="bottom-card-number">{totalEmployees}</div>
              <div className="bottom-card-sub">Employees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
