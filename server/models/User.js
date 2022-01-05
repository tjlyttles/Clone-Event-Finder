const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    displayname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      require: true,
      min: 6,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
      max: 20,
    },
    attendHistory: [
      {
        type: Schema.ObjectId,
        ref: "event",
      },
    ],
    petitions: [
      {
        type: Schema.ObjectId,
        ref: "event",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});

//pre save hook to

module.exports = mongoose.model("user", UserSchema);
