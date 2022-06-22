import React from 'react'

function NoticeOptions() {
    const change=()=>{
        window.location.href='/createNotice'
      }
      const change1=()=>{
        window.location.href='/noticeDelete';
      }
  return (
    <div className='container subject_btn '>
      <div className='sub_assignment btn-border-4 btn_cre '  onClick={change}>
        <a href='/createNotice' className='btn_link '>
          <h2>Create Notice</h2>
        </a>
      </div>
      <div className='sub_notes btn-border-4 btn_del' onClick={change1}>
        <a href='' className='btn_link'>
        <h2>Delete Notice</h2>
        </a>
      </div>
    </div>
  )
}

export default NoticeOptions