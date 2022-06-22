const Session = require("./../model/session");

exports.sessionList = async (req, res) => {
  const { subject } = req.query;

  try {
    const sessions = await Session.find({ "session_subject": subject });
    res.status(201).json({ data: sessions });
  } catch {
    res.status(400).json({ message: "Invalid Subject Name" });
  }
};

exports.markPresent = async (req,res) => {
  const { username, id } = await req.body;

  console.log(id + " " + username);
  
  try {
    var session = await Session.findById(id);
    console.log(session);
    if(session.session_state) {
      if(!session.students_present.includes(username)) {
        session.students_present.push(username);
        session.save();
        res.status(201).json({message: "Attendance Updated !!!"});
      } else {
        res.status(201).json({message: "Attendance Already Updated !!!"});
      }
      
    } else {
      res.status(400).json({message: "Session Over !!!"});
    }
  } catch {
    res.status(400).json({message: "Server Error !!!"});
  }
}

exports.createSession = async (req, res) => {
  const { session_teacher, session_subject, session_password, session_longitude, session_latitude } = await req.body;

  await Session.create({
    session_teacher,
    session_subject,
    session_password,
    session_latitude,
    session_longitude
  }).then((session) => {
    res.status(201).json({message: "Session Created SuccessFully !!!",session:session});
  }).catch((err) => {
    res.status(400).json({message: "Server Error !!!"});
  });
};

exports.stopSession = async (req, res) => {
    const { id } = req.body;
    try {
      Session.findByIdAndUpdate(id, {"session_state": false}).then(success=>{
        // console.log("Success !!")
        res.status(201).json({message: "Session Stopped SuccessFully !!!"});
      });
    } catch {
      res.status(400).json({message: "Invalid Session !!!"});
    }
}
