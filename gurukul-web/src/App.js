import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginAdmin from './Components/Login/Login_admin';
import SuperAdminLogin from './Components/Login/SuperAdminLogin';
import ForgotPassword from './Components/Login/ForgotPassword';
import ResetPassword from './Components/Login/ResetPassword';
import SuperAdmin from './Components/superAdmin/SuperAdmin';
import CreateReg from './Components/superAdmin/CreateReg';
import DeleteReg from './Components/superAdmin/DeleteReg';
import Admin from './Components/Admin/Admin';
import Subject from './Components/Admin/Courses/Subject';
import Assignment from './Components/Admin/Courses/Assignment';
import Notes from './Components/Admin/Courses/Notes';
import AssignmentUpload from './Components/Admin/Courses/upload-assignment/AssignmentUpload';
import Notice from './Components/Admin/Notice/Notice';
import CreateNotice from './Components/Admin/Notice/CreateNotice';
import NoticeDelete from './Components/Admin/Notice/NoticeDelete';
import NotesUpload from './Components/Admin/Courses/NotesUpload';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/TeamHomies" element={<LoginAdmin/>}/>
          <Route exact path = "/login" element={<LoginAdmin/>}/>
          <Route exact path = "/superAdminlogin" element={<SuperAdminLogin/>}/>
          <Route exact path = "/forgotPassword" element={<ForgotPassword/>}/>
          <Route exact path = "/resetPassword" element={<ResetPassword/>}/>
          <Route exact path = "/superAdmin" element={<SuperAdmin/>}/>
          <Route exact path = "/createReg" element={<CreateReg/>}/>
          <Route exact path = "/deleteReg" element={<DeleteReg/>}/>
          <Route exact path = "/admin" element={<Admin/>}/>
          <Route exact path = "/adminSubject" element={<Subject/>}/>
          <Route exact path = "/adminAssignment" element={<Assignment/>}/>
          <Route exact path = "/adminNotes" element={<Notes/>}/>
          <Route exact path = "/assignmentUpload" element={<AssignmentUpload/>}/>
          <Route exact path = "/notice" element={<Notice/>}/>
          <Route exact path = "/createNotice" element={<CreateNotice/>}/>
          <Route exact path = "/noticeDelete" element={<NoticeDelete/>}/>
          <Route exact path = "/notesUpload" element={<NotesUpload/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
