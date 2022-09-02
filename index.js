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
const videoRouter = require('./routes/videoRouter');
const albumRouter = require('./routes/albumRouter')
const artistRouter = require('./routes/artistRouter');
const jwtVerifyUser = require('./middleware/jwtVerifyUser');
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
app.use('/song', jwtVerifyUser, songRouter);
app.use('/video', jwtVerifyUser, videoRouter);
app.use('/payment', jwtVerifyUser, paymentRouter);
app.use('/pricing', pricingRouter);
app.use('/booking', jwtVerifyUser, bookingRouter);
app.use('/playlists', jwtVerifyUser, playlistsRouter);
app.use('/albums', jwtVerifyUser, albumRouter);
app.use('/artist', jwtVerifyUser, artistRouter);
// connect to db
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kgijh.mongodb.net/tubifydb?retryWrites=true&w=majority`)
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Tubify server is running')
    })
  })
  .catch((error) => {
    // console.log(error)
  })
// Listening port
app.listen(port, () => {
  console.log('Listening port ', port);
})
