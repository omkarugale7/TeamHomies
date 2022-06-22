package com.example.gurukul.models

data class AttendanceSession(
    val id : String,
    val session_date : String,
    val session_latitude : String,
    val String_longitude : String,
    val session_teacher : String,
    val session_subject_code : String,
    val session_password : String,
    val session_state : Boolean,
    val present : Boolean,
)