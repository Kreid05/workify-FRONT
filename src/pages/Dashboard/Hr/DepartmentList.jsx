import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaFilter } from "react-icons/fa";
import "./DepartmentList.css";

function DepartmentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Hardcoded department data with useState to allow updates
  const [departments, setDepartments] = useState([
    {
      _id: "1",
      departmentName: "Sales",
      jobTitle: "Sales Manager",
    },
    {
      _id: "2",
      departmentName: "Sales",
      jobTitle: "Sales Representative",
    },
    {
      _id: "3",
      departmentName: "Sales",
      jobTitle: "Account Executive",
    },
    {
      _id: "4",
      departmentName: "Marketing",
      jobTitle: "Marketing Manager",
    },
    {
      _id: "5",
      departmentName: "Marketing",
      jobTitle: "Digital Marketing Specialist",
    },
    {
      _id: "6",
      departmentName: "Marketing",
      jobTitle: "Content Creator",
    },
    {
      _id: "7",
      departmentName: "Compliance",
      jobTitle: "Compliance Officer",
    },
    {
      _id: "8",
      departmentName: "Compliance",
      jobTitle: "Risk Analyst",
    },
    {
      _id: "9",
      departmentName: "Human Resources",
      jobTitle: "HR Manager",
    },
    {
      _id: "10",
      departmentName: "Human Resources",
      jobTitle: "Recruiter",
    },
    {
      _id: "11",
      departmentName: "Human Resources",
      jobTitle: "HR Generalist",
    },
    {
      _id: "12",
      departmentName: "Finance",
      jobTitle: "Financial Analyst",
    },
    {
      _id: "13",
      departmentName: "Finance",
      jobTitle: "Accountant",
    },
    {
      _id: "14",
      departmentName: "Finance",
      jobTitle: "Budget Manager",
    },
    {
      _id: "15",
      departmentName: "IT",
      jobTitle: "Frontend Developer",
    },
    {
      _id: "16",
      departmentName: "IT",
      jobTitle: "Backend Developer",
    },
    {
      _id: "17",
      departmentName: "IT",
      jobTitle: "System Administrator",
    },
    {
      _id: "18",
      departmentName: "Operations",
      jobTitle: "Operations Manager",
    },
    {
      _id: "19",
      departmentName: "Operations",
      jobTitle: "Process Coordinator",
    },
    {
      _id: "20",
      departmentName: "Operations",
      jobTitle: "Quality Assurance",
    },
  ]);

  
  const uniqueDepartments = [...new Set(departments.map(dept => dept.departmentName))].sort();


  const filteredDepartments = departments.filter(dept => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      dept.departmentName.toLowerCase().includes(searchLower) ||
      dept.jobTitle.toLowerCase().includes(searchLower);
    const matchesDepartment = selectedDepartment === "" || dept.departmentName === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setIsFilterOpen(false);
  };

  
  const clearFilter = () => {
    setSelectedDepartment("");
    setIsFilterOpen(false);
  };

  
  const columns = [
    {
      name: "Department Name",
      selector: row => row.departmentName,
      sortable: true,
      width: "50%",
      sortFunction: (rowA, rowB) => {
        return rowA.departmentName.localeCompare(rowB.departmentName);
      },
    },
    {
      name: "Job Title",
      selector: row => row.jobTitle,
      sortable: true,
      width: "50%",
      sortFunction: (rowA, rowB) => {
        return rowA.jobTitle.localeCompare(rowB.jobTitle);
      },
    },
  ];

  
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

  return (
    <div className="department-container">
      <div className="department-table-container">
        <div className="department-controls-container">
          <div className="department-search-container">
            <input
              type="text"
              placeholder="Search by Department or Job Title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="department-search-input"
            />
          </div>
          <div className="department-filter-container">
            <button 
              className={`department-filter-button ${selectedDepartment ? 'active' : ''}`}
              onClick={toggleFilter}
            >
              <FaFilter />
            </button>
            {isFilterOpen && (
              <div className="department-filter-dropdown">
                <div className="department-filter-dropdown-header">
                  <span>Filter by Department</span>
                  <button 
                    className="department-clear-filter-btn"
                    onClick={clearFilter}
                  >
                    Clear
                  </button>
                </div>
                {uniqueDepartments.map((department) => (
                  <div
                    key={department}
                    className={`department-filter-option ${selectedDepartment === department ? 'selected' : ''}`}
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
          data={filteredDepartments}
          pagination
          highlightOnHover
          responsive
          customStyles={customStyles}
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 12, 18, 24]}
          pointerOnHover
        />
      </div>
    </div>
  );
}

export default DepartmentList;
