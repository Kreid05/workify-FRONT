import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaFilter } from "react-icons/fa";
import AddTaskModal from "./AddTaskModal";
import "./Task.css";

function Task() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hardcoded task data
  const [tasks, setTasks] = useState([
    {
      id: "1",
      taskName: "Website Redesign",
      description: "Complete redesign of company website with modern UI/UX",
      assignedTo: "John Doe",
      department: "IT",
      dueDate: "2024-12-15",
      status: "Completed"
    },
    {
      id: "2",
      taskName: "Database Migration",
      description: "Migrate user data from old database to new system",
      assignedTo: "Jane Smith",
      department: "IT",
      dueDate: "2024-12-10",
      status: "Completed"
    },
    {
      id: "3",
      taskName: "Mobile App Testing",
      description: "Perform comprehensive testing on iOS and Android apps",
      assignedTo: "Mike Johnson",
      department: "IT",
      dueDate: "2024-12-20",
      status: "Pending"
    },
    {
      id: "4",
      taskName: "Security Audit",
      description: "Conduct security vulnerability assessment for all systems",
      assignedTo: "Sarah Wilson",
      department: "IT",
      dueDate: "2024-12-08",
      status: "Completed"
    },
    {
      id: "5",
      taskName: "API Documentation",
      description: "Create comprehensive API documentation for developers",
      assignedTo: "David Brown",
      department: "IT",
      dueDate: "2024-12-18",
      status: "Pending"
    },
    {
      id: "6",
      taskName: "User Training",
      description: "Conduct training sessions for new software features",
      assignedTo: "Emily Davis",
      department: "IT",
      dueDate: "2024-12-25",
      status: "Pending"
    }
  ]);

  const uniqueStatuses = [...new Set(tasks.map(task => task.status))].sort();

  const filteredTasks = tasks.filter(task => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      task.taskName.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower) ||
      task.assignedTo.toLowerCase().includes(searchLower);
    const matchesStatus = selectedStatus === "" || task.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setIsFilterOpen(false);
  };

  const clearFilter = () => {
    setSelectedStatus("");
    setIsFilterOpen(false);
  };

  const handleAddTask = (newTask) => {
    // Create a new task object with a unique ID
    const taskWithId = {
      ...newTask,
      id: String(tasks.length + 1),
      status: "Pending" // Default status for new tasks
    };
    
    // Add the new task to the existing tasks
    setTasks(prevTasks => [taskWithId, ...prevTasks]);
  };

  const columns = [
    {
      name: "Task Name",
      selector: row => row.taskName,
      sortable: true,
      width: "15%",
    },
    {
      name: "Description",
      selector: row => row.description,
      sortable: true,
      width: "30%",
    },
    {
      name: "Assigned To",
      selector: row => row.assignedTo,
      sortable: true,
      width: "14%",
    },
    {
      name: "Department",
      selector: row => row.department,
      sortable: true,
      center: true,
      width: "15%",
    },
    {
      name: "Due Date",
      selector: row => row.dueDate,
      sortable: true,
      width: "12%",
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
      center: true,
      width: "14%",
      cell: row => (
        <span className={`task-status-badge status-${row.status.toLowerCase().replace(' ', '-')}`}>
          {row.status}
        </span>
      ),
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
    <div className="task-container">
      <div className="task-table-container">
        <div className="task-controls-container">
          <div className="task-search-container">
            <input
              type="text"
              placeholder="Search by task name, description, or assigned to..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="task-search-input"
            />
          </div>
          <button className="add-task-button" onClick={() => setIsModalOpen(true)}>
            Add Task
          </button>
          <div className="task-filter-container">
            <button 
              className={`task-filter-button ${selectedStatus ? 'active' : ''}`}
              onClick={toggleFilter}
            >
              <FaFilter />
            </button>
            {isFilterOpen && (
              <div className="task-filter-dropdown">
                <div className="task-filter-dropdown-header">
                  <span>Filter by Status</span>
                  <button 
                    className="task-clear-filter-btn"
                    onClick={clearFilter}
                  >
                    Clear
                  </button>
                </div>
                <div className="task-filter-options">
                  <div 
                    className={`task-filter-option ${selectedStatus === "" ? 'active' : ''}`}
                    onClick={() => handleStatusSelect("")}
                  >
                    All Statuses
                  </div>
                  {uniqueStatuses.map(status => (
                    <div 
                      key={status}
                      className={`task-filter-option ${selectedStatus === status ? 'active' : ''}`}
                      onClick={() => handleStatusSelect(status)}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredTasks}
          pagination
          highlightOnHover
          responsive
          customStyles={customStyles}
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 12, 18, 24]}
          pointerOnHover
        />
      </div>
      
      <AddTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

export default Task;
