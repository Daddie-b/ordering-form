// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderForm from './OrderForm';
import AdminDashboard from './AdminDashBoard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/" element={<OrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
