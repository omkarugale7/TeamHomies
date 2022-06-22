import React, { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NavbarAdmin from "./Navbar/NavbarAdmin";
import Courses from "./Courses/Courses";

function Admin() {
    // useEffect(()=>{

    //     console.log(localStorage.getItem('token'));
    //     axios({
    //       method: "GET",
    //       url:
    //         `https://wcegurukul.herokuapp.com/adminVerifyToken`,
    //       headers: {
    //         "Content-Type": "application/json",
    //         "x-access-token": `${localStorage.getItem('token')}`,
    //       },
    //     })
    //       .then((response) => {
    //           if(response.status===201)
    //           {
                
    //           }
    //           else
    //           {
    //             localStorage.setItem('token', '')
    //             window.location = '/login';
    //           }
    //           return
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //         alert("Looks like you're not logged in.");
    //         localStorage.setItem('token', "");
    //         window.location='/login'
    //       });
    //   }, [])

  return (
      <div className='background'>
           <NavbarAdmin/>
           <Courses/>
      </div>
   
  )
}

export default Admin