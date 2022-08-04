const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const authRouter = express.Router();
const usersSchema = require('../models/usersSchema');
const User = new mongoose.model("User",usersSchema)
const jwt = require('jsonwebtoken');
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
  User.updateOne(filter, updatedDoc, options, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      res.send({ accessToken, docs })
    }
  });
});
module.exports = authRouter;