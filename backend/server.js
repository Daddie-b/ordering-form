const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const orders = [];
const cakes = [];

app.post('/api/orders', (req, res) => {
  const order = { ...req.body, _id: Date.now().toString(), status: 'pending' }; // Ensure unique _id and add status
  orders.push(order);
  res.status(201).send(order);
});

app.get('/api/orders', (req, res) => {
  const ordersWithCakes = orders.map(order => {
    const cake = cakes.find(cake => cake._id === order.cakeType);
    return {
      ...order,
      cakeName: cake ? cake.name : 'Unknown Cake',
      cakePrice: cake ? cake.price : 0
    };
  });
  res.send(ordersWithCakes);
});

app.post('/api/cakes', (req, res) => {
  const cake = { ...req.body, _id: Date.now().toString() }; // Ensure unique _id
  cakes.push(cake);
  res.status(201).send(cake);
});

app.get('/api/cakes', (req, res) => {
  res.send(cakes);
});

app.delete('/api/cakes/:cakeId', (req, res) => {
  const { cakeId } = req.params;
  const index = cakes.findIndex(cake => cake._id === cakeId);
  if (index !== -1) {
    cakes.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send({ error: 'Cake not found' });
  }
});

app.patch('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = orders.find(order => order._id === orderId);
  if (order) {
    order.status = status;
    res.sendStatus(204);
  } else {
    res.status(404).send({ error: 'Order not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
