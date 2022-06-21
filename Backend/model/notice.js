const Mongoose = require('mongoose');
  
const noticeSchema = new Mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    desc: {
        type: String,
        default : ""
    },
    img: {
        type: String,
        required: true
    }
});


const Notice = Mongoose.model('Notice', noticeSchema);

module.exports = Notice;