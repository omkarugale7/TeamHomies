const Notice = require("./../model/notice");

exports.uploadNotice = async (req,res) => {
    try {
        const notice = await Notice(req.body).save();
        res.status(201).send({data: notice,message: "Notice Added SuccessFully !!!"});
    } catch (err) {
        res.status(500).send({message: "Internal Server Error !!!"});
    }
}

exports.getNotice = async (req,res) => {
    try {
        const notices = await Notice.find();
        res.status(200).send({data: notices});
    } catch (err) {
        res.status(500).send({message: "Internal Server Error !!!"});
    }
}