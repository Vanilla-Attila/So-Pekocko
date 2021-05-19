const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Getting the Bearer token in the authorization in the second part of the header
    const token = req.headers.authorization.split(' ')[1];
    // Decoding the token with the encoded string
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Extract the user id
    const userId = decodedToken.userId;
    // Checking the user id is not valid
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};