import React, { useState, useEffect }  from 'react'
import axios from "axios";
import MaterialTable from "material-table";
import NavbarAdmin from "../Navbar/NavbarAdmin";
function NoticeDelete() {
    const [notice, getNotice]=useState({});
    const [deleteItem, isDeleteItem] = useState(true);
    useEffect(() => {
        axios({
          method: "GET",
          url: `https://wcegurukul.herokuapp.com/getNotices`,
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            if (response.status === 201) {
              console.log(response.data);
              getNotice(response.data);
            } else {
              localStorage.setItem("token", "");
              window.location = "/login";
            }
            return;
          })
          .catch((err) => {
            console.log(err);
            alert("Looks like you're not logged in.");
            localStorage.setItem("token", "");
            window.location = "/login";
          });
      }, []);
        const DeleteHandler=(values)=>{
            const URL = `https://wcegurukul.herokuapp.com/deleteNotice?id=${values._id}`;
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
              field:'title',
              title:'title',
          },
          {
            field:'desc',
            title:'Description',
        },
        {
            field:'img',
            title:'image',
        }
      ]

  return (
      <div className='background'>
           <NavbarAdmin/>
    <div className="courses container-fluid">
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
      title="Notice List"
      data={notice.notice}
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
  </div>
  )
}

export default NoticeDelete