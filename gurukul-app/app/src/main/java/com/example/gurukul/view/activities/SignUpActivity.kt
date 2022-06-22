package com.example.gurukul.view.activities

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.*
import com.android.volley.NetworkResponse
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.VolleyError
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.databinding.ActivitySignUpBinding
import org.json.JSONObject
import java.util.*
import kotlin.collections.ArrayList

class SignUpActivity : BaseActivity() {

    private lateinit var _binding : ActivitySignUpBinding
    lateinit var branch : String
    var graduationYear : Int =  0
    var semester : Int = 0 ;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _binding = ActivitySignUpBinding.inflate(layoutInflater)
        setContentView(_binding.root)

        val branchesSpinner = _binding.spinnerBranches
        val graduationYearSpinner = _binding.spinnerGraduationYear
        val semestersSpinner = _binding.spinnerSemesters
        val branchesArray: ArrayList<String> = arrayListOf("CSE", "IT", "ELECTRONICS", "MECH", "ELECTRICAL", "CIVIL")
        val graduationYearArr : ArrayList<String> = ArrayList()
        val semestersArr = arrayListOf("1", "2", "3", "4", "5", "6", "7", "8")

        for (year in Calendar.getInstance().get(Calendar.YEAR) + 4 downTo 1950){
            graduationYearArr.add(year.toString())
        }

        setSimpleSpinner(branchesSpinner, branchesArray)
        setSimpleSpinner(graduationYearSpinner, graduationYearArr)
        setSimpleSpinner(semestersSpinner, semestersArr)

        branchesSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                //Toast.makeText(applicationContext, branchesArray[position], Toast.LENGTH_LONG).show()

                if (parent?.getChildAt(0) != null)
                (parent.getChildAt(0) as TextView).setTextColor(Color.parseColor("#758196"))
                branch = branchesArray[position]
            }
            override fun onNothingSelected(parent: AdapterView<*>?) {

            }
        }

        graduationYearSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                //Toast.makeText(applicationContext, graduationYearArr[position], Toast.LENGTH_LONG).show()
                if (parent?.getChildAt(0) != null)
                (parent.getChildAt(0) as TextView).setTextColor(Color.parseColor("#758196"))
                graduationYear = graduationYearArr[position].toInt()
            }
            override fun onNothingSelected(parent: AdapterView<*>?) {

            }
        }

        semestersSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                if (parent?.getChildAt(0) != null)
                    (parent.getChildAt(0) as TextView).setTextColor(Color.parseColor("#758196"))
                semester = semestersArr[position].toInt()
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                TODO("Not yet implemented")
            }

        }


        val actionBar = supportActionBar!!
        actionBar.hide()


        _binding.btnSignUp.setOnClickListener {
            signUpUser()
        }

        _binding.tvGoToLogIn.setOnClickListener {
            Intent(this, LogInActivity::class.java).also {
                startActivity(it)
                this.finish()
            }
        }

        _binding.btnBackArrow.setOnClickListener{
            onBackPressed()
        }

    }


    private fun validateDetails(): Boolean
    {
        val email = _binding.etEmail.text.toString().trim().lowercase()
        val name = _binding.etName.text.toString().trim()
        val prn = _binding.etPrn.text.toString().trim().lowercase()
        val password = _binding.etPassword.text.toString().trim()
        val mobile = _binding.etMobile.text.toString().trim()

        if (email.isEmpty()){
            showSnackBar("Please enter your email address to register", true)
            return false
        } else if (!email.endsWith("@walchandsangli.ac.in")){
            Toast.makeText(this, email, Toast.LENGTH_LONG).show()
            showSnackBar("Please enter valid email address with college domain", true)
            return false
        } else if (name.isEmpty()){
            showSnackBar("Please enter your name to register", true)
            return false
        } else if (prn.isEmpty()){
            showSnackBar("Please enter your prn to register", true)
            return false
        } else if (password.length < 8){
            showSnackBar("Please enter a password of at least 8 characters", true)
            return false
        } else if (mobile.length != 10){
            showSnackBar("Please enter a valid 10-digit mobile number", true)
        }

        return true
    }


    private fun signUpUser()
    {
        if (validateDetails())
        {

            showProgressDialog("Please wait...")

            val registerUrl = "https://wcegurukul.herokuapp.com/register"

            val email = _binding.etEmail.text.toString().trim().lowercase()
            val name = _binding.etName.text.toString().trim()
            val prn = _binding.etPrn.text.toString().trim().lowercase()
            val mobile = _binding.etMobile.text.toString().trim()
            val password = _binding.etPassword.text.toString().trim()

            //Toast.makeText(this, branch + "  " + graduationYear, Toast.LENGTH_LONG).show()

            val jsonBodyObject = JSONObject()

            try {
                jsonBodyObject.put("email", email)
                jsonBodyObject.put("name", name)
                jsonBodyObject.put("prn", prn)
                jsonBodyObject.put("username", prn)
                jsonBodyObject.put("branch", branch)
                jsonBodyObject.put("graduation_year", graduationYear)
                jsonBodyObject.put("password", password)
                jsonBodyObject.put("semester", semester)
                jsonBodyObject.put("phone", mobile)
            } catch (exception : Exception) {
                exception.printStackTrace()
            }

            val stringBodyObject = jsonBodyObject.toString()

            val sr : StringRequest = object : StringRequest(Method.POST, registerUrl,
                {
                    hideProgressDialog()
                    val jsonObject = JSONObject(it)

                    showSnackBar(jsonObject.getString("message"), false)
                    Log.e("Success", it)
                    Intent(this, VerifyEmailActivity::class.java).also {
                        it.putExtra("title", "Your account has been successfully created")
                        it.putExtra("desc", "Please verify you Email Address using the link sent on email")
                        startActivity(it)
                        this.finish()
                    }
                },
                {
                    hideProgressDialog()

                    val resp = it.networkResponse
                    if (resp == null){
                        showSnackBar(it.toString(), true)
                    } else {
                        val err = String(resp.data)
                        val respJO = JSONObject(err)

                        showSnackBar(respJO.getString("message"), true)

                        Log.d("Network Response", err)
                    }
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
    }

}