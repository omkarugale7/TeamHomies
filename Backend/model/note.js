const Mongoose = require('mongoose');
  
const noteSchema = new Mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    desc: {
        type: String,
        default : ""
    },
    semester: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    module: {
        type: Number,
        required: true
    },
    module_name: {
        type: String,
        required: true
    },
    part: {
        type: String,
        default: 1,
        required: true
    },
    file: {
        type: String,
        required: true
    }
});


const Note = Mongoose.model('Note', noteSchema);

module.exports = Note;