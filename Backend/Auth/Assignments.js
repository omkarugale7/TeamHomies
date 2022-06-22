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

exports.getAssignment = async (req, res) => {
    const { subject } = req.query;

    try {
        const assignments = await Assignment.find({"assignment_subject": subject});
        res.status(201).send({assignment: assignments,message: "Assignments List !!!"});
    } catch {
        res.status(400).send({message: "No Assignment Found !!!"});
    }
}

exports.uploadAssignment = async (req, res) => {
    try {
        const { username, _id, file } = req.body;
        const assignment = await Assignment.findById(_id);
        const userAssignment = {
            "username": username,
            "file": file,
            "date": new Date().toDateString()
        };
        
        assignment.students_submitted.push(userAssignment);
        assignment.save();
        res.status(201).send({message: "Assignment Uploaded SuccessFully !!!"});
        
    } catch {
        res.status(400).send({message: "Check If File Exists !!!"});
    }
}

exports.deleteAssignment = async (req, res) => {
    try {
        const { username, _id} = req.query;
        
        const assignment = await Assignment.findById(_id);
        var students_submitted = assignment.students_submitted.filter(student => {
            return student.username != username;
        });
        
        assignment.students_submitted = students_submitted;
        assignment.save();
        res.status(201).send({message: "Assignment Deleted SuccessFully !!!"});
    } catch {
        res.status(400).send({message: "Check If File Exists !!!"});
    }
}

exports.createAssignment = async (req, res) => {
    try {
        const {title , desc, due_date, due_time, teacher, number, subject, subject_name, file } = req.body;
        if(title === null) title = "";
        if(desc === null) desc = "";
        if(file === null) file = "";
        console.log(title + ' ' + desc + ' ' + file);
        await Assignment.create({
            "assignment_title" : title,
            "assignment_desc" : desc,
            "assignment_due_date" : due_date,
            "assignment_due_time" : due_time,
            "assignment_teacher" : teacher,
            "assignment_number" : number,
            "assignment_subject" : subject,
            "assignment_subject_name" : subject_name,
            "assignment_file" : file
        }).then(assignment => {
            console.log(assignment);
            res.status(201).json({message: "Assignment Added SuccessFully !!!",assignment: assignment});
        }). catch(err => {
            res.status(400).json({message: "Server Error !!!"});
        })
    } catch {
        res.status(400).json({message: "Server Error !!!"});
    }
}

exports.removeAssignment = async (req, res) => {
    const { id } = req.query;
    await Assignment.findByIdAndDelete(id).then(success => {
        res.status(201).json({message: "Assignment Deleted SuccessFully !!!",success: success});
    }).catch(err => {
        res.status(400).json({message : "Assignment Not Found !!!"});
    })
}