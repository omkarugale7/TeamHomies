package com.example.gurukul.view.activities

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.adapters.NotesListAdapter
import com.example.gurukul.databinding.ActivityNotesListBinding
import com.example.gurukul.models.Notes
import com.example.gurukul.utils.Constants
import org.json.JSONObject

open class NotesListActivity : BaseActivity() {

    lateinit var _binding : ActivityNotesListBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityNotesListBinding.inflate(layoutInflater)

        setContentView(_binding.root)

        supportActionBar!!.hide()

        getNotesList()

    }


    open fun openPdf(notes: Notes)
    {

//        Intent(this, PDFViewerActivity::class.java).also {
//            it.putExtra("url", notes.link)
//            startActivity(it)
//        }

        val intent = Intent(Intent.ACTION_VIEW)

        intent.data = Uri.parse(notes.link)

        startActivity(intent)

    }


    private fun getNotesList()
    {
        var getNotesURL = "https://wcegurukul.herokuapp.com/getNotes"

        showProgressDialog("Please Wait...")

        val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
        val semester = pref.getInt("semester", 0)

        val subjectCode = intent.getStringExtra("subjectCode")

        getNotesURL += "?semester=${semester}&subject=${subjectCode}"

        Log.d("Semester", semester.toString())

        val sr  = StringRequest(Request.Method.GET, getNotesURL, {
            hideProgressDialog()

            val jsonObject = JSONObject(it)
            Log.d("SUCCESS", it)

            val notesJsonArr = jsonObject.getJSONArray("data")
            val notesArr = ArrayList<Notes>()

            for (i in 0 until notesJsonArr.length())
            {
                val obj = notesJsonArr[i] as JSONObject

                notesArr.add(Notes(obj.getString("module_name"),
                    obj.getInt("module").toString(),
                    obj.getString("part"), obj.getString("file"),
                    obj.getString("subject")
                ))
            }

            val adapter = NotesListAdapter(this, notesArr)
            _binding.rvNotes.adapter = adapter
            _binding.rvNotes.layoutManager = LinearLayoutManager(this)

        }, {
            hideProgressDialog()
            Toast.makeText(this, "Please try again!", Toast.LENGTH_LONG).show()
            finish()
        })

        val requestQueue = Volley.newRequestQueue(this)
        requestQueue.add(sr)
    }

}