import React, { useState , useEffect} from "react";
import DataTable from "react-data-table-component";
import { FaFilter, FaCheck } from "react-icons/fa";
import "./Progress.css";
import api from "../../../api/api";

function ProgressList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [Progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// fetch progress logs
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get("/progress");
        // format data to ensure consistent structure
        const mappedData = res.data.map(item => ({
          _id: item._id,
          name: item.userID?.username || "",
          taskName: item.taskID?.taskName || "",
          department: item.userID?.department?.departmentName || "",
          status: item.progressStatus || "",
          hoursWorked: item.hoursWorked || 0,
          completionDate: item.completionDate
            ? new Date(item.completionDate).toLocaleDateString("en-US")
            : "00-00-0000",
        }));
        setProgress(mappedData);
      } catch (err) {
        console.error("Error fetching progress:", err);
        setError("Failed to load progress data");
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const departments = [...new Set(Progress.map(emp => emp.department))].sort();

  
  const filteredProgress = Progress.filter(progress => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = progress.name.toLowerCase().includes(searchLower);
    const matchesDepartment = selectedDepartment === "" || progress.department === selectedDepartment;
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

  
  const handleMarkAsDone = (taskId) => {
    setProgress(prevProgress => 
      prevProgress.map(task => 
        task._id === taskId 
          ? { ...task, status: "Completed" }
          : task
      )
    );
  };

  
  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

 
  const columns = [
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
      name: "Task Name",
      selector: row => row.taskName,
      sortable: true,
      width: "18%",
      sortFunction: (rowA, rowB) => {
        return rowA.taskName.localeCompare(rowB.taskName);
      },
    },
    {
      name: "Department",
      selector: row => row.department,
      sortable: true,
      width: "12%",
      sortFunction: (rowA, rowB) => {
        return rowA.department.localeCompare(rowB.department);
      },
    },
    {
      name: "Hrs Worked",
      selector: row => `${row.hoursWorked} hrs`,
      sortable: true,
      center: true,
      width: "12%",
      sortFunction: (rowA, rowB) => {
        return rowA.hoursWorked - rowB.hoursWorked;
      },
    },
    {
      name: "Date",
      selector: row => row.completionDate,
      sortable: true,
      width: "12%",
      center: true,
      sortFunction: (rowA, rowB) => {
        const dateA = parseDate(rowA.completionDate);
        const dateB = parseDate(rowB.completionDate);
        return dateB - dateA; 
      },
    },
    {
      name: "Status",
      selector: row => row.status,
      width: "15%",
      center: true,
      cell: (row) => {
        const status = row.status?.toLowerCase();
        let statusClass = "";
        
        if (status === "completed") {
          statusClass = "status-completed";
        } else if (status === "on progress" || status === "in progress") {
          statusClass = "status-on-progress";
        } else if (status === "pending") {
          statusClass = "status-pending";
        }
        
        return (
          <span className={statusClass}>
            {row.status?.toUpperCase()}
          </span>
        );
      }
    },
    {
      name: "Action",
      width: "13%",
      center: true,
      cell: (row) => {
        const isCompleted = row.status?.toLowerCase() === "completed";
        
        return (
          <button
            style={{
              backgroundColor: isCompleted ? '#6c757d' : '#028a0f',
              color: 'white',
              border: 'none',
              padding: '0.5rem 0.75rem',
              borderRadius: '20px',
              cursor: isCompleted ? 'default' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: '600',
              width: '100px', 
              height: '32px', 
              textAlign: 'center',
              opacity: isCompleted ? 0.7 : 1,
              transition: 'all 0.2s ease',
            }}
            onClick={() => !isCompleted && handleMarkAsDone(row._id)}
            disabled={isCompleted}
          >
            <FaCheck size={12} />
            {isCompleted ? "Done" : "Mark as Done"}
          </button>
        );
      },
    },
  ];

  if (loading) return <p>Loading progress...</p>;
  if (error) return <p>{error}</p>;

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