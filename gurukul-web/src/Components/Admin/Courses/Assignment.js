import React, { useState,useEffect } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import AssignmentContent from "./AssignmentContent";
function Assignment() {
  return (
    <div className='background'>
           <NavbarAdmin/>
           <AssignmentContent/>
      </div>
  )
}

export default Assignment