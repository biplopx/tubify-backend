require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

// express app
const app = express();

// middleware
app.use(express.json())
app.use(cors())


// Routes
app.use('/api/auth', authRoutes);

// conntect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB Connected')
  })
  .catch((error) => {
    console.log(error)
  })

app.get('/', (req, res) => {
  res.send('Tubify server is running')
})

// Listening port
app.listen(5000, () => {
  console.log('Server is running...')
})