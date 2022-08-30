const express = require('express');
const mongoose = require('mongoose');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const jwtVerifyUser = require('../middleware/jwtVerifyUser');
// authentication send token and save user email mongodb by mahedi imun
authRouter.put('/:email', async (req, res) => {
  const email = req.params.email;
  const user = req.body;
  const filter = { email: email }
  const options = { upsert: true };
  const updatedDoc = {
    $set: user,
  };
  const accessToken = jwt.sign({ email: email }, process.env.ACCESS_JWT_TOKEN_SECRET, { expiresIn: '30d' });
  User.updateOne(filter, updatedDoc, options, function (err, docs) {
    if (err) {
      // console.log(err)
    }
    else {
      res.send({ accessToken, docs })
    }
  });
});
// set admin role by mahedi imun 
authRouter.put('/admin/:email', async (req, res) => {
  const requester = req.decoded.email;
  const requesterAccount = await User.findOne({ email: requester });
  const email = req.params.email;
  if (requesterAccount.role == 'admin') {
    const filter = { email: email }
    const updatedDoc = {
      $set: { role: 'admin' },
    };
    const result = await User.updateOne(filter, updatedDoc);
    res.send(result)
  } else {
    return res.status(403).send({ message: 'forbidden' })
  }

});
// set Remove Admin role
authRouter.put('/admin/remove/:email', jwtVerifyUser, async (req, res) => {
  const requester = req.decoded.email;
  const requesterAccount = await User.findOne({ email: requester });
  const email = req.params.email;
  if (requesterAccount.role == 'admin') {
    const filter = { email: email }
    const updatedDoc = {
      $set: { role: 'user' },
    };
    const result = await User.updateOne(filter, updatedDoc);
    res.json({ status: "successful", result: result })
  } else {
    return res.json({ status: 'forbidden' })
  }

});
// get admin by mahedi imun 
authRouter.get('/admin/:email', jwtVerifyUser, async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email: email });
    const isAdmin = user.role == "admin";
    res.send({ admin: isAdmin })
  } catch (err) {
    res.send(err)
  }
});
// delete admin by mahedi imun 
authRouter.delete('/admin/:email',jwtVerifyUser,  async (req, res) => {
  const email = req.params.email;
  const filter = { email: email }
  const result = await User.deleteOne(filter)
  res.send(result)
});

// get all users
authRouter.get('/all-users',jwtVerifyUser, async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
})

// Single User API
authRouter.get('/single-user/:email',jwtVerifyUser, async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email: email }).populate('likedSongs').populate({ path: 'playlist', populate: { path: 'songs', model: 'Song' } })
  res.status(200).send(user);
})

module.exports = authRouter;