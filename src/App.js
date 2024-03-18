// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormPage from './FormPage';
import SubmissionsPage from './SubmissionsPage';
import './App.css';

function App() {
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    const handleLinkClick = () => {
      const path = window.location.pathname;
      setActiveLink(path);
    };

    window.addEventListener('popstate', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLinkClick);
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
            onClick={() => setActiveLink('/')}
          >
            Form
          </Link>
          <Link
            to="/submissions"
            className={`nav-link ${activeLink === '/submissions' ? 'active' : ''}`}
            onClick={() => setActiveLink('/submissions')}
          >
            Submissions
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;