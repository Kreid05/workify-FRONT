import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ApproveModal from "./Modals/ApproveModal";
import DeclineModal from "./Modals/DeclineModal";
import "./Inquiries.css";

const Inquiries = () => {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Hardcoded sample data for demonstration
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: "John Doe",
      requestName: "Leave Request",
      type: "Time Off",
      description: "Requesting 3 days of personal leave",
      status: "Pending"
    },
    {
      id: 2,
      name: "Jane Smith",
      requestName: "Equipment Request",
      type: "Resources",
      description: "Need a new laptop for remote work",
      status: "Pending"
    },
    {
      id: 3,
      name: "Mike Johnson",
      requestName: "Training Request",
      type: "Development",
      description: "Request to attend React conference",
      status: "Pending"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      requestName: "Expense Reimbursement",
      type: "Finance",
      description: "Travel expenses for client meeting",
      status: "Pending"
    },
    {
      id: 5,
      name: "David Brown",
      requestName: "Access Request",
      type: "IT",
      description: "Need access to project management tool",
      status: "Pending"
    }
  ]);

  const handleApprove = (inquiry) => {
    setInquiries(prev => 
      prev.map(item => 
        item.id === inquiry.id 
          ? { ...item, status: "Approved" }
          : item
      )
    );
  };

  const handleDecline = (inquiry, notes) => {
    setInquiries(prev => 
      prev.map(item => 
        item.id === inquiry.id 
          ? { ...item, status: "Declined", declineNotes: notes }
          : item
      )
    );
  };

  const openApproveModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsApproveModalOpen(true);
  };

  const openDeclineModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDeclineModalOpen(true);
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
      width: "15%",
    },
    {
      name: "Request Name",
      selector: row => row.requestName,
      sortable: true,
      width: "15%",
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true,
      width: "12%",
    },
    {
      name: "Description",
      selector: row => row.description,
      sortable: true,
      width: "28%",
      wrap: true,
    },
    {
      name: "Status",
      selector: row => row.status,
      center: true,
      width: "15%",
      cell: (row) => (
        <span className={`status-badge ${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: "Action",
      center: true,
      width: "15%",
      cell: (row) => (
        <div className="flex gap-2 justify-center">
          {row.status === "Pending" && (
            <>
              <button
                className="approve-button"
                onClick={(e) => {
                  e.stopPropagation();
                  openApproveModal(row);
                }}
                title="Approve"
              >
                <FaCheckCircle size={16} />
              </button>
              <button
                className="decline-button"
                onClick={(e) => {
                  e.stopPropagation();
                  openDeclineModal(row);
                }}
                title="Decline"
              >
                <FaTimesCircle size={16} />
              </button>
            </>
          )}
          {row.status !== "Pending" && (
            <span className="completed">Completed</span>
          )}
        </div>
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
    <div className="inquiries-container">
      <div className="inquiries-table-container">

        <DataTable
          columns={columns}
          data={inquiries}
          pagination
          highlightOnHover
          responsive
          customStyles={customStyles}
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 12, 18, 24]}
          pointerOnHover
        />
      </div>

      <ApproveModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        inquiry={selectedInquiry}
        onApprove={handleApprove}
      />

      <DeclineModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        inquiry={selectedInquiry}
        onDecline={handleDecline}
      />
    </div>
  );
};

export default Inquiries;
