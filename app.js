const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const brokerRoutes = require('./routes/brokerRoutes');
const policyRoutes = require('./routes/policyRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/insurance-system', {
  
}).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));

// Auth routes
app.use(authRoutes);

// User routes
app.use('/users', userRoutes);

// Broker routes
app.use('/brokers', brokerRoutes);

// Policy routes
app.use('/policies', policyRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
