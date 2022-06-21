package com.example.gurukul.view.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.R
import com.example.gurukul.adapters.AssignmentsSubjectAdapter
import com.example.gurukul.adapters.NotesSubjectAdapter
import com.example.gurukul.databinding.ActivityAssignmentsListBinding
import com.example.gurukul.databinding.ActivityAssignmentsSubjectsBinding
import com.example.gurukul.models.NotesSubject
import com.example.gurukul.utils.Constants
import org.json.JSONObject

class AssignmentsSubjectsActivity : BaseActivity() {


    lateinit var _binding : ActivityAssignmentsSubjectsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityAssignmentsSubjectsBinding.inflate(layoutInflater)

        _binding.btnBackArrow.setOnClickListener {
            onBackPressed()
        }

        supportActionBar!!.hide()

        setContentView(_binding.root)

        getNotesSubject()

    }


    private fun getNotesSubject()
    {
        var getSubjectsURL = "https://wcegurukul.herokuapp.com/subjectList"

        showProgressDialog("Please Wait...")

        val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
        val semester = pref.getInt("semester", 0)


        getSubjectsURL += "?semester=$semester"

        Log.d("Semester", semester.toString())

        val sr  = StringRequest(Request.Method.GET, getSubjectsURL, {
            hideProgressDialog()

            val jsonObject = JSONObject(it)
            Log.d("SUCCESS", it)

            val subjJsonArr = jsonObject.getJSONArray("data")

            Log.d("First Subject", subjJsonArr[0].toString())

            val subjArr = ArrayList<NotesSubject>()

            for (i in 0 until subjJsonArr.length())
            {
                val subj = subjJsonArr[i] as JSONObject
                subjArr.add(NotesSubject(subj.getString("name"), subj.getString("code"), subj.getString("teacher")))
            }

            val adapter = AssignmentsSubjectAdapter(this, subjArr)
            _binding.rvSubjects.adapter = adapter
            _binding.rvSubjects.layoutManager = LinearLayoutManager(this)

        }, {
            hideProgressDialog()
        })

        val requestQueue = Volley.newRequestQueue(this)
        requestQueue.add(sr)

    }

}