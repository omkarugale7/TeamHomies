const Mongoose = require("mongoose");

const DailyUsersSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    }
})

const DailyUser = Mongoose.model("DailyUser", DailyUsersSchema);

module.exports = DailyUser;