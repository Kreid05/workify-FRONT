import React, { useState , useEffect} from "react";
import DataTable from "react-data-table-component";
import { FaFilter } from "react-icons/fa";
import "./DepartmentList.css";
import api from "../../../api/api";

function DepartmentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  // fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await api.get("/department");

        // ensure consistent formatting 
        const formatted = data.map((dept) => ({
          _id: dept._id || "",
          departmentName: dept.departmentName || "",
          jobTitle: dept.jobTitle || "",
        }));

        setDepartments(formatted);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);
  
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