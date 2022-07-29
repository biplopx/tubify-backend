const express = require('express');
const router = express.Router();

// Login Route
router.get('/login', (req, res) => {
  res.send('Login is successfull');
})

// Sign Up
router.get('/signup', (req, res) => {
  res.send('Register API')
})

module.exports = router;