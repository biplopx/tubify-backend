require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const songRouter = require('./routes/SongRouter');
const port = process.env.PORT || 5000
// express app
const app = express();

// middleware
app.use(express.json())
app.use(cors())


// Routes
app.use('/user', authRouter);
app.use('/song', songRouter);

// connect to db
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kgijh.mongodb.net/tubifydb?retryWrites=true&w=majority`)
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Tubify server is running')
    })

    // Listening port
    app.listen(port, () => {
      console.log('Listening port ', port);
    })
  })
  .catch((error) => {
    console.log(error)
  })

