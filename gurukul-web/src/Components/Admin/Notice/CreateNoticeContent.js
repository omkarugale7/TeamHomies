import React from 'react'
import { useState, useRef } from "react";
import "../Courses/DropDown/DropDown.css";
import { ImageConfig } from "../Courses/config/ImageConfig";
import uploadImg from "../../Images/cloud-upload-regular-240.png";
import './Notice.css';
function CreateNoticeContent(props) {


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

  return (
    <div className="create_form upload">
    <div>
      <h2>Upload Notice</h2>
    </div>
    <form>
      <div className="row">
        <label className="create_label">Title:</label>
        <div className=" col-md-5 col-sm-12 outer_create">
          <input
            id="title"
            name="title"
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
        <label className="create_label"> Description:</label>
        <div className="col-md-5 col-sm-12 outer_create">
          <input
            id="desc"
            name="desc"
            type="text"
            className="create_input"
            placeholder="Description"
          />
          <span class="focus-border">
            <i></i>
          </span>
        </div>

      </div>

      <div className="row">

        <div>
          <div
            ref={wrapperRef}
            className="drop-file-input left-move"
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
      <button type="submit" className="btn-primary w-80 ass-sub btn-lg" >
        Create
      </button>
    </form>
  </div>
  )
}

export default CreateNoticeContent