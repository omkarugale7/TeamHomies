import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginAdmin from './Components/Login/Login_admin';
import SuperAdminLogin from './Components/Login/SuperAdminLogin';
import ForgotPassword from './Components/Login/ForgotPassword';
import ResetPassword from './Components/Login/ResetPassword';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/" element={<LoginAdmin/>}/>
          <Route exact path = "/login" element={<LoginAdmin/>}/>
          <Route exact path = "/superAdminlogin" element={<SuperAdminLogin/>}/>
          <Route exact path = "/forgotPassword" element={<ForgotPassword/>}/>
          <Route exact path = "/resetPassword" element={<ResetPassword/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
