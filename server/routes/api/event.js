const router = require("express").Router();

const Event = require("../../models/Event");
const { route } = require("../events");

/**
 * @route GET /api/event
 * @desc  get all events that user involve in
 * @access Private
 * expect {username, email, bio, image, password} in req.body
 */

router.get("/", async (req, res, next) => {
  if (!req.user) return res.sendStatus(401);

  try {
    const eventDocs = await Event.find({
      $or: [
        { organizer: req.user.id },
        { attendingUser: req.user.id },
        { pending: req.user.id },
      ],
    })
      .populate("users", "username email image")
      .sort({
        date: -1,
      });
    const eventsJSON = eventDocs.map((eventDoc) => eventDoc.toJSON());
    res.json(eventsJSON);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/event/:id
 * @desc Get specific event information
 * @access Public
 */
router.get("/event/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "users",
      "username email image"
    );
    const eventJSON = event.toJSON();
    res.json({ event: eventJSON });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/event/
 * @desc Create an event by user
 * @access Private
 * expect {name, location, schedule, groupSize, description} in req.body
 */
route.post("/", async (req, res, next) => {
  if (!req.user) return res.sendStatus(401);

  try {
    const newEvent = new Event(req.body);
    newEvent.organizer = req.user.id;
    const eventDoc = await newEvent.save();
    eventDoc.populate("user", "username emai image");
    const eventJSON = eventDoc.toJSON();
    res.json({ event: eventJSON });
  } catch (error) {
    next(error);
  }
});

/**
 * @route PUT /api/event/:id
 * @desc Update an event
 * @access Private
 *
 */
route.put("/:id", async (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  const eventUpdateFields = req.body;

  try {
    let eventDoc = await Event.findById(req.params.id);

    if (!eventDoc) return res.status(404);

    if (eventDoc.organizer !== req.user.id) return res.sendStatus(403);

    Object.keys(eventUpdateFields).map((key) => {
      eventDoc.set(key, eventUpdateFields[key]);
    });
    eventDoc = await Event.save();

    const eventJSON = eventDoc.toJSON();
    res.json({ event: eventJSON });
  } catch (error) {
    next(error);
  }
});
