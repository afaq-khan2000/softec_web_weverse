const jwt = require('jsonwebtoken');

const decodeToken = (token) => {
  if (!token) {
    return null;
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken;
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  decodeToken,
  generateToken,
};
