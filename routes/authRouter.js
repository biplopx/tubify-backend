const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

// Verify User JWT
const jwtVerifyUser = (req, res, next) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split(' ')[1];
  // console.log(token);
  if (token === 'null') {
    return res.status(401).send({ massage: ('unauthorize') })
  } else {

    jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({ massage: ('forbidden access') })
      } else {
        req.decoded = decoded
        next()
      }
    })
  }
};

// authentication send token and save user email mongodb
authRouter.put('/:email', async (req, res) => {
  const email = req.params.email;
  const user = req.body;
  const filter = { email: email }
  const options = { upsert: true };
  const updatedDoc = {
    $set: user,
  };
  const accessToken = jwt.sign({ email: email }, process.env.ACCESS_JWT_TOKEN_SECRET, { expiresIn: '2 days' });
  const schema = new Schema({ email: String });
  const User = mongoose.model('User', schema);
  User.updateOne(filter, updatedDoc, options, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      res.send({ accessToken, docs })
    }
  });
});

// get all users
authRouter.get('/all-users', async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
})

module.exports = authRouter;