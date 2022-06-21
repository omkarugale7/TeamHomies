const Note = require("./../model/note");

exports.uploadNotes = async (req,res) => {
    try {
        const note = await Note(req.body).save();
        res.status(201).send({data: note,message: "Notes Added SuccessFully !!!"});
    } catch (err) {
        res.status(400).send({message: "Check If File Exists !!!"});
    }
}

exports.getNotes = async (req,res) => {
    try {
        const { semester, subject } = req.query;
        const note = await Note.find({"semester": semester,"subject": subject});
        res.status(200).send({data: note});
    } catch (err) {
        res.status(400).send({message: "Check If File Exists !!!"});
    }
}