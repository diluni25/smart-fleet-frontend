const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'logiroute_dev_secret');
  const user = await User.findById(decoded.id).select('-password');

  if (!user || !user.isActive) {
    res.status(401);
    throw new Error('User not found or account is inactive');
  }

  req.user = user;
  next();
});

module.exports = { protect };