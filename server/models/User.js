const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

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
    password: {
      type: String,
      require: true,
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

//pre save hook to salt the password
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
  });
});

UserSchema.methods.comparePassword = async function (textPassword) {
  try {
    const isMatch = await bcrypt.compare(textPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("user", UserSchema);
