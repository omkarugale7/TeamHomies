const Mongoose = require('mongoose');

const noticeSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date().toLocaleString()
    },
    time: {
        type: Number,
        default: new Date().getTime()
    }
});


const Notice = Mongoose.model('Notice', noticeSchema);

module.exports = Notice;