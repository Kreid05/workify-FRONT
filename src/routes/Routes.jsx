import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ContactUs from "../pages/ContactUs/ContactUs";
import Inquiries from "../pages/Dashboard/Admin/Inquiries";
import Users from "../pages/Dashboard/Admin/Users";
import AdminAttendanceLogs from "../pages/Dashboard/Admin/AdminAttendanceLogs";
import AdminAttendanceReport from "../pages/Dashboard/Admin/AdminAttendanceReport";
import SchedulingPage from "../pages/Dashboard/Admin/SchedulingPage";
import DashboardOverview from "../pages/Dashboard/DashboardOverview/DashboardOverview";
import EmployeeDashboard from "../pages/Dashboard/DashboardOverview/EmployeeDashboard"; 
import Task from "../pages/Dashboard/Employee/Task";
import EmployeeAttendanceLogs from "../pages/Dashboard/Employee/EmployeeAttendanceLogs";
import EmployeeAttendanceReport from "../pages/Dashboard/Employee/EmployeeAttendanceReport";
import EmployeeDetails from "../pages/Dashboard/Hr/EmployeeDetails";
import EmployeeList from "../pages/Dashboard/Hr/EmployeeList";
import Progress from "../pages/Dashboard/Hr/Progress";
import DepartmentList from "../pages/Dashboard/Hr/DepartmentList";
import Profile from "../pages/Dashboard/Profile/Profile";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import RegistrationPage from "../pages/SignUp/Register";
import DashboardLayout from "./../layouts/DashboardLayout";
import Login from "./../pages/Login/Login";
import RoleRoute from "./RoleRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <RegistrationPage /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <RoleRoute allowed={["admin", "hr", "employee"]}>
        <DashboardLayout />
      </RoleRoute>
    ),
    children: [
      // admin/hr landing
      {
        index: true,
        element: (
          <RoleRoute allowed={["admin", "hr"]}>
            <DashboardOverview />
          </RoleRoute>
        ),
      },

      // employee landing
      {
        path: "employee-dashboard",
        element: (
          <RoleRoute allowed={["employee"]}>
            <EmployeeDashboard />
          </RoleRoute>
        ),
      },

      { path: "profile", element: <Profile /> },

      // shared
      {
        path: "task",
        element: (
          <RoleRoute allowed={["employee", "hr", "admin"]}>
            <Task />
          </RoleRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <RoleRoute allowed={["employee", "hr", "admin"]}>
            <Progress />
          </RoleRoute>
        ),
      },

      // admin/hr only
      {
        path: "inquiries",
        element: (
          <RoleRoute allowed={["admin", "hr"]}>
            <Inquiries />
          </RoleRoute>
        ),
      },
      {
        path: "users",
        element: (
          <RoleRoute allowed={["admin"]}>
            <Users />
          </RoleRoute>
        ),
      },
      {
        path: "employee-list",
        element: (
          <RoleRoute allowed={["admin", "hr"]}>
            <EmployeeList />
          </RoleRoute>
        ),
      },
      {
        path: "department",
        element: (
          <RoleRoute allowed={["admin", "hr"]}>
            <DepartmentList />
          </RoleRoute>
        ),
      },
      {
        path: "schedule",
        element: (
          <RoleRoute allowed={["admin", "hr"]}>
            <SchedulingPage />
          </RoleRoute>
        ),
      },
      {
        path: "details/:email",
        element: (
          <RoleRoute allowed={["admin", "hr"]}>
            <EmployeeDetails />
          </RoleRoute>
        ),
      },
      {
        path: "admin-attendance-logs",
        element: (
          <RoleRoute allowed={["admin", "hr"]}>
            <AdminAttendanceLogs />
          </RoleRoute>
        ),
      },
      {
        path: "admin-attendance-report",
        element: (
          <RoleRoute allowed={["admin", "hr"]}>
            <AdminAttendanceReport />
          </RoleRoute>
        ),
      },

      // employee only
      {
        path: "employee-attendance-logs",
        element: (  
          <RoleRoute allowed={["employee"]}>
            <EmployeeAttendanceLogs />
          </RoleRoute>
        ),
      },
      {
        path: "employee-attendance-report",
        element: (
          <RoleRoute allowed={["employee"]}>
            <EmployeeAttendanceReport />
          </RoleRoute>
        ),
      },
    ],
  },

  {
    path: "/unauthorized",
    element: <h1>Unauthorized Access</h1>,
  },
]);

export default router;