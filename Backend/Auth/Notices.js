const Notice = require("./../model/notice");

exports.uploadNotice = async (req,res) => {
    try {
        const notice = await Notice(req.body).save();
        res.status(201).send({notice: notice,message: "Notice Added SuccessFully !!!"});
    } catch (err) {
        res.status(500).send({message: "Internal Server Error !!!"});
    }
}

exports.getNotice = async (req,res) => {
    try {
        const notices = await Notice.find().limit(5);
        res.status(200).send({data: notices});
    } catch (err) {
        res.status(500).send({message: "Internal Server Error !!!"});
    }
}

exports.deleteNotice = async (req, res) => {
    const { id } = req.query;
    await Notice.findByIdAndDelete(id).then(success => {
        res.status(201).json({message: "Notice Deleted SuccessFully !!!",success: success});
    }).catch(err => {
        res.status(400).json({message : "Notice Not Found !!!"});
    })
}