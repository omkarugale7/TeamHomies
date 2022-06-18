import React from 'react'
import Gurukul from '../Images/gurukul.png'; 
import College from '../Images/College.jpg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
function ResetPassword() {

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm: '',
      
    },
    validationSchema: Yup.object({
      password: Yup.string()
      .min(8,"minimum 8 required")
      .required('Password is required*') ,
      confirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')  
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
  <form>
  <h1 className='login_heading'>Reset Password</h1>
  <label className='input_label'>Password</label>
  <div className="login_input">
      <input type="password" 
      id="password"
      name="password"
      className="input_box_f" 
      placeholder="Enter New password"
      value={formik.values.password}
    onBlur={formik.handleBlur}
    onChange={e => { formik.handleChange(e) }}
      
        // onChange={(e)=>{setPassword(e.target.value)}}
        />
      { formik.touched.password && formik.errors.password ? <p className='error_login'>{formik.errors.password}</p> : null} 
  </div>
  <label className='input_label'>Confirm Password</label>
  <div className="login_input">
      <input type="password" 
      id="confirm"
      name="confirm"
      className="input_box_f" 
      placeholder="Enter New password"
      value={formik.values.confirm}
    onBlur={formik.handleBlur}
    onChange={e => { formik.handleChange(e) }}
        // onChange={(e)=>{setPassword(e.target.value)}}
        />
      { formik.touched.confirm && formik.errors.confirm ? <p className='error_login'>{formik.errors.confirm}</p> : null} 
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