// src/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; 

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [price, setPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the orders!', error);
      });
  }, []);

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmitPrice = (orderId) => {
    axios.put(`http://localhost:5000/api/orders/${orderId}`, { price })
      .then(() => {
        // Optionally, you can update the UI to reflect the price change
        // For example, you can fetch the orders again after updating the price
      })
      .catch((error) => {
        console.error('There was an error updating the price!', error);
      });
  };

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
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.cakeType}</td>
              <td>{order.message}</td>
              <td>{order.quantity}</td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="Enter price"
                />
                <button onClick={() => handleSubmitPrice(order._id)}>Set Price</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
