import React from "react";
// import { Children } from "react";
import { useState, useRef } from "react";
import "../DropDown/DropDown.css";
// import DropDown from "../DropDown/DropDown";
import "./UploadContent.css";
import { ImageConfig } from "../config/ImageConfig";
import uploadImg from "../../../Images/cloud-upload-regular-240.png";
import FileUpload from "./FileUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"; 
const AssignmentUploadContent = (props) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      due_date:"",
      number:"",
      subject_name:"",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required*"),
      due_date: Yup.string().required("Due Date is required*"),
      number: Yup.string().required("Assignment Number  is required*"),
      subject_name: Yup.string().required("Subject Name is required*"),
      
    }),
    onSubmit: (values) => {
      console.log(values);
      LoginHandler(values);
    },
  });

  const LoginHandler = (values) => {
    const time = new Date(values.due_date).getTime();
    const URL = "https://wcegurukul.herokuapp.com/createAssignment";
    axios
      .post(
        URL,
        {
         title: values.title,
          desc: values.desc,
          due_date: values.due_date,
          due_time: time,
          teacher: localStorage.getItem('username'),
          number: values.number,
          subject: localStorage.getItem('code'),
          subject_name: values.subject_name,
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
         alert("Succesfully Created Assignment");
         window.location.href='/adminAssignment';
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
    <div className="create_form upload">
      <div>
        <h2>Upload Assignment</h2>
      </div>
      <form onSubmit={(e) => formik.handleSubmit(e)}>
        <div className="row">
          <label className="create_label">Assignment Number:</label>
          <div className="col-md-5 col-sm-12 outer_create">
            <input
              id="number"
              name="number"
              type="number"
              className="create_input"
              placeholder="Assignment Number"
              value={formik.values.number}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
            />
            <span class="focus-border">
              <i></i>
            </span>
            {formik.touched.number && formik.errors.number ? (
                <p className="error_login">{formik.errors.number}</p>
              ) : null}
          </div>

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
        </div>

        <div className="row">
          <label className="create_label">Assignment Desc:</label>
          <div className="col-md-5 col-sm-12 outer_create">
            <input
              id="desc"
              name="desc"
              type="text"
              className="create_input"
              placeholder="Assignment Description"
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

          <label className="create_label">Subject:</label>
          <div className=" col-md-5 col-sm-12 outer_create">
            <input
              id="subject_name"
              name="subject_name"
              type="text"
              className="create_input"
              placeholder="Subject"
              value={formik.values.subject_name}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
            />
            <span class="focus-border">
              <i></i>
            </span>
            {formik.touched.subject_name && formik.errors.subject_name ? (
                <p className="error_login">{formik.errors.subject_name}</p>
              ) : null}
          </div>
        </div>

        <div className="row">
          <label className="create_label">Assignment Due Date:</label>
          <div className="col-md-5 col-sm-12 outer_create">
            <input
              id="due_date"
              name="due_date"
              type="date"
              className="create_input"
              placeholder="Assignment Number"
              value={formik.values.due_date}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
            />
            <span class="focus-border">
              <i></i>
            </span>
            {formik.touched.due_date && formik.errors.due_date ? (
                <p className="error_login">{formik.errors.due_date}</p>
              ) : null}
          </div>

          <div>
          <FileUpload/>
          </div>
        </div>
        <button type="submit" className="btn-primary w-80 ass-sub btn-lg">
          Create
        </button>
      </form>
    </div>
  );
};

export default AssignmentUploadContent;
