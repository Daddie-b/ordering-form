// src/OrderForm.js
import React, { useState } from 'react';

function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    cakeType: '',
    message: '',
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed! \nName: ${formData.name} \nCake Type: ${formData.cakeType} \nMessage: ${formData.message} \nQuantity: ${formData.quantity}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
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
      <div>
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
      <div>
        <label htmlFor="message">Message on Cake:</label>
        <input
          type="text"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <div>
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
      <button type="submit">Place Order</button>
    </form>
  );
}

export default OrderForm;
