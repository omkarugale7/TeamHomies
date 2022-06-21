package com.example.gurukul.view.activities

import android.content.Intent
import android.os.Bundle
import android.os.Parcelable
import android.util.Log
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.adapters.AssignmentsListAdapter
import com.example.gurukul.adapters.NotesListAdapter
import com.example.gurukul.databinding.ActivityAssignmentsListBinding
import com.example.gurukul.models.Assignment
import com.example.gurukul.models.Notes
import com.example.gurukul.utils.Constants
import org.json.JSONObject

class AssignmentsListActivity : BaseActivity() {

    lateinit var _binding : ActivityAssignmentsListBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityAssignmentsListBinding.inflate(layoutInflater)

        _binding.btnBackArrow.setOnClickListener {
            onBackPressed()
        }

        setContentView(_binding.root)

        supportActionBar!!.hide()

        getNotesList()

    }

    fun goToUploadAssignment(assignment : Assignment)
    {
        Intent(this, AssignmentUploadActivity::class.java).also {
            it.putExtra("assignmentInfo", assignment)
            startActivity(it)
        }
    }


    private fun getNotesList()
    {
        var getAssignmentsURL = "https://wcegurukul.herokuapp.com/getAssignments"

        showProgressDialog("Please Wait...")

        val subjectCode = intent.getStringExtra("subjectCode")

        getAssignmentsURL += "?subject=${subjectCode}"


        val sr  = StringRequest(Request.Method.GET, getAssignmentsURL, {
            hideProgressDialog()

            val jsonObject = JSONObject(it)
            Log.d("SUCCESS", it)

            val assignmentsJsonArr = jsonObject.getJSONArray("data")
            val assignmentsArr = ArrayList<Assignment>()

            for (i in 0 until assignmentsJsonArr.length())
            {
                val obj = assignmentsJsonArr[i] as JSONObject

                var file  = ""
                if (obj.has("assignment_file")){
                    file = obj.getString("assignment_file")
                }

                val jsonArr = obj.getJSONArray("students_submitted")

                var uploadedFile = ""

                val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
                val username = pref.getString(Constants.LOGGED_IN_USERNAME, "")

                for (ii in 0 until jsonArr.length())
                {
                    val jsonObj = jsonArr[ii] as JSONObject
                    if (jsonObj.getString("username") == username){
                        uploadedFile = jsonObj.getString("file")
                        break
                    }
                }

                assignmentsArr.add(
                    Assignment(
                        obj.getString("_id"),
                        obj.getString("assignment_date"),
                        obj.getString("assignment_due_date"),
                        obj.getString("assignment_due_time"),
                        obj.getString("assignment_teacher"),
                        obj.getString("assignment_title"),
                        obj.getString("assignment_desc"),
                        obj.getString("assignment_subject"),
                        obj.getString("assignment_subject_name"),
                        obj.getInt("assignment_number"),
                        file,
                        uploadedFile
                    ))
            }

            val adapter = AssignmentsListAdapter(this, assignmentsArr)
            _binding.rvAssignments.adapter = adapter
            _binding.rvAssignments.layoutManager = LinearLayoutManager(this)


        }, {
            hideProgressDialog()
            Log.d("ERROR" , it.networkResponse.data.toString())
            Toast.makeText(this, "Please try again!", Toast.LENGTH_LONG).show()
            finish()
        })

        val requestQueue = Volley.newRequestQueue(this)
        requestQueue.add(sr)
    }


}