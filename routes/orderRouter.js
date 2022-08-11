const express = require('express');
const mongoose = require('mongoose');
const orderRouter = express.Router();
const Order = require('../models/orderModel');
const jwt = require('jsonwebtoken');
orderRouter.post('/new', async (req, res) => {
    const order = req.body
    try {
        const result = await Order.create(order)
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
  });
module.exports = orderRouter;