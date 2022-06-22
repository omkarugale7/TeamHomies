const Mongoose = require('mongoose');

const assignmentSchema = new Mongoose.Schema({
    assignment_date: {
        type: String,
        default: new Date().toDateString()
    },
    assignment_title: {
        type: String,
        default: ""
    },
    assignment_desc: {
        type: String,
        default: ""
    },
    assignment_due_date: {
        type: String,
        required: true
    },
    assignment_due_time: {
        type: Number,
        required: true
    },
    assignment_teacher: {
        type: String,
        required: true
    },
    assignment_number: {
        type: Number,
        required: true
    },
    assignment_subject: {
        type: String,
        required: true
    },
    assignment_subject_name: {
        type: String,
        required: true
    },
    assignment_file: {
        type: String,
        default: ""
    },
    students_submitted: {
        type: [{
            "username": String,
            "file": String,
            "date": String
        }],
        default: []
    }
});


const Assignment = Mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;