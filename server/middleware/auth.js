const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return next();
  }
  try {
    //find user record and attached it to request
    const decoded = jwt.verify(token, config.get(process.env.JWT_SECRET));
    const user = User.findById(decoded.user);
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};
