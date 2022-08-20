require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const songRouter = require('./routes/SongRouter');
const paymentRouter = require('./routes/paymentRouter');
const pricingRouter = require('./routes/pricingRouter');
const bookingRouter = require('./routes/bookingRouter');
const playlistsRouter = require('./routes/playlistsRouter');
const port = process.env.PORT || 5000
// express app
const app = express();

// middleware
app.use(express.json())
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
// Routes
app.use('/user', authRouter);
app.use('/song', songRouter);
app.use('/payment', paymentRouter);
app.use('/pricing', pricingRouter);
app.use('/booking', bookingRouter);
app.use('/playlists', playlistsRouter);
// connect to db
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kgijh.mongodb.net/tubifydb?retryWrites=true&w=majority`)
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Tubify server is running')
    })
  })
  .catch((error) => {
    console.log(error)
  })
// Listening port
app.listen(port, () => {
  console.log('Listening port ', port);
})
