import React from "react";
// import { Children } from "react";
import { useState, useRef } from "react";
import "../DropDown/DropDown.css";
// import DropDown from "../DropDown/DropDown";
import "./UploadContent.css";
import { ImageConfig } from "../config/ImageConfig";
import uploadImg from "../../../Images/cloud-upload-regular-240.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import {storage }from "../../../Admin/Firebase";
const AssignmentUploadContent = (props) => {
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
//firebase
const handleFile=()=>{
  const file = fileList[0];
  const fileName = file.name;
  console.log(file);
  if (!file) return;
  const storageRef = ref(storage, `files/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          localStorage.setItem('file',imgUrl);
          alert(downloadURL);
        });
      })
 


}
// console.log(imgUrl);




  //drag-drop
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };
  console.log(fileList[0]);
  return (
    <div className="create_form upload">
      <div>
        <h2>Upload Assignment</h2>
      </div>
      <form>
        <div className="row">
          <label className="create_label">Assignment Number:</label>
          <div className="col-md-5 col-sm-12 outer_create">
            <input
              id="assignment_number"
              name="assignment_number"
              type="number"
              className="create_input"
              placeholder="Assignment Number"
            />
            <span class="focus-border">
              <i></i>
            </span>
          </div>

          <label className="create_label">Title:</label>
          <div className=" col-md-5 col-sm-12 outer_create">
            <input
              id="assignment_title"
              name="assignment_title"
              type="text"
              className="create_input"
              placeholder="Title"
            />
            <span class="focus-border">
              <i></i>
            </span>
          </div>
        </div>

        <div className="row">
          <label className="create_label">Assignment Desc:</label>
          <div className="col-md-5 col-sm-12 outer_create">
            <input
              id="assignment_desc"
              name="assignment_desc"
              type="text"
              className="create_input"
              placeholder="Assignment Description"
            />
            <span class="focus-border">
              <i></i>
            </span>
          </div>

          <label className="create_label">Subject:</label>
          <div className=" col-md-5 col-sm-12 outer_create">
            <input
              id="assignment_subject"
              name="assignment_subject"
              type="text"
              className="create_input"
              placeholder="Subject"
            />
            <span class="focus-border">
              <i></i>
            </span>
          </div>
        </div>

        <div className="row">
          <label className="create_label">Assignment Due Date:</label>
          <div className="col-md-5 col-sm-12 outer_create">
            <input
              id="assignment_due_date"
              name="assignment_number"
              type="date"
              className="create_input"
              placeholder="Assignment Number"
            />
            <span class="focus-border">
              <i></i>
            </span>
          </div>

          <div>
            <div
              ref={wrapperRef}
              className="drop-file-input"
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <div className="drop-file-input__label">
                <img src={uploadImg} alt="" />
                <p>Drag & Drop your files here</p>
              </div>
              <input type="file" value="" onChange={onFileDrop} />
              
            </div>
            {fileList.length > 0 ? (
              <div className="drop-file-preview">
                <p className="drop-file-preview__title">Ready to upload</p>
                {fileList.map((item, index) => (
                  <div key={index} className="drop-file-preview__item">
                    <img
                      src={
                        ImageConfig[item.type.split("/")[1]] ||
                        ImageConfig["default"]
                      }
                      alt=""
                    />
                    <div className="drop-file-preview__item__info">
                      <p>{item.name}</p>
                      <p>{item.size}B</p>
                    </div>
                    <span
                      className="drop-file-preview__item__del"
                      onClick={() => fileRemove(item)}
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <button type="submit" className="btn-primary w-80 ass-sub btn-lg" onClick={handleFile}>
          Create
        </button>
      </form>
    </div>
  );
};

export default AssignmentUploadContent;
