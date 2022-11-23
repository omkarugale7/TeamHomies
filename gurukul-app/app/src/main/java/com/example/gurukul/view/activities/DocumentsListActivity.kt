package com.example.gurukul.view.activities

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.adapters.NotesListAdapter
import com.example.gurukul.databinding.ActivityDocumentsListBinding
import com.example.gurukul.models.Notes
import com.example.gurukul.utils.Constants
import org.json.JSONObject

class DocumentsListActivity : BaseActivity() {


    private lateinit var _binding: ActivityDocumentsListBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityDocumentsListBinding.inflate(layoutInflater)

        setContentView(_binding.root)

        supportActionBar!!.hide()

        getDocumentsList()

    }


    private fun getDocumentsList()
    {
        var getNotesURL = "https://wcegurukul.herokuapp.com/getDocuments"

        showProgressDialog("Please Wait...")

        val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
        val semester = pref.getInt("semester", 0)
        val token = pref.getString(Constants.JWT_TOKEN, "")!!

        val username = pref.getString(Constants.LOGGED_IN_USERNAME, "")

        getNotesURL += "?username=${username}"

        Log.d("Semester", semester.toString())

        val sr : StringRequest = object : StringRequest(Request.Method.GET, getNotesURL, {
            hideProgressDialog()

            val jsonObject = JSONObject(it)
            Log.d("SUCCESS", it)


        }, {
            hideProgressDialog()
            Toast.makeText(this, "Please try again!", Toast.LENGTH_LONG).show()
            finish()
        }){
            override fun getHeaders(): MutableMap<String, String> {
                val hm = HashMap<String, String>()
               // hm["x-access-token"] = token
                return hm
            }
        }

        val requestQueue = Volley.newRequestQueue(this)
        requestQueue.add(sr)
    }




}