import React from 'react'
import { useState,useRef } from "react";
import  Storage from "../../Admin/Firebase.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
function UploadImage() {
    const inputRef = useRef();
    const [progress, setProgress] = useState(0);
	const [progressShow, setProgressShow] = useState(false);
    
    const handleUpload = (e) => {
        e.preventDefault();
		setProgressShow(true);
        console.log(e.target.files[0].name);
		const fileName =e.target.files[0].name;
        
		const storageRef = ref(
			Storage,
			 `/image/${fileName}` 
		);
		const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploaded = Math.floor(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(uploaded);
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					localStorage.setItem('img',url);
                    console.log(localStorage.getItem('img'));
				});
			}
		);
	};


  return (
	  <div>
		  <label className="create_label">Image:</label>
	<div className='outer_create w-100'>
		
       <input
				type="file"
				ref={inputRef}
				// vlaue={value}
                onChange={(e)=>{
                    handleUpload(e);
                }}
                className='create_input w-100'
			/>
			<span class="focus-border">
            <i></i>
          </span>
            {progressShow && progress <= 100 && (
				<div>
					<p>{progress}%</p>
				</div>
			)}
    </div>
	</div>
  )
}

export default UploadImage