package com.example.gurukul.view.activities

import android.os.Bundle
import android.util.Log
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.adapters.AssignmentsSubjectAdapter
import com.example.gurukul.adapters.AttendanceSubjectAdapter
import com.example.gurukul.databinding.ActivityAssignmentsSubjectsBinding
import com.example.gurukul.databinding.ActivityAttendanceSubjectsBinding
import com.example.gurukul.models.Subject
import com.example.gurukul.utils.Constants
import org.json.JSONObject

class AttendanceSubjectsActivity : BaseActivity() {

    private lateinit var _binding : ActivityAttendanceSubjectsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityAttendanceSubjectsBinding.inflate(layoutInflater)

        setContentView(_binding.root)

        _binding.btnBackArrow.setOnClickListener {
            onBackPressed()
        }

        supportActionBar!!.hide()

        getAttendanceSubjects()

    }


    private fun getAttendanceSubjects()
    {
        var getSubjectsURL = "https://wcegurukul.herokuapp.com/subjectList"

        showProgressDialog("Please Wait...")

        val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
        val semester = pref.getInt("semester", 0)
        val token = pref.getString(Constants.JWT_TOKEN, "")!!


        getSubjectsURL += "?semester=$semester"

        Log.d("Semester", semester.toString())

        val sr : StringRequest = object: StringRequest(Method.GET, getSubjectsURL, {
            hideProgressDialog()

            val jsonObject = JSONObject(it)
            Log.d("SUCCESS", it)

            val subjJsonArr = jsonObject.getJSONArray("data")

            //Log.d("First Subject", subjJsonArr[0].toString())

            val subjArr = ArrayList<Subject>()

            for (i in 0 until subjJsonArr.length())
            {
                val subj = subjJsonArr[i] as JSONObject
                subjArr.add(Subject(subj.getString("name"), subj.getString("code"), subj.getString("teacher")))
            }

            val adapter = AttendanceSubjectAdapter(this, subjArr)
            _binding.rvSubjects.adapter = adapter
            _binding.rvSubjects.layoutManager = LinearLayoutManager(this)

        }, {
            hideProgressDialog()
        }){
            override fun getHeaders(): MutableMap<String, String> {
                val hm = HashMap<String, String>()
                hm["x-access-token"] = token
                return hm
            }
        }

        val requestQueue = Volley.newRequestQueue(this)
        requestQueue.add(sr)

    }





}