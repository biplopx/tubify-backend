require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const port = process.env.PORT || 5000
// express app
const app = express();

// middleware
app.use(express.json())
app.use(cors())


// Routes
app.use('/api/auth', authRoutes);

// conntect to db
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kgijh.mongodb.net/?retryWrites=true&w=majority`)
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
app.listen(port, () => {
  console.log('lesten port ', port);
})