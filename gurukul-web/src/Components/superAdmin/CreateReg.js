import React, { useState } from "react";
import "./SuperAdmin.css";
import Gurukul from "../Images/gurukul.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
function CreateReg() {
  const [alertCode, setAlertCode] = useState(0);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      phone: "",
      joining_year: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required*"),
      password: Yup.string()
        .min(8, "minimum 8 required")
        .required("Password is required*"),
      email: Yup.string()
        .email()
        .matches("[a-z0-9]+@[a-z]+.[a-z]{2,3}", "Invalid  email type")
        .required("email required*"),
      joining_year: Yup.string().required("Joining Year is Required"),
      name: Yup.string().required("Full Name is Required"),
      phone: Yup.string().required("Phone Number is Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      Emailverify(values);
      LoginHandler(values);
    },
  });

  const LoginHandler=(values)=>{
    const URL = 'https://wcegurukul.herokuapp.com/adminRegister';
    axios
    .post(
      URL,
      {
        username: values.username,
        password: values.password,
        name:values.name,
        joining_year:values.joining_year,
        phone:values.phone,
        email:values.email
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
        alert("Successfully Created");
        window.location ='/superAdmin';
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
    values.username='';
    values.password='';
    values.name='';
    values.joining_year='';
    values.phone='';
    values.email='';
  }

  const Emailverify = (values) => {
    if (!values.email.endsWith("@walchandsangli.ac.in")) {
      alert("Invalid Email Type");
    }
  };
  return (
    <div className="background_super super_admin">
      <div>
        <img className="logo1" src={Gurukul} alt="logo" />
      </div>

      <div className="create_form">
        <p className="create_heading">Create Admin</p>
        {/* <hr className="hr"/> */}
        <form onSubmit={(e) => formik.handleSubmit(e)}>
          <div className="row">
            <label className="create_label">Username:</label>
            <div className="col-md-5 col-sm-12 outer_create">
              <input
                id="username"
                name="username"
                type="text"
                className="create_input"
                placeholder="UserName"
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
              <span class="focus-border">
                <i></i>
              </span>
              {formik.touched.username && formik.errors.username ? (
                <p className="error_login">{formik.errors.username}</p>
              ) : null}
            </div>

            <label className="create_label">Phone Number:</label>
            <div className=" col-md-5 col-sm-12 outer_create">
              <input
                id="phone"
                name="phone"
                type="text"
                className="create_input"
                placeholder="Phone Number"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
              <span class="focus-border">
                <i></i>
              </span>
              {formik.touched.phone && formik.errors.phone ? (
                <p className="error_login">{formik.errors.phone}</p>
              ) : null}
            </div>
          </div>

          <div className="row">
            <label className="create_label">Full Name:</label>
            <div className="col-md-5 col-sm-12 outer_create">
              <input
                id="name"
                name="name"
                type="text"
                className="create_input"
                placeholder="Full Name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
              <span class="focus-border">
                <i></i>
              </span>
              {formik.touched.name && formik.errors.name ? (
                <p className="error_login">{formik.errors.name}</p>
              ) : null}
            </div>

            <label className="create_label">Password:</label>
            <div className=" col-md-5 col-sm-12 outer_create">
              <input
                id="password"
                name="password"
                type="password"
                className="create_input"
                placeholder="Password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
              <span class="focus-border">
                <i></i>
              </span>
              {formik.touched.password && formik.errors.password ? (
                <p className="error_login">{formik.errors.password}</p>
              ) : null}
            </div>
          </div>

          <div className="row">
            <label className="create_label">Email:</label>
            <div className="col-md-5 col-sm-12 outer_create">
              <input
                id="email"
                name="email"
                type="email"
                className="create_input"
                placeholder="Email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
              <span class="focus-border">
                <i></i>
              </span>
              {formik.touched.email && formik.errors.email ? (
                <p className="error_login">{formik.errors.email}</p>
              ) : null}
            </div>

            <label className="create_label">Joining Year:</label>
            <div className=" col-md-5 col-sm-12 outer_create">
              <input
                id="joining_year"
                name="joining_year"
                type="text"
                className="create_input"
                placeholder="Joining Year"
                value={formik.values.joining_year}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
              <span class="focus-border">
                <i></i>
              </span>
              {formik.touched.joining_year && formik.errors.joining_year ? (
                <p className="error_login">{formik.errors.joining_year}</p>
              ) : null}
            </div>
          </div>
          <button type="submit" className="btn-primary w-80 btn-lg">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateReg;
