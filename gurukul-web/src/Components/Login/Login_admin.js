import React from 'react';
import './LoginAdmin.css';
import { Link } from 'react-router-dom';
import Gurukul from '../Images/gurukul.png'; 
import College from '../Images/College.jpg';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LoginAdmin() {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      
    },
    validationSchema: Yup.object({
      username: Yup.string()
      .required('Username is required*'),
      password: Yup.string()
      .min(8,"minimum 8 required")
      .required('Password is required*')   
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });
  console.log(formik.errors);
  return (
    <div className='background'>
  <div className='container-fluid box_login'>

<div className='col-md-6 col-sm-12 login_container'>
  <img className='logo' src={Gurukul}/>
<form onSubmit={e =>  formik.handleSubmit(e) }>
<h1 className='login_heading'>Login</h1>
<label className='input_label'>Username</label>
<div className="login_input">
    
    <input 
    id="username"
    name="username"
    type="text"
    className="input_box"
     placeholder="Enter Your Username" 
     value={formik.values.username}
     onBlur={formik.handleBlur}
     onChange={e => { formik.handleChange(e) }}
    
    // onChange={(e)=>{setUsername(e.target.value)}}
    />
    { formik.touched.username && formik.errors.username ? <p className='error_login'>{formik.errors.username}</p> : null} 
</div>

<label className='input_label'>Password</label>
<div className="login_input">
    <input type="password" 
    id="password"
    name="password"
    className="input_box" 
    placeholder="Enter password"
    value={formik.values.password}
    onBlur={formik.handleBlur}
    onChange={e => { formik.handleChange(e) }}
      // onChange={(e)=>{setPassword(e.target.value)}}
      />
    { formik.touched.password && formik.errors.password ? <p className='error_login'>{formik.errors.password}</p> : null} 
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