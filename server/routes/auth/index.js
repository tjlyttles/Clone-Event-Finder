const router = require("express").Router();
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

/**
 * @route /auth/register
 * @desc  Register a new user
 * @access Public
 * expect {username, email, password} in req.body
 * expect {password.length > 6}
 */
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, password, and email required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.toJSON().id });
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
});

/**
 * @route /auth/login
 * @desc  Log in a new user
 * @access Public
 * expect {username, password} in req.body
 */
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, and email required" });
  }
  try {
    const user = await User.findOne({ username: username });
    //fail if no user document is found
    if (!user) return res.sendStatus(401);
    //fail if the user password doesn't match
    if (!user.comparePassword(password)) return res.sendStatus(401);
    //generate token
    const token = jwt.sign({ id: user.toJSON().id });
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
