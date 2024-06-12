/* src/Orders.js */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderForm';
import { Link } from 'react-router-dom';

function Orders() {
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

  const handleCompleteOrder = (orderId) => {
    axios.patch(`http://localhost:5000/api/orders/${orderId}`, { status: 'completed' })
      .then(() => {
        setOrders(prevOrders => prevOrders.map(order =>
          order._id === orderId ? { ...order, status: 'completed' } : order
        ));
      })
      .catch((error) => {
        console.error('There was an error completing the order!', error);
      });
  };

  const getCakeName = (cakeType, cakes) => {
    const cake = cakes.find(cake => cake._id === cakeType);
    return cake ? cake.name : 'Unknown Cake';
  };

  const pendingOrders = orders.filter(order => order.status !== 'completed');

  return (
    <div className="orders-container">
      <h2>Orders List</h2>
      <Link to="/" className="back-button">Back to Dashboard</Link>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cake Type</th>
              <th>Message</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((order) => (
              order.cakes.map((cake, index) => (
                <tr key={`${order._id}-${index}`}>
                  {index === 0 && <td rowSpan={order.cakes.length}>{order.name}</td>}
                  <td>{getCakeName(cake.cakeType)}</td>
                  <td>{cake.message}</td>
                  <td>{cake.quantity}</td>
                  <td>${cake.price}</td>
                  <td>
                    <button onClick={() => handleCompleteOrder(order._id)} disabled={order.status === 'completed'}>
                      {order.status === 'completed' ? 'Completed' : 'Complete Order'}
                    </button>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
