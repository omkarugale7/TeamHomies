import React from 'react'
const change=()=>{
  window.location.href='/adminAssignment'
}
const change1=()=>{
  window.location.href='/adminNotes';
}
function SubjectContent() {
  return (
    <div className='container subject_btn '>
      <div className='sub_assignment btn-border-4 btn_cre '  onClick={change}>
        <a href='/adminAssignment' className='btn_link '>
          <h2>Assignments</h2>
        </a>
      </div>
      <div className='sub_notes btn-border-4 btn_del' onClick={change1}>
        <a href='' className='btn_link'>
        <h2>Notes</h2>
        </a>
      </div>
    </div>
  )
}

export default SubjectContent