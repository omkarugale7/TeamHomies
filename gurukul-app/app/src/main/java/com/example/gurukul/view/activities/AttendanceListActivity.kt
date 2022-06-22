package com.example.gurukul.view.activities

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.adapters.AttendanceListAdapter
import com.example.gurukul.databinding.ActivityAssignmentsListBinding
import com.example.gurukul.databinding.ActivityAttendanceListBinding
import com.example.gurukul.models.AttendanceSession
import com.example.gurukul.utils.Constants
import org.json.JSONObject

class AttendanceListActivity : BaseActivity() {

    private lateinit var _binding: ActivityAttendanceListBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityAttendanceListBinding.inflate(layoutInflater)

        _binding.btnBackArrow.setOnClickListener {
            onBackPressed()
        }

        setContentView(_binding.root)

        supportActionBar!!.hide()

        getSessionList()

    }

    private fun getSessionList()
    {
        var getSessionsURL = "https://wcegurukul.herokuapp.com/sessionList"

        showProgressDialog("Please Wait...")

        val subjectCode = intent.getStringExtra("subjectCode")

        Log.d("SUBJECT CODE", subjectCode!!)



        val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)

        val token = pref.getString(Constants.JWT_TOKEN, "")!!
        val username = pref.getString(Constants.LOGGED_IN_USERNAME, "")!!

        getSessionsURL += "?subject=${subjectCode}&username=${username}"

        val sr : StringRequest = object : StringRequest(Method.GET, getSessionsURL, {
            hideProgressDialog()

            val jsonObject = JSONObject(it)

            val data = jsonObject.getJSONArray("data")

            var attendedSessions = 0
            var totalSessions = 0


            val sessionsArr = ArrayList<AttendanceSession>()

            for (i in 0 until data.length())
            {
                val session = data[i] as JSONObject

                totalSessions++ ;

                var present = false

                val students = session.getJSONArray("students_present")
                for (ii in 0 until students.length())
                {
                    val currUsername = students[ii]
                    if (username == currUsername){
                        present = true
                    }
                }

                if (present) attendedSessions++

                sessionsArr.add(AttendanceSession(
                    session.getString("_id"),
                    session.getString("session_date"),
                    session.getString("session_latitude"),
                    session.getString("session_longitude"),
                    session.getString("session_teacher"),
                    session.getString("session_subject"),
                    session.getString("session_password"),
                    session.getBoolean("session_state"),
                    present
                ))
            }

            if (totalSessions > 0) {

                val percentage = attendedSessions.toDouble() / totalSessions * 100

                _binding.tvPercentage.text = "Percentage = ${percentage}"
            } else {
                _binding.tvPercentage.visibility = View.INVISIBLE
            }

            _binding.rvAttendances.adapter = AttendanceListAdapter(this, sessionsArr)
            _binding.rvAttendances.layoutManager = LinearLayoutManager(this)

            Log.d("SUCCESS", it)


        }, {
            hideProgressDialog()
            Log.d("ERROR" , it.networkResponse.data.toString())
            Toast.makeText(this, "Please try again!", Toast.LENGTH_LONG).show()
            finish()
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