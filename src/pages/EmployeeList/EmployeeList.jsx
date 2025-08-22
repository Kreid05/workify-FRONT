import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaFilter, FaEdit } from "react-icons/fa";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeUpdateModal from "./Modals/EmployeeUpdateModal";
import "./EmployeeList.css";
import api from "../../api/api";

function EmployeeList() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeForUpdate, setSelectedEmployeeForUpdate] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  // Get unique departments for filter dropdown
  const departments = [...new Set(employees.map(emp => emp.department))].sort();

  // Filter employees based on search term and selected department
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedDepartment ? emp.department === selectedDepartment : true)
  );

  // Toggle filter dropdown
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Handle department selection
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setIsFilterOpen(false);
  };

  // Clear filter
  const clearFilter = () => {
    setSelectedDepartment("");
    setIsFilterOpen(false);
  };

  // Helper function to parse date strings in MM-DD-YYYY format
  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Handle employee update
  const handleEmployeeUpdate = (employeeId, updatedData) => {
    setEmployees(prevEmployees => 
      prevEmployees.map(emp => 
        emp._id === employeeId 
          ? { ...emp, ...updatedData }
          : emp
      )
    );
    console.log(`Employee ${employeeId} updated with:`, updatedData);
  };

// fetch employees
useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const { data } = await api.get("/emp-info/all");

      const normalized = data.map((p) => {
        const u = p.userID || {};
        const dept = u.department || {};
        const parents = p.parents || {};
        const emergency = p.emergency || {};

        const fmtMDY = (d) =>
          d ? new Date(d).toLocaleDateString("en-US") : "";
        const fmtLong = (d) =>
          d
            ? new Date(d).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "";
        const title = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

        return {
          // table columns 
          employeeNumber: p.employeeNo || "",
          name: `${p.firstName || ""} ${p.middleName ? p.middleName + " " : ""}${p.lastName || ""}`.trim(),
          email: u.email || "",
          department: dept.departmentName || "",
          jobTitle: u.jobTitle || "",
          hiredDate: fmtMDY(p.hireDate),

          // ids to keep around
          _id: u._id || p._id,     // stable id for row
          userId: u._id,           
          pInfoID: p._id,

          // personal info
          firstName: p.firstName || "",
          middleName: p.middleName || "",
          lastName: p.lastName || "",
          currentRole: title(u.role || "employee"),
          phoneNumber: p.phoneNumber || "",
          gender: title(p.gender || ""),
          age: p.age ?? "",
          birthDate: fmtLong(p.birthDate),
          birthPlace: p.birthPlace || "",
          civilStatus: p.civilStatus || "",
          nationality: p.nationality || "",
          fullAddress: p.fullAddress || "",
          sss: p.sssNo || "",
          tin: p.tinNo || "",
          philhealth: p.philHealthNo || "",
          gsis: p.gsisNo || "",

          // parents info
          motherMaidenName: parents.motherName || "",
          motherPhoneNumber: parents.mPhoneNo || "",
          motherOccupation: parents.mOccupation || "",
          motherStatus: title(parents.mStatus || ""),
          motherAddress: parents.mAddress || "",
          fatherMaidenName: parents.fatherName || "",
          fatherPhoneNumber: parents.fPhoneNo || "",
          fatherOccupation: parents.fOccupation || "",
          fatherStatus: title(parents.fStatus || ""),
          fatherAddress: parents.fAddress || "",

          // emergency info
          contactName: emergency.contactName || "",
          contactPhoneNumber: emergency.contactNo || "",
          contactRelationship: emergency.relationship || "",
        };
      });

      setEmployees(normalized);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  fetchEmployees();
}, []);


  // define columns for react-data-table-component with custom sorting
  const columns = [
    {
      name: "Employee No.",
      selector: row => row.employeeNumber,
      sortable: true,
      width: "13%",
      sortFunction: (rowA, rowB) => {
        return rowA.employeeNumber.localeCompare(rowB.employeeNumber);
      },
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
      width: "18%",
      sortFunction: (rowA, rowB) => {
        return rowA.name.localeCompare(rowB.name);
      },
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true,
      width: "20%",
      sortFunction: (rowA, rowB) => {
        return rowA.email.localeCompare(rowB.email);
      },
    },
    {
      name: "Department",
      selector: row => row.department,
      sortable: true,
      width: "13%",
      sortFunction: (rowA, rowB) => {
        return rowA.department.localeCompare(rowB.department);
      },
    },
    {
      name: "Job Title",
      selector: row => row.jobTitle,
      sortable: true,
      width: "15%",
      sortFunction: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
    },
    {
      name: "Hired Date",
      selector: row => row.hiredDate,
      sortable: true,
      width: "11%",
      sortFunction: (rowA, rowB) => {
        const dateA = parseDate(rowA.hiredDate);
        const dateB = parseDate(rowB.hiredDate);
        return dateB - dateA; // Sort by recent date (newest first)
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          style={{
            backgroundColor: '#ff5003',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '12px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedEmployeeForUpdate(row);
            setIsUpdateModalOpen(true);
          }}
        >
          <FaEdit size={14} />
          Update
        </button>
      ),
      width: "10%",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Custom styles for the data table
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#003f7d',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '14px',
      },
    },
    rows: {
      style: {
        minHeight: '55px',
        fontSize: '12px',
        backgroundColor: '#ffffff',
        color: '#000000',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e0e0e0',
      },
    },
  };

  // Handle row click to open modal with employee details
  const handleRowClicked = (row) => {
    setSelectedEmployee(row);
    setIsModalOpen(true);
  };

  // Close modal handler
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="employee-list-container">
      <div className="employee-list-table-container">
        <div className="controls-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Employee Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <button 
              className={`filter-button ${selectedDepartment ? 'active' : ''}`}
              onClick={toggleFilter}
            >
              <FaFilter />
            </button>
            {isFilterOpen && (
              <div className="filter-dropdown">
                <div className="filter-dropdown-header">
                  <span>Filter by Department</span>
                  <button 
                    className="clear-filter-btn"
                    onClick={clearFilter}
                  >
                    Clear
                  </button>
                </div>
                {departments.map((department) => (
                  <div
                    key={department}
                    className={`filter-option ${selectedDepartment === department ? 'selected' : ''}`}
                    onClick={() => handleDepartmentSelect(department)}
                  >
                    {department}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          highlightOnHover
          responsive
          customStyles={customStyles}
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 12, 18, 24]}
          onRowClicked={handleRowClicked}
          pointerOnHover
        />
      </div>
      {isModalOpen && (
        <EmployeeDetails employee={selectedEmployee} onClose={closeModal} />
      )}
      <EmployeeUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        employee={selectedEmployeeForUpdate}
        onUpdateEmployee={handleEmployeeUpdate}
      />
    </div>
  );
}

export default EmployeeList;