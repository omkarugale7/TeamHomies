const Mongoose = require('mongoose');
  
const sessionSchema = new Mongoose.Schema({
    session_date : {
        type: String,
        default: new Date().toDateString()
    },
    session_time : {
        type: Date,
        default: Date.now
    },
    session_teacher : {
        type: String,
        required: true
    },
    session_subject : {
        type: String,
        required: true
    },
    session_password : {
        type: String,
        required: true
    },
    session_state : {
        type: Boolean,
        default: true
    },
    students_present : {
        type: [String],
        required: true,
        default: null
    }
});


const Session = Mongoose.model('Session', sessionSchema);

module.exports = Session;