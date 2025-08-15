import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ContactUs from "../pages/ContactUs/ContactUs";
import Feedback from "../pages/Dashboard/Admin/Feedback";
import Payroll from "../pages/Dashboard/Admin/Payroll";
import VerifiedEmployees from "../pages/Dashboard/Admin/VerifiedEmployees";
import DashboardOverview from "../pages/Dashboard/DashboardOverview/DashboardOverview";
import EmployeeDashboard from "../pages/Dashboard/DashboardOverview/EmployeeDashboard"; 
import PaymentHistory from "../pages/Dashboard/Employee/PaymentHistory";
import Task from "../pages/Dashboard/Employee/Task";
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
import Payment from "./../pages/Payment/Payment";
import AdminRoute from "./AdminRoute";
import EmployeeRoute from "./EmployeeRoute";
import HrRoute from "./HrRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      
      {
        path: "employee-dashboard",
        element: (
          <EmployeeRoute>
            <EmployeeDashboard />
          </EmployeeRoute>
        ),
      },
      // admin routes
      {
        path: "feedback",
        element: (
          <AdminRoute>
            <Feedback />
          </AdminRoute>
        ),
      },
      {
        path: "all-employee-list",
        element: (
          <AdminRoute>
            <VerifiedEmployees />
          </AdminRoute>
        ),
      },
      {
        path: "payroll",
        element: (
          <AdminRoute>
            <Payroll />
          </AdminRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <AdminRoute>
            <Payment />
          </AdminRoute>
        ),
      },
      //  HR routes
      {
        path: "employee-list",
        element: (
          <HrRoute>
            <EmployeeList />
          </HrRoute>
        ),
      },
      {
        path: "department",
        element: (
          <HrRoute>
            <DepartmentList />
          </HrRoute>
        ),
      },
      {
        path: "details/:email",
        element: (
          <HrRoute>
            <EmployeeDetails />
          </HrRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <HrRoute>
            <Progress />
          </HrRoute>
        ),
      },
      //employee
      {
        path: "task",
        element: (
          <EmployeeRoute>
            <Task />
          </EmployeeRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <EmployeeRoute>
            <PaymentHistory />
          </EmployeeRoute>
        ),
      },  
    ],
  },
]);

export default router;