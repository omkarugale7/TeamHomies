import React from 'react'
import Gurukul from '../Images/gurukul.png'; 
import College from '../Images/College.jpg';
function ResetPassword() {
  return (
    <div className='background'>
    <div className='container-fluid box_login'>
  
  <div className='col-md-6 col-sm-12 login_container'>
    <img className='logo' src={Gurukul}/>
  <form>
  <h1 className='login_heading'>Reset Password</h1>
  <label className='input_label'>Password</label>
  <div className="login_input">
      <input type="password" 
      id="password"
      name="password"
      className="input_box_f" 
      placeholder="Enter New password"
      
        // onChange={(e)=>{setPassword(e.target.value)}}
        />
      
  </div>
  <label className='input_label'>Confirm Password</label>
  <div className="login_input">
      <input type="password" 
      id="password"
      name="password"
      className="input_box_f" 
      placeholder="Enter New password"
      
        // onChange={(e)=>{setPassword(e.target.value)}}
        />
      
  </div>
    <div className='login_btn'>
  <button type="submit" className="btn btn-primary btn-lg submit_btn">Reset Password</button>
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

export default ResetPassword