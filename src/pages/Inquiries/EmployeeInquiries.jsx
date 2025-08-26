import React, { useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import SubmitInquiryModal from "./Modals/SubmitInquiryModal";
import "./EmployeeInquiries.css";
import api from '../../api/api';

const EmployeeInquiries = () => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [employeeInquiries, setEmployeeInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch emp inquiries
  useEffect(() => {
    const fetchEmployeeInquiries = async () => {
      setLoading(true);
      try {
        const res = await api.get("/inquiries"); 
        setEmployeeInquiries(res.data);
      } catch (err) {
        alert("Error fetching your inquiries: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeInquiries();
  }, []);

  const columns = [
    {
      name: "Request Name",
      selector: row => row.requestName,
      sortable: true,
      width: "25%",
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true,
      width: "20%",
    },
    {
      name: "Description",
      selector: row => row.description,
      sortable: true,
      width: "35%",
      wrap: true,
    },
    {
      name: "Status",
      selector: row => row.status,
      center: true,
      width: "15%",
      cell: (row) => (
        <span className={`employee-status-badge ${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      ),
    },
  ];

  if (loading) return <div>Loading your inquiries...</div>;

  const handleSubmitInquiry = (inquiryData) => {
    const newInquiry = {
      id: employeeInquiries.length + 1,
      requestName: inquiryData.requestName,
      type: inquiryData.type,
      description: inquiryData.description,
      status: "Pending"
    };
    setEmployeeInquiries(prev => [...prev, newInquiry]);
  };

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
    <div className="employee-inquiries-container">
      <div className="employee-inquiries-table-container">
        <div className="table-header-with-button">
          <button 
            className="submit-inquiry-button"
            onClick={() => setIsSubmitModalOpen(true)}
          > Submit Inquiry
          </button>
        </div>

        <DataTable
          columns={columns}
          data={employeeInquiries}
          pagination
          highlightOnHover
          responsive
          customStyles={customStyles}
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 12, 18, 24]}
          pointerOnHover
        />
      </div>

      <SubmitInquiryModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleSubmitInquiry}
      />
    </div>
  );
};

export default EmployeeInquiries;