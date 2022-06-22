import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { GrEdit } from "react-icons/gr";

function NotesContent() {
    // console.log(localStorage.getItem('code'));
    // console.log(localStorage.getItem('semester'));
  const [notes,getNotes]= useState({});
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
          lookup:{'':'null'}
      },
      // {
      //   field:"file",
      //   title:"File"
      // }
    ]

  return (
    <div className="courses container-fluid">
        <div className='cre-ass btn-border-4 btn_del'>
        <a href='' className='btn_link'>
        
        <GrEdit size={40}/><h2>Add Notes</h2>
        </a>
      </div>

        <MaterialTable
    editable={{
      
        
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
    actions={[
      {
        icon: () => <button><a >Open</a></button>,
        tooltip: "Enter",
        onClick: (e, data) => {
          console.log(data.code)
          
        window.location.href=`${data.file}`;
      },
      },
    ]}
  />
        
    </div>
  )
}

export default NotesContent