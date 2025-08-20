import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  FaChartLine,
  FaClipboard,
  FaEnvelope,
  FaUserAlt,
  FaUsers,
  FaSignOutAlt,
  FaBuilding,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserRole } from "../../../utils/auth"; 
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const role = getUserRole(); 

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
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
        <div
          className="logo-container"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/src/assets/logo-noback.png"
            alt="Workify Logo"
            className="logo"
          />
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-content">
            <ul>
              {/* admin and HR */}
              {(role === "admin" || role === "hr") && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      end
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      <RxDashboard className="nav-icon" />
                      <span>Dashboard</span>
                    </NavLink>
                  </li>

                  {/* Users - Admin only */}
                  {role === "admin" && (
                    <li>
                      <NavLink
                        to="/dashboard/users"
                        className={({ isActive }) =>
                          isActive ? "nav-item active" : "nav-item"
                        }
                      >
                        <FaUsers className="nav-icon" />{" "}
                        <span>Users</span>
                      </NavLink>
                    </li>
                  )}

                  <li>
                    <NavLink
                      to="/dashboard/employee-list"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      <FaUserAlt className="nav-icon" />{" "}
                      <span>Employee List</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/department"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      <FaBuilding className="nav-icon" />{" "}
                      <span>Departments</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/task"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      <FaClipboard className="nav-icon" /> <span>Task</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/progress"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      <FaChartLine className="nav-icon" /> <span>Progress</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/inquiries"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      <FaEnvelope className="nav-icon" /> <span>Inquiries</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* employee */}
              {role === "employee" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/employee-dashboard"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      <RxDashboard className="nav-icon" />
                      <span>Employee Dashboard</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/progress"
                      className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                      }
                    >
                      <FaChartLine className="nav-icon" /> <span>Progress</span>
                    </NavLink>
                  </li>
                </>
              )}
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