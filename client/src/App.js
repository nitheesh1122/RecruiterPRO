import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardUser from './pages/DashboardUser';
import DashboardRecruiter from './pages/DashboardRecruiter';
import DashboardAdmin from './pages/DashboardAdmin';
import Parser from './pages/Parser';
import ParserRecruiter from './pages/ParserRecruiter';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing & Auth */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/dashboard/user" element={<DashboardUser />} />
        <Route path="/dashboard/recruiter" element={<DashboardRecruiter />} />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />

        {/* Resume Parsers */}
        <Route path="/parser" element={<Parser />} />                    {/* User parser */}
        <Route path="/recruiter-parser" element={<ParserRecruiter />} /> {/* Recruiter parser */}
      </Routes>
    </Router>
  );
}

export default App;
