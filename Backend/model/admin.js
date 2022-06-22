const Mongoose = require("mongoose");

const AdminSchema = new Mongoose.Schema({
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
        default: "admin",
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
      joining_year : {
        type: Number,
        required: true,
      },
      subjects : {
        type: [String],
        default: []
      }
})

const Admin = Mongoose.model("Admin", AdminSchema);

module.exports = Admin;