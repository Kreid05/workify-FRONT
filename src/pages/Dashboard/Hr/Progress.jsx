import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaFilter } from "react-icons/fa";
import "./Progress.css";

function ProgressList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Hardcoded progrees data
  const Progress = [
    {
      _id: "1",
      name: "Lim Alcovendas",
      department: "Sales",
      worksheet: "On Progress",
      hoursWorked: "48",
      completionDate: "00-00-0000",
    },
    {
      _id: "2",
      name: "Mark Regie Magtangob",
      department: "Sales",
      worksheet: "Completed",
      hoursWorked: "24",
      completionDate: "08-12-2025",
    },
    {
      _id: "3",
      name: "Ezekiel Olasiman",
      department: "Marketing",
      worksheet: "Completed",
      hoursWorked: "24",
      completionDate: "08-12-2025",
    },
  ];

  // Get unique departments for filter dropdown
  const departments = [...new Set(Progress.map(emp => emp.department))].sort();

  // Filter progress based on search term and selected department
  const filteredProgress = Progress.filter(progress => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = progress.name.toLowerCase().includes(searchLower);
    const matchesDepartment = selectedDepartment === "" || progress.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

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

  // Define columns for react-data-table-component with custom sorting
  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
      width: "30%",
      sortFunction: (rowA, rowB) => {
        return rowA.name.localeCompare(rowB.name);
      },
    },
    {
      name: "Department",
      selector: row => row.department,
      sortable: true,
      width: "15%",
      sortFunction: (rowA, rowB) => {
        return rowA.department.localeCompare(rowB.department);
      },
    },
    {
      name: "Worksheet",
      selector: row => row.worksheet,
      width: "20%",
      center: true,
      cell: (row) => {
        const status = row.worksheet?.toLowerCase();
        let statusClass = "";
        
        if (status === "completed") {
          statusClass = "worksheet-completed";
        } else if (status === "on progress" || status === "in progress") {
          statusClass = "worksheet-on-progress";
        }
        
        return (
          <span className={statusClass}>
            {row.worksheet}
          </span>
        );
      }
    },
    {
      name: "Hours Worked",
      selector: row => `${row.hoursWorked} hrs`,
      sortable: true,
      center: true,
      width: "20%",
      sortFunction: (rowA, rowB) => {
        return rowA.hoursWorked - rowB.hoursWorked;
      },
    },
    {
      name: "Completion Date",
      selector: row => row.completionDate,
      sortable: true,
      width: "15%",
      center: true,
      sortFunction: (rowA, rowB) => {
        const dateA = parseDate(rowA.completionDate);
        const dateB = parseDate(rowB.completionDate);
        return dateB - dateA; // Sort by recent date (newest first)
      },
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

  return (
    <div className="progress-container">
      <div className="progress-table-container">
        <div className="progress-controls-container">
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
          data={filteredProgress}
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

export default ProgressList;
