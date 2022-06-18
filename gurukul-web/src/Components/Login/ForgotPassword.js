import React from 'react'
import Gurukul from '../Images/gurukul.png'; 
import College from '../Images/College.jpg';
import './LoginAdmin.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
function ForgotPassword() {

  const formik = useFormik({
    initialValues: {
      email:'',
      
    },
    validationSchema: Yup.object({
      email: Yup.string().email()
      .required('email is required*'),  
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <div className='background'>
  <div className='container-fluid box_login'>

<div className='col-md-6 col-sm-12 login_container'>
  <img className='logo' src={Gurukul}/>
<form onSubmit={e =>  formik.handleSubmit(e) }>
<h1 className='login_heading'>Forgot Password</h1>
<label className='input_label'>Email</label>
<div className="login_input">
    
    <input 
    id="email"
    name="email"
    type="email"
    className="input_box_f"
     placeholder="Enter Your email"
     value={formik.values.email}
     onBlur={formik.handleBlur}
     onChange={e => { formik.handleChange(e) }} 
    
    // onChange={(e)=>{setUsername(e.target.value)}}
    />
     { formik.touched.email && formik.errors.email ? <p className='error_login'>{formik.errors.email}</p> : null} 
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