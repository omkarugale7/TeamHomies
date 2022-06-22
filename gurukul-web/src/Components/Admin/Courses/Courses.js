import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MaterialTable from "material-table";
import "./Courses.css";
import { GiReloadGunBarrel } from "react-icons/gi";
function Courses() {
  const [subject, getSubject] = useState({});
  const [correct, isCorrect] = useState(true);
  const [deleteItem, isDeleteItem] = useState(true);
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("username"));
    axios({
      method: "GET",
      url: `https://wcegurukul.herokuapp.com/getSubjectList?username=${localStorage.getItem(
        "username"
      )}`,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data.subjects);
          getSubject(response.data);
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

  const LoginHandler = (values) => {
    const URL = "https://wcegurukul.herokuapp.com/addSubject";
    axios
      .post(
        URL,
        {
          username: localStorage.getItem("username"),
          code: values.code,
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
          isCorrect(true);
        }
        else{
          alert(response.message);
        }
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 400") {
          isCorrect(false);
          // alert(err.message);
          return 0;
        }
        if (err.message === "Request failed with status code 404") {
          isCorrect(false);
          // alert(err.message);
          return 0;
        }
        if (err.message === "Request failed with status code 401") {
          isCorrect(false);
          // alert(err.message);
          return 0;
        }
        isCorrect(false);
        return 0;
      });
  };

  const DeleteHandler = (values) => {
    const URL = `https://wcegurukul.herokuapp.com/deleteSubject?username=${localStorage.getItem("username")}&code=${values.code}`;
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
          isCorrect(true);
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
  };

  const columns = [
    {
      field: "name",
      title: "Subject Name",
      width: 100,
      // editable: true,
      // align: "center",
    },
    {
      field: "code",
      title: "Subject Code",
      width: 80,
      // editable: true,
    },
    {
      field: "semester",
      title: "Semester",
      width: 80,
      // editable: true,
    },
  ];

  return (
    <div className="courses container-fluid">
      <MaterialTable
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              LoginHandler(newRow);
              console.log(newRow);
              if (correct === true) {
                 resolve();
                 
              }
              // window.location.reload(false);
              
            }),
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
        title="Courses List"
        data={subject.subjects}
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
            icon: () => <button><a >Enter</a></button>,
            tooltip: "Enter",
            onClick: (e, data) => {
              console.log(data.code)
              localStorage.setItem("code", `${data.code}`);
              localStorage.setItem("semester",`${data.semester}`);
              console.log(localStorage.getItem('semester'));
            window.location.href=`/adminSubject`;
          },
          },
        ]}
      />
    </div>
  );
}

export default Courses;
