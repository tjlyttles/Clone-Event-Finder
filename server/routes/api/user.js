const router = require("express").Router();

/**
 * @route GET /api/user/
 * @desc Get current user information
 * @access Private
 *
 */
router.get("/", async (req, res, next) => {
  if (!req.user) return res.sendStatus(401);

  try {
    const userDoc = req.user;
    const userJSON = userDoc.toJSON();
    delete userJSON.password;
    res.status(200).json({ user: userJSON });
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /api/user
 * @desc  Update current user information
 * @access Private
 * expect {username, email, bio, image, password} in req.body
 */
router.put("/", async (req, res, next) => {
  if (!req.user) return res.sendStatus(401);

  const updateUserFields = req.body;
  if (updateUserFields["password"]) {
    if (updateUserFields["password"].length < 6)
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
  }

  try {
    const userDoc = req.user;
    Object.keys(updateUserFields).map((key) => {
      userDoc.set(key, updateUserFields[key]);
    });
    userDoc = await userDoc.save();
    const userJSON = userDoc.toJSON();
    delete userJSON.password;
    res.status(200).json({ user: userJSON });
  } catch (error) {
    next(error);
  }
});
