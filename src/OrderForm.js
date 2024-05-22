// src/OrderForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderForm.css';

function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    cakeType: '',
    message: '',
    quantity: 1,
  });

  const [price, setPrice] = useState(0);
  const [prices, setPrices] = useState({
    Chocolate: 0,
    Vanilla: 0,
    'Red Velvet': 0,
    Carrot: 0,
  });

  useEffect(() => {
    // Fetch prices for each cake type from the backend
    axios.get('http://localhost:5000/api/prices')
      .then(response => {
        setPrices(response.data);
      })
      .catch(error => {
        console.error('Error fetching prices:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Update the price based on the selected cake type and quantity
    setPrice(prices[value] * formData.quantity);
  };

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, quantity: value });
    // Update the price based on the selected cake type and quantity
    setPrice(prices[formData.cakeType] * value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/orders', { ...formData, price });
      // Optionally, you can display a success message or redirect the user
    } catch (error) {
      // Handle error
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
            onChange={handleQuantityChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Total Payment:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            readOnly // Prevents the user from changing the price manually
            required
          />
        </div>
        <button type="submit" className="submit-btn">Place Order</button>
      </form>
    </div>
  );
}

export default OrderForm;
