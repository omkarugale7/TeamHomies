const Mongoose = require('mongoose');
  
const subjectSchema = new Mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    code : {
        type: String,
        required: true
    },
    teacher : {
        type: String,
        default: ""
    },
    semester : {
        type: Number,
        required: true
    }
});


const Subject = Mongoose.model('Subject', subjectSchema);

module.exports = Subject;