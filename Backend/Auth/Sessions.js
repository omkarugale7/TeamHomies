const Session = require("./../model/session");

exports.sessionList = async (req, res) => {
  const { subject } = await req.body;

  try {
    const sessions = await Session.find({ session_subject: subject });
    res.status(201).json({ data: sessions });
  } catch {
    res.status(400).json({ message: "Invalid Subject Name" });
  }
};

exports.createSession = async (req, res) => {
  const { session_teacher, session_subject, session_password } = await req.body;

  await Session.create({
    session_teacher,
    session_subject,
    session_password,
  }).then((session) => {
    res.status(201).json({message: "Session Created SuccessFully !!!",session:session});
  }).catch((err) => {
    res.status(400).json({message: "Server Error !!!"});
  });
};

// exports.stopSession = async (req, res) => {
//     const { session_id }
// }
