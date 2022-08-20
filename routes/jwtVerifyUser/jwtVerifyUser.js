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
  export default jwtVerifyUser;