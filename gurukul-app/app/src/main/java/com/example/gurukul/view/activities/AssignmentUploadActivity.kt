package com.example.gurukul.view.activities

import android.app.AlertDialog
import android.app.Dialog
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.transition.Visibility
import android.util.Log
import android.view.View
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.R
import com.example.gurukul.databinding.ActivityAssignmentUploadBinding
import com.example.gurukul.databinding.ActivityAssignmentsSubjectsBinding
import com.example.gurukul.models.Assignment
import com.example.gurukul.utils.Constants
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.FirebaseStorage
import org.json.JSONObject
import java.util.HashMap

class AssignmentUploadActivity : BaseActivity() {

    private lateinit var _binding : ActivityAssignmentUploadBinding

    var uri : Uri? = null
    var pdfURL = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityAssignmentUploadBinding.inflate(layoutInflater)

        setContentView(_binding.root)

        val assignmentInfo = intent.getParcelableExtra<Assignment>("assignmentInfo")!!

        _binding.tvSubject.text = assignmentInfo.subject
        _binding.tvAssignmentName.text = "Assignment ${assignmentInfo.assignmentNum} : ${assignmentInfo.assignmentTitle}"
        _binding.tvDesc.text = assignmentInfo.assignmentDesc
        _binding.tvDueDate.text = assignmentInfo.due_date

        val currTime = System.currentTimeMillis()


        val fileLink = assignmentInfo.file_link
        if (fileLink.isEmpty()) {
            _binding.ivViewAssignmentPdf.visibility = View.GONE
        } else {
            _binding.ivViewAssignmentPdf.setOnClickListener {
                val intent = Intent(Intent.ACTION_VIEW)
                intent.data = Uri.parse(fileLink)
                startActivity(intent)
            }
        }

        // if already uploaded assignment
        if (assignmentInfo.uploadedFile != ""){


            showSnackBar("Already Submitted Assignment", false)

            _binding.llViewUserSubmission.setOnClickListener {

                val intent = Intent(Intent.ACTION_VIEW)

                intent.data = Uri.parse(assignmentInfo.uploadedFile)

                startActivity(intent)

            }


            _binding.ivDeleteAssignment.setOnClickListener {


                val dialogBuilder = AlertDialog.Builder(this)
                dialogBuilder.setTitle("Delete Assignment")
                dialogBuilder.setMessage("Are you sure?")
                dialogBuilder.setIcon(R.drawable.delete_icon)
                dialogBuilder.setPositiveButton("Yes"){_, _ ->

                    var deleteAssignmentURL = "https://wcegurukul.herokuapp.com/deleteAssignment"

                    val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
                    val username = pref.getString(Constants.LOGGED_IN_USERNAME, "")

                    val _id = assignmentInfo.assignmentID

                    deleteAssignmentURL += "?username=${username}&_id=${_id}"


                    val sr = StringRequest(Request.Method.DELETE, deleteAssignmentURL, {
                        Toast.makeText(this, "Assignment Deleted Successfully!", Toast.LENGTH_LONG).show()
                        Intent(this, HomeActivity::class.java).also {
                            it.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
                            startActivity(it)
                        }
                    },{
                        Toast.makeText(this, "Failed", Toast.LENGTH_LONG).show()
                    })

                    val queue = Volley.newRequestQueue(this)
                    queue.add(sr)

                }

                dialogBuilder.setNegativeButton("No"){_, _ ->

                }

                val dialog = dialogBuilder.create()
                dialog.setCancelable(false)
                dialog.show()
            }

            _binding.clUserSubmissionDone.visibility = View.VISIBLE
            _binding.llUserSubmissionUploading.visibility = View.GONE


        }
        else if (currTime > assignmentInfo.due_time.toLong()){
            _binding.clUserSubmissionDone.visibility = View.GONE
            _binding.llUserSubmissionUploading.visibility = View.GONE
            showSnackBar("Assignment overdue", true)
        } else {
            Toast.makeText(this, "You haven't uploaded", Toast.LENGTH_LONG).show()

            _binding.clUserSubmissionDone.visibility = View.GONE
            _binding.llUserSubmissionUploading.visibility = View.VISIBLE

            _binding.ivSelectFile.setOnClickListener {
                val intent = Intent(Intent.ACTION_GET_CONTENT)
                intent.type = "application/pdf"
                startActivityForResult(intent, 1)
            }

            _binding.btnUploadFile.setOnClickListener {

                val ref = FirebaseStorage.getInstance()
                    .reference
                    .child(System.currentTimeMillis().toString() + ".pdf")

                if (uri != null)
                {
                    showProgressDialog("Please Wait...")
                    ref.putFile(uri!!).addOnSuccessListener {
                        it.metadata!!.reference!!.downloadUrl.addOnSuccessListener {url->
                            pdfURL = url!!.toString()
                            Log.d("PDF URL", pdfURL)

                            val registerUrl = "https://wcegurukul.herokuapp.com/uploadAssignment"

                            //Toast.makeText(this, branch + "  " + graduationYear, Toast.LENGTH_LONG).show()

                            val jsonBodyObject = JSONObject()

                            try {
                                val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
                                val username = pref.getString(Constants.LOGGED_IN_USERNAME, "")
                                jsonBodyObject.put("_id", assignmentInfo.assignmentID)
                                jsonBodyObject.put("file", pdfURL)
                                jsonBodyObject.put("username", username)
                            } catch (exception : Exception) {
                                exception.printStackTrace()
                            }

                            val stringBodyObject = jsonBodyObject.toString()

                            val sr : StringRequest = object : StringRequest(
                                Method.POST, registerUrl,
                                {
                                    hideProgressDialog()

                                    Toast.makeText(this, "Assignment Uploaded Successfully", Toast.LENGTH_LONG).show()

                                    Intent(this, HomeActivity::class.java).also {
                                        it.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
                                        startActivity(it)
                                    }

                                },
                                {
                                    hideProgressDialog()

                                    showSnackBar((it.toString()), true)

                                }
                            ){
                                override fun getHeaders(): MutableMap<String, String> {
                                    val headers = HashMap<String, String>()
                                    headers["Content-Type"] =  "application/json"
                                    return headers
                                }

                                override fun getBody(): ByteArray {
                                    return stringBodyObject.toByteArray()
                                }

                            }

                            val requestQueue = Volley.newRequestQueue(this)
                            requestQueue.add(sr)


                        }
                    }.addOnFailureListener{
                        hideProgressDialog()
                        Toast.makeText(this, it.message, Toast.LENGTH_LONG).show()
                    }
                } else{
                    Toast.makeText(this, "URI IS NULL", Toast.LENGTH_LONG).show()
                }
            }

        }
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == RESULT_OK && requestCode == 1)
        {
            //showProgressDialog("Please wait...")
            uri = data!!.data
            Log.d("URI", uri.toString())

            if (uri != null)
            {
                _binding.ivSelectFile.setImageResource(R.drawable.success_icon)
            }

        }
    }

}