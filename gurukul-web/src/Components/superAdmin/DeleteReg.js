import React, { useState } from "react";
import "./SuperAdmin.css";
import Gurukul from "../Images/gurukul.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function DeleteReg() {
    const formik = useFormik({
        initialValues: {
          username: "",
        },
        validationSchema: Yup.object({
          username: Yup.string().required("Username is required*"),
        }),
        onSubmit: (values) => {
          console.log(values);
          LoginHandler(values);
        },
      });
      const formik1 = useFormik({
        initialValues: {
          username: "",
        },
        validationSchema: Yup.object({
          username: Yup.string().required("Username is required*"),
        }),
        onSubmit: (values) => {
          console.log(values);
          LoginHandler1(values);
        },
      });

      const LoginHandler=(values)=>{
        const URL = `https://wcegurukul.herokuapp.com/deleteAdmin?username=${values.username}`;
        axios
        .delete(
          URL,
          {
           
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
            alert("Successfully Deleted");
            window.location ='/superAdmin';
          }
        })
        .catch((err) => {
          if(err.message==="Request failed with status code 400")
              {
                
                alert("Bad Request");
                return 0;
              }
            if (err.message==="Request failed with status code 404") {
             
              alert("You have entered an invalid username");
                return 0;
            }
            if (err.message==="Request failed with status code 401") {
             
                return 0;
            }
          return 0;
        });
        values.username='';
        
      }

      const LoginHandler1=(values)=>{
        const URL = `https://wcegurukul.herokuapp.com/deleteUser?username=${values.username}`;
        axios
        .delete(
          URL,
          {
            username: values.username,
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
            alert("Successfully Deleted");
            window.location ='/superAdmin';
          }
        })
        .catch((err) => {
          if(err.message==="Request failed with status code 400")
              {
                
                alert("Bad Request");
                return 0;
              }
            if (err.message==="Request failed with status code 404") {
             
              alert("You have entered an invalid username");
                return 0;
            }
            if (err.message==="Request failed with status code 401") {
             
                return 0;
            }
          return 0;
        });
        values.username='';
        
      }

  return (
    <div className="background_super super_admin">
      <div>
        <img className="logo1" src={Gurukul} alt="logo" />
      </div>

      <div className="create_form">
        <p className="create_heading">Delete Admin</p>
        {/* <hr className="hr"/> */}
        <form onSubmit={(e) => formik.handleSubmit(e)}>
            <label className="create_label">Username:</label>
            <div className="col-md-12 col-sm-12 outer_create">
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
            </div>

            
          <button type="submit" className="btn-primary w-80 btn-lg">
            Delete
          </button>
        </form>
      </div>
      <div className="delete_form">
        <p className="create_heading">Delete User</p>
        {/* <hr className="hr"/> */}
        <form onSubmit={(e) => formik1.handleSubmit(e)} >
            <label className="create_label">Username:</label>
            <div className="col-md-12 col-sm-12 outer_create">
              <input
                id="username"
                name="username"
                type="text"
                className="create_input"
                placeholder="UserName"
                value={formik1.values.username}
                onBlur={formik1.handleBlur}
                onChange={(e) => {
                  formik1.handleChange(e);
                }}
              />
              <span class="focus-border">
                <i></i>
              </span>
            </div>

            
          <button type="submit" className="btn-primary w-80 btn-lg">
            Delete
          </button>
        </form>
      </div>
    </div>
  )
}

export default DeleteReg