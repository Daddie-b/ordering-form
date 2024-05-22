// src/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import the CSS file for styling

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the orders!', error);
      });
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Cake Type</th>
            <th>Message</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.cakeType}</td>
              <td>{order.message}</td>
              <td>{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
