const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  role: {
    type: String,
    default: "Student",
    min: 3,
    max: 255,
  },
  email : {
    type: String,
    required: true,
  },
  phone : {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  prn : {
    type: String,
    required: true,
  },
  graduation_year : {
    type: Number,
    required: true
  },
  branch : {
    type: String,
    required: true
  },
  semester : {
    type: Number,
    default: 4
  }
})

const User = Mongoose.model("User", UserSchema);

module.exports = User;