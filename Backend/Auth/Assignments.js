const Assignment = require("../model/assignment");

exports.getAssignments = async (req, res) => {
    const { subject } = req.query;

    try {
        const assignments = await Assignment.find({"assignment_subject": subject});
        res.status(201).send({data: assignments,message: "Assignments List !!!"});
    } catch {
        res.status(400).send({message: "No Assignment Found !!!"});
    }
}

exports.uploadAssignments = async (req, res) => {
    try {
        const { username, _id, file } = req.body;
        const assignment = await Assignment.findById(_id);
        const userAssignment = {
            "username": username,
            "file": file,
            "date": new Date().toDateString()
        };
        console.log(username + " " + _id + " " + file);
        assignment.students_submitted.push(userAssignment);
        assignment.save();
        res.status(400).send({message: "Assignment Uploaded SuccessFully"});
        
    } catch {
        res.status(400).send({message: "Check If File Exists !!!"});
    }
}