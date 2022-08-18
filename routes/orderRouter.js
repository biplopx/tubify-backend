const express = require('express');
const mongoose = require('mongoose');
const orderRouter = express.Router();
const Order = require('../models/orderModel');
const jwt = require('jsonwebtoken');
orderRouter.post('/new', async (req, res) => {
  const order = req.body
  try {
    const perviousOrder = await Order.find({ userEmail: order.userEmail });
    if (perviousOrder.length === 0) {
      const result = await Order.create(order)
      res.status(200).json(result);
    } else {
      return res.status(403).send({ massage: (`already have ${perviousOrder[0].planName}`) })
    }

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});
orderRouter.get('/my-order/:email', async (req, res) => {
  const email = req.params.email;
  const query = { userEmail: email };
  const result = await Order.findOne(query);
  if (result === null) {
    return res.send({})

  };
  res.send(result)
})
module.exports = orderRouter;