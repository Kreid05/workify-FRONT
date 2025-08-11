import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  FaChartLine,
  FaClipboard,
  FaEnvelope,
  FaHome,
  FaListAlt,
  FaMoneyBill,
  FaUser,
  FaUserAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogout } = useAuth();
  // All navigation items are now hardcoded - no backend connection needed

  const handleLogout = () => {
    userLogout();
  };

  return (
    <div className="sidebar-container">
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hamburger-button"
      >
        {isOpen ? (
          <XMarkIcon className="hamburger-icon" />
        ) : (
          <Bars3Icon className="hamburger-icon" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div className="logo-container">
          <img 
            src="/src/assets/logo-noback.png" 
            alt="Workify Logo" 
            className="logo"
          />
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-content">
            <ul>
              <li>
                <NavLink 
                  to="/dashboard" 
                  end
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                  <RxDashboard className="nav-icon" />
                  <span>Overview</span>
                </NavLink>
              </li>
              {/* Hardcoded navigation items - all visible without role checks */}
              <li>
                <NavLink 
                  to="/dashboard/work-sheet" 
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                  <FaClipboard className="nav-icon" /> <span>Work Sheet</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/payment-history" 
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                  <FaMoneyBill className="nav-icon" /> <span>Payment History</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/employee-list" 
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                  <FaUserAlt className="nav-icon" /> <span>Employee List</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/progress" 
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                  <FaChartLine className="nav-icon" /> <span>Progress</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/all-employee-list" 
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                  <FaListAlt className="nav-icon" /> <span>Verified Employee</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/payroll" 
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                  <FaMoneyBill className="nav-icon" /> <span>Payroll</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/contactUs-message" 
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                  <FaEnvelope className="nav-icon" /> <span>Message</span>
                </NavLink>
              </li>
              <hr className="sidebar-divider" />
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                  <FaHome className="nav-icon" /> <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/profile" 
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                >
                  <FaUser className="nav-icon" /> <span>Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="sidebar-footer">
            <button onClick={handleLogout} className="nav-item logout-button">
              <FaSignOutAlt className="nav-icon" />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
