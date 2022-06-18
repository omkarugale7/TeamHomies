package com.example.gurukul.view.activities

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.*
import com.android.volley.Request
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

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _binding = ActivitySignUpBinding.inflate(layoutInflater)
        setContentView(_binding.root)

        val branchesSpinner = _binding.spinnerBranches
        val graduationYearSpinner = _binding.spinnerGraduationYear
        val branchesArray: ArrayList<String> = arrayListOf("CSE", "IT", "ELECTRONICS", "MECH", "ELECTRICAL", "CIVIL")
        val graduationYearArr : ArrayList<String> = ArrayList()

        for (year in Calendar.getInstance().get(Calendar.YEAR) + 4 downTo 1950){
            graduationYearArr.add(year.toString())
        }

        setSimpleSpinner(branchesSpinner, branchesArray)
        setSimpleSpinner(graduationYearSpinner, graduationYearArr)


        branchesSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                Toast.makeText(applicationContext, branchesArray[position], Toast.LENGTH_LONG).show()
                (parent?.getChildAt(0) as TextView).setTextColor(Color.parseColor("#758196"))
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
                Toast.makeText(applicationContext, graduationYearArr[position], Toast.LENGTH_LONG).show()
                (parent?.getChildAt(0) as TextView).setTextColor(Color.parseColor("#758196"))
                graduationYear = graduationYearArr[position].toInt()
            }
            override fun onNothingSelected(parent: AdapterView<*>?) {

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
            }
        }

    }


    private fun validateDetails(): Boolean
    {
        val email = _binding.etEmail.text.toString().trim().lowercase()
        val name = _binding.etName.text.toString().trim()
        val prn = _binding.etPrn.text.toString().trim().lowercase()
        val password = _binding.etPassword.text.toString().trim()

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
        }

        return true
    }


    private fun signUpUser()
    {

        if (validateDetails())
        {
            val registerUrl = "https://wcegurukul.herokuapp.com/register"

            val email = _binding.etEmail.text.toString().trim().lowercase()
            val name = _binding.etName.text.toString().trim()
            val prn = _binding.etPrn.text.toString().trim().lowercase()
            val password = _binding.etPassword.text.toString().trim()


            //Toast.makeText(this, branch + "  " + graduationYear, Toast.LENGTH_LONG).show()

            val jsonBodyObject = JSONObject()

            jsonBodyObject.put("email", email)
            jsonBodyObject.put("name", name)
            jsonBodyObject.put("prn", prn)
            jsonBodyObject.put("username", prn)
            jsonBodyObject.put("branch", branch)
            jsonBodyObject.put("graduation_year", graduationYear)
            jsonBodyObject.put("password", password)

            val stringBodyObject = jsonBodyObject.toString()

            val sr : StringRequest = object : StringRequest(Method.POST, registerUrl, {
                        Toast.makeText(this, "Success", Toast.LENGTH_LONG).show()
            }, {
                    //Toast.makeText(this, it.message, Toast.LENGTH_LONG).show()
            }) {

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











//override fun getHeaders(): Map<String, String> {
//    val params: MutableMap<String, String> = HashMap()
//    val email = _binding.etEmail.text.toString().trim().lowercase()
//    val name = _binding.etName.text.toString().trim()
//    val prn = _binding.etPrn.text.toString().trim().lowercase()
//    val password = _binding.etPassword.text.toString().trim()
//
//    Log.e("PASSWORD", password)
//
////                    Toast.makeText(applicationContext, email + " "
////                            + prn +  " " + name+ " " + branch + " " + graduationYear + password,
////                        Toast.LENGTH_LONG).show()
//
//    params["username"] = prn
//    params["prn"] = prn
//    params["email"] = email
//    params["name"] = name
//    params["password"] = password
//    params["branch"] = branch
//    params["graduation_year"] = graduationYear.toString()
//    return params








}