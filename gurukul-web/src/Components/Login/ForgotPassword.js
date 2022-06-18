import React from 'react'
import Gurukul from '../Images/gurukul.png'; 
import College from '../Images/College.jpg';
import './LoginAdmin.css';
function ForgotPassword() {
  return (
    <div className='background'>
  <div className='container-fluid box_login'>

<div className='col-md-6 col-sm-12 login_container'>
  <img className='logo' src={Gurukul}/>
<form>
<h1 className='login_heading'>Forgot Password</h1>
<label className='input_label'>Email</label>
<div className="login_input">
    
    <input 
    id="username"
    name="username"
    type="text"
    className="input_box_f"
     placeholder="Enter Your email" 
    
    // onChange={(e)=>{setUsername(e.target.value)}}
    />
    
</div>

  <div className='login_btn'>
<button type="submit" className="btn btn-primary btn-lg submit_btn">Enter</button>
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

export default ForgotPassword