package com.example.gurukul.models

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import org.json.JSONArray
import org.json.JSONObject

@Parcelize
data class Assignment(
    val assignmentID : String,
    val assign_date: String,
    val due_date : String,
    val due_time : String,
    val teacher : String,
    val assignmentTitle : String,
    val assignmentDesc : String,
    val subject_code : String,
    val subject : String,
    val assignmentNum : Int,
    val file_link : String = "",
    val uploadedFile : String
) : Parcelable
