package com.example.gurukul.view.activities

import android.os.Bundle
import android.util.Log
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.adapters.NotesSubjectAdapter
import com.example.gurukul.databinding.ActivityNotesSubjectsBinding
import com.example.gurukul.models.Subject
import com.example.gurukul.utils.Constants
import org.json.JSONObject

class NotesSubjectsActivity : BaseActivity() {

    lateinit var _binding : ActivityNotesSubjectsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityNotesSubjectsBinding.inflate(layoutInflater)

        supportActionBar!!.hide()

        _binding.btnBackArrow.setOnClickListener {
            onBackPressed()
        }

        setContentView(_binding.root)
        getNotesSubject()
    }


    private fun getNotesSubject()
    {
        var getSubjectsURL = "https://wcegurukul.herokuapp.com/subjectList"

        showProgressDialog("Please Wait...")

        val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
        val semester = pref.getInt("semester", 0)
        val token = pref.getString(Constants.JWT_TOKEN, "")!!


        getSubjectsURL += "?semester=$semester"

        Log.d("Semester", semester.toString())

        val sr : StringRequest = object : StringRequest(Request.Method.GET, getSubjectsURL, {
            hideProgressDialog()

            val jsonObject = JSONObject(it)
            Log.d("SUCCESS", it)

            val subjJsonArr = jsonObject.getJSONArray("data")

           // Log.d("First Subject", subjJsonArr[0].toString())

            val subjArr = ArrayList<Subject>()

            for (i in 0 until subjJsonArr.length())
            {
                val subj = subjJsonArr[i] as JSONObject
                subjArr.add(Subject(subj.getString("name"), subj.getString("code"), subj.getString("teacher")))
            }

            val adapter = NotesSubjectAdapter(this, subjArr)
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


//        val stringBodyObject = "$jsonBodyObject?"
//
//        val sr : StringRequest = object : StringRequest(
//            Method.GET, verifyTokenURL,
//            {
//                hideProgressDialog()
//
//                val notesSubjectArr = ArrayList<NotesSubject>()
//
//                val jsonObject = JSONObject(it)
//
//                val jsonArr = jsonObject.getJSONArray("data")
//
//                for (i in 0 until jsonArr.length())
//                {
//                    val jsonSubj = jsonArr.get(i)
//                    Log.d("Subject $i" , jsonSubj.toString())
//                    // TODO : Add subjects to the array
//                }
//
//                notesSubjectArr.add(NotesSubject("AMC", "5CS220", "KPK"))
//                notesSubjectArr.add(NotesSubject("CN", "5CS225", "PM"))
//                notesSubjectArr.add(NotesSubject("DBMS", "5CS222", "AU"))
//
//                val adapter = NotesSubjectAdapter(this, notesSubjectArr)
//                _binding.rvSubjects.layoutManager = LinearLayoutManager(this)
//                _binding.rvSubjects.adapter = adapter
//
//                Log.d("Subjects INFO", jsonObject.toString())
//
//            },
//            {
//                hideProgressDialog()
//                val resp = it.networkResponse
//                if (resp == null) {
//                    showSnackBar("Check your Internet Connection!", true)
//                } else {
//                    val err = String(resp.data)
//                    Log.d("Network Response", err)
//                    val respJO: JSONObject = JSONObject(err)
//                    showSnackBar(respJO.getString("message"), true)
//                }
//            }
//        ){
//            override fun getHeaders(): MutableMap<String, String> {
//                val headers = HashMap<String, String>()
//                headers["Content-Type"] =  "application/json"
//                return headers
//            }
//
//            override fun getBody(): ByteArray {
//                return stringBodyObject.toByteArray()
//            }
//        }
//