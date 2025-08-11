import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaFilter } from "react-icons/fa";
import EmployeeDetails from "./EmployeeDetails";
import "./EmployeeList.css";

function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hardcoded employee data
  const employees = [
    {
      _id: "1",
      name: "Lim Alcovendas",
      email: "limalcovendas@company.com",
      department: "Sales",
      bankAccountNo: "1234567890",
      salary: 75000,
      hiredDate: "01-28-2023",
      firstName: "Lim",
      middleName: "",
      lastName: "Alcovendas",
      jobTitle: "Sales Manager",
      phoneNumber: "+63 963-633-4053",
      gender: "Male",
      age: 23,
      birthDate: "April 5, 2003",
      birthPlace: "Nodado Hospital, Caloocan City",
      civilStatus: "Single",
      nationality: "Filipino",
      fullAddress: "Blk 16, Lot 1, Pkg 3, Phase 12 Brgy. 188, Tala Caloocan City, 1427",
      sss: "2331-2343-1132",
      tin: "12312-31546-422",
      philhealth: "139924756-1323FA",
      gsis: "3424636-1232-5",
      motherMaidenName: "Evelyn Alcovendas",
      motherPhoneNumber: "09123456789",
      motherOccupation: "Home Maker",
      motherStatus: "Alive",
      motherAddress: "Blk 16, Lot 1, Pkg 3, Phase 12 Brgy. 188, Tala Caloocan City, 1427",
      fatherMaidenName: "Rommel San-Jose",
      fatherPhoneNumber: "09987654321",
      fatherOccupation: "AV Works",
      fatherStatus: "Alive",
      fatherAddress: "Blk 16, Lot 1, Pkg 3, Phase 12 Brgy. 188, Tala Caloocan City, 1427",
      contactName: "Rommel San-Jose",
      contactPhoneNumber: "09987654321",
      contactRelationship: "Father",
      employeeNumber: "0023-232348-2324",
    },
    {
      _id: "2",
      name: "Ezekiel Olasiman",
      email: "zekeolasiman@company.com",
      department: "Marketing",
      bankAccountNo: "0987654321",
      salary: 65000,
      hiredDate: "04-07-2023",
    },
    {
      _id: "3",
      name: "Klei Ishia Pagatpatan",
      email: "kleipagatpatan@company.com",
      department: "Marketing",
      bankAccountNo: "1122334455",
      salary: 65000,
      hiredDate: "06-11-2021",
    },
    {
      _id: "4",
      name: "Regine Mae Hambiol",
      email: "reginehambiol@company.com",
      department: "Compliance",
      bankAccountNo: "5566778899",
      salary: 60000,
      hiredDate: "11-19-2023",
    },
    {
      _id: "5",
      name: "Mark Regie Magtangob",
      email: "regiemagtangob@company.com",
      department: "Sales",
      bankAccountNo: "9988776655",
      salary: 75000,
      hiredDate: "07-10-2024",
    },
    {
      _id: "6",
      name: "Jesalle Villegas",
      email: "jesallevillegas@company.com",
      department: "Compliance",
      bankAccountNo: "4433221100",
      salary: 60000,
      hiredDate: "08-08-2022",
    }
  ];

  // Helper function to format salary as money with commas
  const formatSalary = (salary) => {
    if (salary === null || salary === undefined || salary === "") return "₱0";
    const numSalary = Number(salary);
    if (isNaN(numSalary)) return "₱0";
    return "₱" + numSalary.toLocaleString();
  };

  // Get unique departments for filter dropdown
  const departments = [...new Set(employees.map(emp => emp.department))].sort();

  // Filter employees based on search term and selected department
  const filteredEmployees = employees.filter(employee => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = employee.name.toLowerCase().includes(searchLower);
    const matchesDepartment = selectedDepartment === "" || employee.department === selectedDepartment;
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
      width: "20%",
      sortFunction: (rowA, rowB) => {
        return rowA.name.localeCompare(rowB.name);
      },
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true,
      width: "25%",
      sortFunction: (rowA, rowB) => {
        return rowA.email.localeCompare(rowB.email);
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
      name: "Account No.",
      selector: row => row.bankAccountNo,
      sortable: false,
      width: "15%",
    },
    {
      name: "Salary",
      selector: row => row.salary,
      sortable: true,
      width: "10%",
      cell: (row) => formatSalary(row.salary),
      sortFunction: (rowA, rowB) => {
        return rowA.salary - rowB.salary;
      },
    },
    {
      name: "Hired Date",
      selector: row => row.hiredDate,
      sortable: true,
      width: "15%",
      sortFunction: (rowA, rowB) => {
        const dateA = parseDate(rowA.hiredDate);
        const dateB = parseDate(rowB.hiredDate);
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
    </div>
  );
}

export default EmployeeList;
