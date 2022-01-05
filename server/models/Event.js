const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    location: {
      name: {
        type: String,
      },
      addressInfo: {
        type: String,
      },
      mapLat: {
        type: Number,
      },
      mapLng: {
        type: Number,
      },
    },
    schedule: {
      start: {
        type: Date,
        //require: true
      },
      end: {
        type: Date,
        //require: true
      },
    },
    groupSize: {
      type: String,
      // require: true
    },
    category: {
      type: String,
    },
    description: {
      type: String,
      max: 250,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    attendingUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    pendingUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", EventSchema);
