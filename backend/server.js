const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/onefi';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('mongodb connection error:', err));

const productRoutes = require('./routes/products');

app.get('/', (req, res) => {
  res.json({ message: 'welcome to 1fi api' });
});

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
