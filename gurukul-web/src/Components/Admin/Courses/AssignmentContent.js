import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { GrEdit } from "react-icons/gr";
import axios from "axios";
function AssignmentContent() {
    console.log(localStorage.getItem('code'));
    const [assignment,getAssignment]= useState({});
    const [deleteItem, isDeleteItem] = useState(true);
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

      const DeleteHandler=(values)=>{
        const URL = `https://wcegurukul.herokuapp.com/removeAssignment?id=${values._id}`;
  axios
  .get(
    URL,
    {
      // username: localStorage.getItem("username"),
      // code: values.code,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${localStorage.getItem("token")}`,
      },
    }
  )
  .then((response) => {
    if (response.status === 201) {
      console.log(response.status);
      alert("Sucessfully deleted");
      
    }
    else{
      console.log(response.status);
      alert(response.message);
    }
  })
  .catch((err) => {
    if (err.message === "Request failed with status code 400") {
      isDeleteItem(false);
      alert(err.message);
      return 0;
    }
    if (err.message === "Request failed with status code 404") {
      isDeleteItem(false);
      // alert(err.message);
      return 0;
    }
    if (err.message === "Request failed with status code 401") {
      isDeleteItem(false);
      // alert(err.message);
      return 0;
    }
    isDeleteItem(false);
    return 0;
  });
    }
    
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
      onRowDelete: (selectedRow)=>
          new Promise((resolve,reject)=>{
            console.log(selectedRow);
            DeleteHandler(selectedRow);
            if(deleteItem===true){
              resolve();
            }
            else{
              window.location.reload();
            }
          })
        
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
    
  />
        
    </div>
  )
}

export default AssignmentContent