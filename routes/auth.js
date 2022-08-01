const express = require('express');
const router = express.Router();
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
// authentication send token
app.post('/gettoken', async (req, res) => {
  const user = req.body
  const accessToken = jwt.sign(user, process.env.ACCESS_JWT_TOKEN_SECRET, {
    expiresIn: '2d'
  });
  res.send(accessToken)
});


app.get('/', (req, res) => {
  res.send('Tubify server is running')
})

// Login Route
router.get('/login', (req, res) => {
  res.send('Login is successfull');
})

// Sign Up
router.get('/signup', (req, res) => {
  res.send('Register API')
})

module.exports = router;