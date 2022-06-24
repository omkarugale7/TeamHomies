import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { GrEdit } from "react-icons/gr";

function NotesContent() {
    // console.log(localStorage.getItem('code'));
    // console.log(localStorage.getItem('semester'));
  const [notes,getNotes]= useState({});
  const [deleteItem, isDeleteItem] = useState(true);
    useEffect(() => {
      const URL = `https://wcegurukul.herokuapp.com/getNote?subject=${localStorage.getItem('code')}&semester=${localStorage.getItem('semester')}`;
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
            console.log(response.data.note);
            getNotes(response.data);
          //   setRegData(response.data);
          } else {
            alert(response.message);
            console.log(response.status);
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
      const URL = `https://wcegurukul.herokuapp.com/deleteNotes?id=${values._id}`;
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
    const columns = [
      {
        field:"module",
        title:"Module No."
      },
      {
        field:"module_name",
        title:"Module Name"
      },
      {
        field:"title",
        title:"Title"
      },
      {
        field:"desc",
        title:"Description",
        emtyValue:'null'
          // lookup:{'':'null'}
      },
      // {
      //   field:"file",
      //   title:"File"
      // }
    ]
const change=()=>{
  window.location.href='notesUpload'
}
  return (
    <div className="courses container-fluid">
        <div className='cre-ass btn-border-4 btn_del' onClick={change}>
        <a href='' className='btn_link'>
        
        <GrEdit size={40}/><h2>Add Notes</h2>
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
    title="Notes List"
    data={notes.note}
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

export default NotesContent