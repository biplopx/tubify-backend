const express = require('express');
const mongoose = require('mongoose');
const pricingRouter = express.Router();
const jwt = require('jsonwebtoken');
const Plan = require('../models/pricingModel');

// get all plan 
pricingRouter.get('/plan', async (req, res) => {
    const result = await Plan.find({})
    res.send(result)
  });
pricingRouter.get('/plan/:id', async (req, res) => {
    const id = req.params.id
    const result = await Plan.findOne({_id:id})
    res.send(result)
  });
module.exports = pricingRouter;