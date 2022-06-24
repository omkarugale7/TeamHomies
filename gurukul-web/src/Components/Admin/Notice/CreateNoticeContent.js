import React from "react";
import { useState, useRef } from "react";
import "../Courses/DropDown/DropDown.css";
import { ImageConfig } from "../Courses/config/ImageConfig";
import uploadImg from "../../Images/cloud-upload-regular-240.png";
import "./Notice.css";
import Storage from "../../Admin/Firebase.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import UploadImage from "./UploadImage";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
function CreateNoticeContent(props) {
  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",

    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required*"),
      
    }),
    onSubmit: (values) => {
      console.log(values);
      LoginHandler(values);
    },
  });

  const LoginHandler = (values) => {
    const time = new Date(values.due_date).getTime();
    const URL = "https://wcegurukul.herokuapp.com/uploadNotice";
    axios
      .post(
        URL,
        {
         title: values.title,
          desc: values.desc,
          img: localStorage.getItem('img'),
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
         alert("Succesfully Created Notice");
         window.location.href='/notice';
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
  };
  

 

  return (
    <div className="create_form upload">
      <div>
        <h2>Upload Notice</h2>
      </div>
      <form onSubmit={(e) => formik.handleSubmit(e)}>
        <div className="row">
          <label className="create_label">Title:</label>
          <div className=" col-md-5 col-sm-12 outer_create w-100">
            <input
              id="title"
              name="title"
              type="text"
              className="create_input w-100"
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
          <label className="create_label"> Description:</label>
          <div className="col-md-5 col-sm-12 outer_create w-100">
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
        </div>

        <div className="row">
          <div>
            <UploadImage/>
          </div>
        </div>
        <button type="submit" className="btn-primary w-80 ass-sub btn-lg">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateNoticeContent;
