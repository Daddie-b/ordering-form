import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [cakes, setCakes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newCake, setNewCake] = useState({
    name: '',
    price: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/cakes')
      .then((response) => {
        setCakes(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the cakes!', error);
      });

    axios.get('http://localhost:5000/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the orders!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCake({ ...newCake, [name]: value });
  };

  const handleAddCake = () => {
    axios.post('http://localhost:5000/api/cakes', newCake)
      .then((response) => {
        setCakes([...cakes, response.data]);
        setNewCake({ name: '', price: 0 });
      })
      .catch((error) => {
        console.error('There was an error adding the cake!', error);
      });
  };

  const handleDeleteCake = (cakeId) => {
    axios.delete(`http://localhost:5000/api/cakes/${cakeId}`)
      .then(() => {
        setCakes(prevCakes => prevCakes.filter(cake => cake._id !== cakeId));
      })
      .catch((error) => {
        console.error('There was an error deleting the cake!', error);
      });
  };

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

  const getCakeName = (cakeType) => {
    const cake = cakes.find(cake => cake._id === cakeType);
    return cake ? cake.name : 'Unknown Cake';
  };

  const pendingOrders = orders.filter(order => order.status !== 'completed');

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="cakes-list">
        <h3>Cakes List</h3>
        <ul>
          {cakes.map((cake) => (
            <li key={cake._id}>
              {cake.name} - ${cake.price}
              <button onClick={() => handleDeleteCake(cake._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-cake-form">
        <h3>Add New Cake</h3>
        <input
          type="text"
          name="name"
          value={newCake.name}
          onChange={handleChange}
          placeholder="Cake Name"
        />
        <input
          type="number"
          name="price"
          value={newCake.price}
          onChange={handleChange}
          placeholder="Cake Price"
        />
        <button onClick={handleAddCake}>Add Cake</button>
      </div>
      <div className="orders-list">
        <h3>Orders List</h3>
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

export default AdminDashboard;
