// SubmissionsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';
import './SubmissionsPage.css';

Modal.setAppElement('#root');

function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const itemsCountPerPage = 5;

  const handlePageChange = (pageNumber) => {
    if (pageNumber === 'prev') {
      setActivePage((prevActivePage) => prevActivePage > 1 ? prevActivePage - 1 : prevActivePage);
    } else if (pageNumber === 'next') {
      setActivePage((prevActivePage) => prevActivePage < pageNumbers.length ? prevActivePage + 1 : prevActivePage);
    } else {
      setActivePage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(submissions.length / itemsCountPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);

      try {
        const response = await axios.get('https://app-backend-58w2.onrender.com/submissions');
        setSubmissions(response.data.result);

        if (response.data.result.length === 0) {
          toast.success('No submissions yet!');
        }
      } catch (error) {
        toast.error('An error occurred while fetching submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const indexOfLastSubmission = activePage * itemsCountPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - itemsCountPerPage;
  const currentSubmissions = submissions.slice(indexOfFirstSubmission, indexOfLastSubmission);

  const openModal = (content) => {
    setModalContent(content || '');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent('');
  };

  if (loading) {
    return (
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
      />
    );
  }

  return (
    <div className="submissions-container">
      <table className="table">
        <thead className="table-head">
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">Username</th>
            <th className="table-header">Language</th>
            <th className="table-header">Stdin</th>
            <th className="table-header">Source Code</th>
            <th className="table-header">Output</th>
            <th className="table-header">Stderr</th>
            <th className="table-header">Created At</th>
          </tr>
        </thead>
        <tbody>
          {currentSubmissions.map((submission) => (
            <tr key={submission.id} className="table-row">
              <td className="table-data">{submission.id}</td>
              <td className="table-data">{submission.username}</td>
              <td className="table-data">{submission.languages}</td>
              <td className="table-data">{submission.stdin || '-'}</td>
              <td className="table-data">
                <span
                  className="truncated-text"
                  onClick={() => openModal(submission.source_code || '')}
                >
                  {(submission.source_code || '').substring(0, 100)}
                </span>
              </td>
              <td className="table-data">
                <div className="output-container">
                  <span
                    className="truncated-text"
                    onClick={() => openModal(submission.output || '')}
                  >
                    {(submission.output || '').substring(0, 100)}
                  </span>
                </div>
              </td>
              <td className="table-data">
                <div className="output-container">
                  <span
                    className="truncated-text"
                    onClick={() => openModal(submission.stderr || '')}
                  >
                    {(submission.stderr || '').substring(0, 100)}
                  </span>
                </div>
              </td>
              <td className="table-data">{new Date(submission.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => handlePageChange('prev')}
          disabled={activePage === 1}
        >
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`pagination-button ${number === activePage ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={() => handlePageChange('next')}
          disabled={activePage === pageNumbers.length}
        >
          Next
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            maxWidth: '80%',
            maxHeight: '80%',
            margin: 'auto',
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '2rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            fontFamily: "'Poppins', sans-serif",
            color: '#333',
            overflow: 'auto',
          },
        }}
      >
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {modalContent}
        </pre>
        <button className="modal-close-button" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
}

export default SubmissionsPage;