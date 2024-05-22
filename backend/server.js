// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const orders = [];

app.post('/api/orders', (req, res) => {
  const order = req.body;
  orders.push(order);
  res.status(201).send(order);
});

app.get('/api/orders', (req, res) => {
  res.send(orders);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
