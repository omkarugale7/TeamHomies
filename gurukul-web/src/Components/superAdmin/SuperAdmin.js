import React, { useEffect, useState } from "react";
import "./SuperAdmin.css";
import { FaUserAlt, FaUserGraduate } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Gurukul from "../Images/gurukul.png";
import MaterialTable from "material-table";
import axios from "axios";
function SuperAdmin() {
  const [regData, setRegData] = useState({});
  useEffect(() => {
    const URL = "https://wcegurukul.herokuapp.com/webHome";
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          setRegData(response.data);
        } else {
          alert("Some error occurred.");
          window.location = "/superAdminLogin";
          return;
        }
      })
      .catch((err) => {
        alert("Some error occurred.");
        window.location = "/superAdminLogin";
        return;
      });
  }, []);


  
  const columns = [
    {
      field: "username",
      title: "Username",
      //    width: 100,
      // editable: true,
      align: "center",
    },
    {
      field: "role",
      title: "Role",
      //   width: 80,
      // editable: true,
      align: "center",
    },
    {
      field: "login_time",
      title: "Login Time",
      // width: 80,
      // editable: true,
      align: "center",
    },
  ];

  return (
    <div className="background_super super_admin">
      <div>
        <img className="logo1" src={Gurukul} alt="logo" />
      </div>
      <div className="registered container-fluid">
        <div className="col-md-4 col-sm-12 register_container">
          <FaUserAlt size={40} />
          <h3 className="regHead">Registered Students:</h3>
          <h2>{regData["users"]}</h2>
        </div>

        <div className="col-md-4 col-sm-12 register_container">
          <GiTeacher size={40} />
          <h3 className="regHead">Registered Teachers:</h3>
          <h2>{regData["admins"]}</h2>
        </div>

        <div className="col-md-4 col-sm-12 register_container">
          <FaUserGraduate size={40} />
          <h3 className="regHead">Registered Alumni:</h3>
          <h2>999</h2>
        </div>
      </div>

      <div className="edit_reg">
        {/* <a href='/createReg' className='col-md-6 create_reg'>
             <GrEdit size={20}/><h5>Create</h5>
            </a> */}
        <a class="btn_cre btn-border-4 col-md-6" href="/createReg">
          <GrEdit size={20} />
          <h5>Create</h5>
        </a>

        <a class="btn_del btn-border-4 col-md-6" href="/deleteReg">
          <MdDelete size={20} />
          <h5>Delete</h5>
        </a>
        {/* <a href='/forgotPassword' className='col-md-6 delete_reg'>
             <MdDelete size={20}/><h5>Delete</h5>
            </a> */}
      </div>
      <div className="container-fluid w-75 log_table">
        <MaterialTable 
        columns={columns} 
        title='Login Log'
        data={regData["logs"]}
        options={{
            exportButton: true,
            actionsColumnIndex:0,
            pageSizeOptions:[5,10],
            exportAllData: true,
            pageSize:5,
            search: false,
            exportCsv:false
          }}
         />
      </div>
    </div>
  );
}

export default SuperAdmin;
