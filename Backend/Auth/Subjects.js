const Subject = require("./../model/subject");

exports.subjectList = async(req,res) => {
    const { semester } = await req.body;

    try {
        const subjects = await Subject.find({"semester" : semester});
        res.status(201).json({data: subjects});
    } catch {
        res.status(400).json({message: "Invalid Semester !!!"});
    }
}