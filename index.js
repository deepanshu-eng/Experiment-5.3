require('dotenv').config();

console.log('Full env keys:', Object.keys(process.env).filter(k => k.includes('MONGODB') || k === 'PORT'));

const express = require('express');
const mongoose = require('mongoose');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const db = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('public'));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

db.connect().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('DB connection failed:', err));