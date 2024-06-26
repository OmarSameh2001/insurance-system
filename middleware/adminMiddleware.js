const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authadmin  = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secret');
    const user = await User.findOne({ _id: decoded._id });
    if (!user.isAdmin) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Access denied' });
  }
};

module.exports = authadmin;
