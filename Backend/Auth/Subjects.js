const Subject = require("./../model/subject");
const Admin = require("./../model/admin");

exports.subjectList = async (req,res) => {

    

    const {semester}  = req.query;

    console.log(semester);

    try {
        const subjects = await Subject.find({"semester" : semester});
        res.status(201).json({data: subjects});
    } catch {
        res.status(400).json({message: "Invalid Semester !!!"});
    }
}

exports.getSubjectList = async (req,res) => {
    const { username } = req.query;

    try {
        const subjects = await Subject.find({"teacher" : username});
        res.status(201).json({subjects: subjects});
    } catch {
        res.status(400).json({message: "Invalid Username !!!"});
    }
}

exports.createSubject = async (req ,res) => {
    const { name, code, semester } = req.body;

    const subject = await Subject.findOne({"code": code});

    if(subject) {
        res.status(400).json({message: "Subject Already Exists !!!"});
    }

    // try {
        await Subject.create({
            name,
            code,
            semester
        }).then(subject => {
            res.status(201).json({message: "Subject Created SuccessFully !!!"});
        }).catch(err => {
            res.status(400).json({message: "Server Error !!!",error: err});
        })
    // } catch {
    //     res.status(400).json({message: "Invalid !!!"})
    // }
}

exports.addSubject = async (req, res) => {
    const {code, username} = req.body;
    // console.log(code + " " + username);
    const admin = await Admin.findOne({"username": username});
    const subject = await Subject.findOne({"code": code});
    if(!subject) {
        return res.status(400).json({message: "Invalid Subject Code !!!"});
    }
    if(admin.subjects === undefined) admin.subjects = [];
    if(admin.subjects.includes(code)) {
        return res.status(400).json({message: "Subject Already Added !!!"});
    }
    var subjects = admin.subjects;
    subjects.push(`${code}`);
    
    const id = admin._id;
    Admin.findByIdAndUpdate(id,{"subjects":subjects},(err,docs)=>{
        if(err) {
            return res.status(400).json({message: "UnExpected Error !!!"});
        }
    });
    // console.log(subjects);
    Subject.findOneAndUpdate({"code": code},{"teacher": username},(err,docs)=>{
        if(err) {
            return res.status(400).json({message: "UnExpected Error !!!"});
        }
    });
    res.status(201).json({message: "Subject Added SuccessFully !!!"});
}

exports.deleteSubject = async (req, res) => {

    console.log("Hii I am here !!!");
    const {code, username} = req.query;

    console.log(code + " " + username);

    const admin = await Admin.findOne({"username": username});

    const subjects = admin.subjects;
    var newSubjects = subjects.filter(subject => {
        return subject != code;
    })
    console.log(newSubjects);
    const id = admin._id;
    Admin.findByIdAndUpdate(id,{"subjects":newSubjects},(err,docs)=>{
        if(err) {
            res.status(400).json({message: "UnExpected Error !!!"});
        }
    });
    Subject.findOneAndUpdate({"code": code},{"teacher": ""},(err,docs)=>{
        if(err) {
            res.status(400).json({message: "UnExpected Error !!!"});
        }
    });
    res.status(201).json({message: "Subject Deleted SuccessFully !!!"});
}