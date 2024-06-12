import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">About</Link></li>
          <li><Link to="/">Contact</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to MugoMarbles</h1>
        <p>Click on the links below to navigate:</p>
        <ul>
          <li><Link to="/order">Order Form</Link></li>
          <li><Link to="/admin">Admin Dashboard</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default LandingPage;
