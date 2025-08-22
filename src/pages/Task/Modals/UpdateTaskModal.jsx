import React, { useState, useEffect } from "react";
import "./UpdateTaskModal.css";

// Hardcoded user data for testing
const HARDCODED_USERS = [
  { _id: "1", username: "john.doe", email: "john.doe@company.com" },
  { _id: "2", username: "jane.smith", email: "jane.smith@company.com" },
  { _id: "3", username: "mike.johnson", email: "mike.johnson@company.com" },
  { _id: "4", username: "sarah.wilson", email: "sarah.wilson@company.com" },
  { _id: "5", username: "david.brown", email: "david.brown@company.com" }
];

const UpdateTaskModal = ({ isOpen, onClose, task, onUpdateTask }) => {
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    assignedTo: "", // user ID
    assignedToDisplay: "", // display name
    dueDate: ""
  });
  const [users] = useState(HARDCODED_USERS);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      // For hardcoded mode, we'll use the assignedTo string directly
      const assignedToValue = task.assignedTo || "";
      const assignedToDisplay = task.assignedTo || "Unknown";

      setFormData({
        taskName: task.taskName || "",
        description: task.description || "",
        assignedTo: assignedToValue,
        assignedToDisplay: assignedToDisplay,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ""
      });
    }
  }, [task]);

  // select user from dropdown
  const handleUserSelect = (user) => {
    const displayName = user.username || user.email || "Unknown";

    setFormData(prev => ({
      ...prev,
      assignedTo: user._id,
      assignedToDisplay: displayName
    }));
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "assignedToDisplay") {
      if (value) {
        const filtered = users.filter(user => {
          const username = user.username?.toLowerCase() || "";
          const email = user.email?.toLowerCase() || "";
          return (
            username.includes(value.toLowerCase()) ||
            email.includes(value.toLowerCase())
          );
        });
        setFilteredUsers(filtered);
        setShowDropdown(filtered.length > 0);
      } else {
        setFilteredUsers([]);
        setShowDropdown(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const updatedTask = {
        taskName: formData.taskName,
        description: formData.description,
        assignedTo: formData.assignedToDisplay, // Use display name for hardcoded mode
        dueDate: formData.dueDate,
        status: task.status // Keep the existing status
      };

      // Call the update function with hardcoded data
      onUpdateTask(task.id, updatedTask);
      onClose();
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="update-task-modal-overlay">
      <div className="update-task-modal">
        <div className="update-task-modal-header">
          <h2>Update Task</h2>
          <button className="update-task-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="update-task-form">
          {error && (
            <div className="update-task-error">
              {error}
            </div>
          )}

          <div className="update-task-form-group">
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={formData.taskName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="update-task-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              required
            />
          </div>

          <div className="update-task-form-group">
            <label htmlFor="assignedToDisplay">Assigned To</label>
            <div className="update-task-dropdown-container">
              <input
                type="text"
                id="assignedToDisplay"
                name="assignedToDisplay"
                value={formData.assignedToDisplay}
                onChange={handleInputChange}
                required
                placeholder="Type to search employee"
                autoComplete="off"
              />
              {showDropdown && filteredUsers.length > 0 && (
                <div className="update-task-dropdown-menu">
                  {filteredUsers.map((user) => {
                    const displayName = user.username || user.email || "Unknown";
                    return (
                      <div
                        key={user._id}
                        className="update-task-dropdown-item"
                        onClick={() => handleUserSelect(user)}
                      >
                        {displayName}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="update-task-form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
          </div>


          <div className="update-task-modal-actions">
            <button
              type="button"
              className="update-task-cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="update-task-submit-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
