import React from 'react'
import { useState, useRef } from "react";
import "../Courses/DropDown/DropDown.css";
import { ImageConfig } from "../Courses/config/ImageConfig";
import uploadImg from "../../Images/cloud-upload-regular-240.png";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import FileUpload from './upload-assignment/FileUpload';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"; 
function NotesUpload(props) {

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      semester:"",
      module:"",
      module_name:"",
      part:"",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required*"),
      semester: Yup.string().required("semester is required*"),
      module: Yup.string().required("module Number  is required*"),
      module_name: Yup.string().required("module Name  is required*"),
      part: Yup.string().required("part Number is required*"),
      
    }),
    onSubmit: (values) => {
      console.log(values);
      LoginHandler(values);
    },
  });

  const LoginHandler = (values) => {
    const URL = "https://wcegurukul.herokuapp.com/uploadNotes";
    axios
      .post(
        URL,
        {
         title: values.title,
          desc: values.desc,
          semester: values.semester,
          module: values.module,
          module_name: values.module_name,
          subject: localStorage.getItem('code'),
          part: values.part,
          file: localStorage.getItem('url'),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          const data = response.data;
         alert("Succesfully added");
         window.location.href='/adminNotes';
        }
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 400") {
         
          alert("Bad Request");
          return 0;
        }
        if (err.message === "Request failed with status code 404") {
          
          alert("You have entered an invalid username or password");
          return 0;
        }
        if (err.message === "Request failed with status code 401") {
          
          return 0;
        }
        
        return 0;
      });
    values.desc='';
    values.title='';
    values.due_date='';
    values.subject_name='';
    values.number='';
  };
    
  return (
    <div className='background'>
        <NavbarAdmin/>

        <div className="create_form upload">
    <div>
      <h2>Upload Notice</h2>
    </div>
    <form onSubmit={(e) => formik.handleSubmit(e)}>
      <div className="row">
        <label className="create_label">Title:</label>
        <div className=" col-md-5 col-sm-12 outer_create">
          <input
            id="title"
            name="title"
            type="text"
            className="create_input"
            placeholder="Title"
            value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
          />
          <span class="focus-border">
            <i></i>
          </span>
          {formik.touched.title && formik.errors.title ? (
                <p className="error_login">{formik.errors.title}</p>
              ) : null}
        </div>
        <label className="create_label">Semester:</label>
        <div className=" col-md-5 col-sm-12 outer_create">
          <input
            id="semester"
            name="semester"
            type="text"
            className="create_input"
            placeholder="semester"
            value={formik.values.semester}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
          />
          <span class="focus-border">
            <i></i>
          </span>
          {formik.touched.semester && formik.errors.semester ? (
                <p className="error_login">{formik.errors.semester}</p>
              ) : null}
        </div>
      </div>

      <div className="row">
        <label className="create_label"> Description:</label>
        <div className="col-md-5 col-sm-12 outer_create">
          <input
            id="desc"
            name="desc"
            type="text"
            className="create_input"
            placeholder="Description"
            value={formik.values.desc}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
          />
          <span class="focus-border">
            <i></i>
          </span>
        </div>
        <label className="create_label"> Module Number:</label>
        <div className="col-md-5 col-sm-12 outer_create">
          <input
            id="module"
            name="module"
            type="number"
            className="create_input"
            placeholder="Description"
            value={formik.values.module}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
          />
          <span class="focus-border">
            <i></i>
          </span>
          {formik.touched.module && formik.errors.module ? (
                <p className="error_login">{formik.errors.module}</p>
              ) : null}
        </div>
        <label className="create_label"> Module Name:</label>
        <div className="col-md-5 col-sm-12 outer_create">
          <input
            id="module_name"
            name="module_name"
            type="text"
            className="create_input"
            placeholder="module name"
            value={formik.values.module_name}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.handleChange(e);
            }}
          />
          <span class="focus-border">
            <i></i>
          </span>
          {formik.touched.module_name && formik.errors.module_name ? (
                <p className="error_login">{formik.errors.module_name}</p>
              ) : null}
        </div>

      </div>

      <div className="row">
      <label className="create_label"> Part Number:</label>
        <div className="col-md-5 col-sm-12 outer_create">
          <input
            id="part"
            name="part"
            type="number"
            className="create_input"
            placeholder="Part Number"
            value={formik.values.part}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.handleChange(e);
            }}
          />
          <span class="focus-border">
            <i></i>
          </span>
          {formik.touched.part && formik.errors.part? (
                <p className="error_login">{formik.errors.part}</p>
              ) : null}
        </div>

        <div>
          
         <FileUpload/>
        </div>
      </div>
      <button type="submit" className="btn-primary w-80 ass-sub btn-lg" >
        Create
      </button>
    </form>
  </div>
    </div>
  )
}

export default NotesUpload