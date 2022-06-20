const Mongoose = require('mongoose');
  
const assignmentSchema = new Mongoose.Schema({
    assignment_date : {
        type: Date,
        default: new Date()
    },
    assignment_due_date : {
        type: Date,
        required: true
    },
    assignment_due_time : {
        type: Date,
        required: true
    },
    assignment_teacher : {
        type: String,
        required: true
    },
    assignment_subject : {
        type: String,
        required: true
    },
    students_submitted : {
        type: [String],
        required: true,
        default: null
    }
});


const Assignment = Mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;