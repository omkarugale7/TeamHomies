import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { GrEdit } from "react-icons/gr";
import axios from "axios";
function AssignmentContent() {
    console.log(localStorage.getItem('code'));
    const [assignment,getAssignment]= useState({});
    useEffect(() => {
        const URL = `https://wcegurukul.herokuapp.com/getAssignment?subject=${localStorage.getItem('code')}`;
        axios
          .get(URL, 
            {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${localStorage.getItem('token')}`,
            },
          })
          .then((response) => {
            if (response.status === 201) {
              console.log(response.data);
            //   setRegData(response.data);
            getAssignment(response.data);
            } else {
              alert("Some error occurred.");
              window.location = "/admin";
              return;
            }
          })
          .catch((err) => {
            alert("Some error occurred.");
            window.location = "/admin";
            return;
          });
      }, []);
    
const columns=[
    {
        field:"assignment_subject_name",
        title:'Subject'
    },
    {
        field:"assignment_subject",
        title:'Subject code'
    },
    {
        field:"assignment_title",
        title:'Title'
    },
    {
        field:"assignment_desc",
        title:'Description',
        lookup:{'':'null'}
    },
    {
        field:"assignment_date",
        title:'Assignment date'
    },
    {
        field:"assignment_due_date",
        title:'Due Date'
    }
]
const change=()=>{
  window.location.href='assignmentUpload'
}
  return (
    <div className="courses container-fluid">
        <div className='cre-ass btn-border-4 btn_del' onClick={change}>
        <a  className='btn_link'>
        
        <GrEdit size={40}/><h2>Create Assignment</h2>
        </a>
      </div>

        <MaterialTable
    editable={{
      
        
    }}
    columns={columns}
    title="Assignment List"
    data={assignment.assignment}
    options={{
      exportButton: true,
      actionsColumnIndex: 0,
      pageSizeOptions: [5, 10],
      exportAllData: true,
      pageSize: 5,
      search: true,
      exportCsv: false,
      addRowPosition: "first",
      actionsColumnIndex: -1,
    }}
    actions={[
      {
        icon: () => <button><a >Open</a></button>,
        tooltip: "Enter",
        onClick: (e, data) => {
          console.log(data.code);
          window.location.href=`${data.assignment_file}`;
      },
      },
    ]}
  />
        
    </div>
  )
}

export default AssignmentContent