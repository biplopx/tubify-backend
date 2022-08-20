const express = require('express');
const mongoose = require('mongoose');
const subscription = require('../models/paymentModel');
const paymentRouter = express.Router();
const User = require('../models/usersModel');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwtVerifyUser = (req, res, next) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split(' ')[1];
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
// payment  gateway by mahedi imun
paymentRouter.post("/create-payment-intent", async (req, res) => {
  const service = req.body;
  const price = service.price
  const amount = price * 100;
  try {
    if (amount) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ['card']

      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    }
  } catch {
    {
      res.send(" not found")
    }
  }


});

// post payment with 
paymentRouter.put('/plan-booked/:email', async (req, res) => {
  const email = req.params.email
  console.log(email)
  const filter = { email: email };
  const payment = req.body;
  const result = await subscription.create(payment)
  const updatedDoc = { payment: true }

  const update = await User.updateOne(filter, updatedDoc)
  res.send(update)
});

// update status order by id 

paymentRouter.put('/order-status/:id', jwtVerifyUser, async (req, res) => {
  const id = req.params.id;

  const filter = { _id: ObjectId(id) };
  const updatedDoc = {
    $set: {
      statusPending: false,
    }

  }
  const result = await subscription.updateOne(filter, updatedDoc);
  res.send(result)
})


// get all order

paymentRouter.get('/all-order', jwtVerifyUser, async (req, res) => {
  const result = await subscription.find().toArray()
  res.send(result)
})
// get order by id
paymentRouter.get('/order/:id', jwtVerifyUser, async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await subscription.findOne(query);
  res.send(result)
})

// delete order api
paymentRouter.delete('/order/:email', jwtVerifyUser, async (req, res) => {
  const email = req.params.email;
  const filter = { userEmail: email }
  const result = await subscription.deleteOne(filter)
  res.send(result)
});
module.exports = paymentRouter;