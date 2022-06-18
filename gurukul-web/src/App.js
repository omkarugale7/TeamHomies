import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginAdmin from './Components/Login/Login_admin';
import SuperAdminLogin from './Components/Login/SuperAdminLogin';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/" element={<LoginAdmin/>}/>
          <Route exact path = "/login" element={<LoginAdmin/>}/>
          <Route exact path = "/superAdminlogin" element={<SuperAdminLogin/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
