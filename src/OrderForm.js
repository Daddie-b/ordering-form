// src/OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './OrderForm.css'; // Import the CSS file for styling

function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    cakeType: '',
    message: '',
    quantity: 1,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/orders', formData);
      setMessage('Order placed successfully!');
    } catch (error) {
      setMessage('Failed to place order.');
    }
  };

  return (
    <div className="order-form-container">
      <h2>Place Your Cake Order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cakeType">Cake Type:</label>
          <select
            id="cakeType"
            name="cakeType"
            value={formData.cakeType}
            onChange={handleChange}
            required
          >
            <option value="">Select a cake type</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Vanilla">Vanilla</option>
            <option value="Red Velvet">Red Velvet</option>
            <option value="Carrot">Carrot</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message on Cake:</label>
          <input
            type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Place Order</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default OrderForm;
