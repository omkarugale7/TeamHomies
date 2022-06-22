import React, { useState,useEffect } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import NotesContent from "./NotesContent";
import axios from "axios";
function Notes() {

  

  return (
    <div className='background'>
        <NavbarAdmin/>
        <NotesContent/>
    </div>
  )
}

export default Notes