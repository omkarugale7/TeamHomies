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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
