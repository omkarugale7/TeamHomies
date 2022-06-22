const Note = require("./../model/note");

exports.uploadNotes = async (req,res) => {
    try {
        const note = await Note(req.body).save();
        res.status(201).json({note: note,message: "Notes Added SuccessFully !!!"});
    } catch (err) {
        res.status(400).json({message: "Check If File Exists !!!"});
    }
}

exports.getNotes = async (req,res) => {
    try {
        const { semester, subject } = req.query;
        console.log(semester + " " + subject);
        const note = await Note.find({"semester": semester,"subject": subject});
        console.log(note);
        res.status(201).json({data: note});
    } catch (err) {
        res.status(400).json({message: "Check If File Exists !!!"});
    }
}

exports.getNote = async (req,res) => {
    try {
        const { semester, subject } = req.query;
        console.log(semester + " " + subject);
        const note = await Note.find({"semester": semester,"subject": subject});
        console.log(note);
        res.status(201).json({note: note});
    } catch (err) {
        res.status(400).json({message: "Check If File Exists !!!"});
    }
}

exports.deleteNotes = async (req, res) => {
    const { id } = req.query;
    await Note.findByIdAndDelete(id).then(success => {
        res.status(201).json({message: "Notes Deleted SuccessFully !!!",success: success});
    }).catch(err => {
        res.status(400).json({message : "Notes Not Found !!!"});
    })
}