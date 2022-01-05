const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route /auth/register
 * @desc  Register a new user
 * @access Public
 * expect {username, email, password} in req.body
 * expect {password.length > }
 */
router.post("/register", async (req, res) => {
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

  const user = await User.create(req.body);
  const token = jwt.sign({ id: user.toJSON().id });
});
