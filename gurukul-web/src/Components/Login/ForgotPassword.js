import React, {useState} from 'react'
import Gurukul from '../Images/gurukul.png'; 
import College from '../Images/College.jpg';
import './LoginAdmin.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

function ForgotPassword() {
  const [alertCode, setAlertCode] = useState(0);
  const formik = useFormik({
    initialValues: {
      email:'',
      
    },
    validationSchema: Yup.object({
      email: Yup.string().email()
      .matches('[a-z0-9]+@[a-z]+\.[a-z]{2,3}' ,"Invalid  email type")
      .required('email required*'),  
    }),
    onSubmit: (values) => {
      console.log(values);
      Emailverify(values);
      LoginHandler(values);
    }
  });

  const Emailverify=(values)=>{
    if(!values.email.endsWith("@walchandsangli.ac.in")){
      alert("Invalid Email Type");
    }

  }

  const LoginHandler=(values)=>{
    const URL = 'https://wcegurukul.herokuapp.com/adminForgotPassword';
    axios
    .post(
      URL,
      {
        email: values.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response)=>{
      if (response.status === 201){
        const data = response.data;
        console.log(response.status);
        alert("Check Your Email");
        window.location='/login';
      }
    })
    .catch((err) => {
      if(err.message==="Request failed with status code 400")
          {
            setAlertCode(1);
            alert("Bad Request");
            return 0;
          }
        if (err.message==="Request failed with status code 404") {
          setAlertCode(2);
          alert("You have entered an invalid username or password");
            return 0;
        }
        if (err.message==="Request failed with status code 401") {
          setAlertCode(3);
            return 0;
        }
      setAlertCode(4);
      return 0;
    });
    values.email='';
  }

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