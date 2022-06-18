import React from 'react';
import './LoginAdmin.css';
import { Link } from 'react-router-dom';
import Gurukul from '../Images/gurukul.png'; 
import College from '../Images/College.jpg';
function LoginAdmin() {
  return (
    <div className='background'>
  <div className='container-fluid box_login'>

<div className='col-md-6 col-sm-12 login_container'>
  <img className='logo' src={Gurukul}/>
<form>
<h1 className='login_heading'>Login</h1>
<label className='input_label'>Username</label>
<div className="login_input">
    
    <input 
    id="username"
    name="username"
    type="text"
    className="input_box"
     placeholder="Enter Your Username" 
    
    // onChange={(e)=>{setUsername(e.target.value)}}
    />
    
</div>
<label className='input_label'>Password</label>
<div className="login_input">
    <input type="password" 
    id="password"
    name="password"
    className="input_box" 
    placeholder="Enter password"
    
      // onChange={(e)=>{setPassword(e.target.value)}}
      />
    
</div>
<Link className='forgot_link' to="/forgotPassword"> <p className='forgot'>Forgot Password?</p></Link>
  <div className='login_btn'>
<button type="submit" className="btn btn-primary btn-lg submit_btn">Log in</button>
</div>

</form>
</div>
<div className='col-md-6 col-sm-12 login_img'>
<img className='side_img' src={College}/>
</div>
        </div>
        </div>
  )
}

export default LoginAdmin;