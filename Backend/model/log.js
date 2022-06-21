const Mongoose = require("mongoose");

const LogSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true
  },
  login_time : {
    type: String,
    default: new Date().toDateString()
  }
})

const Log = Mongoose.model("Log", LogSchema);

module.exports = Log;