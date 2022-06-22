import React, { useState,useEffect } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import SubjectContent from "./SubjectContent";
function Subject() {
  return (
    <div className='background'>
           <NavbarAdmin/>
           <SubjectContent/>
      </div>
  )
}

export default Subject