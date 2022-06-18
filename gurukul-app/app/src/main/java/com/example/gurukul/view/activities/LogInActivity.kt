package com.example.gurukul.view.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.R
import com.example.gurukul.databinding.ActivityLogInBinding
import org.json.JSONObject
import java.lang.Error
import java.util.HashMap

class LogInActivity : BaseActivity() {

    private lateinit var _binding : ActivityLogInBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityLogInBinding.inflate(layoutInflater)

        setContentView(_binding.root)

        val actionBar = supportActionBar!!
        actionBar.hide()

        _binding.tvGoToSignUp.setOnClickListener {
            Intent(this, SignUpActivity::class.java).also {
                startActivity(it)
            }
        }

        _binding.btnLogIn.setOnClickListener {
            logIn()
        }

    }

    private fun validateDetails() : Boolean{
        if (_binding.etPrn.text.trim().isEmpty()) {
            showSnackBar("Please, Enter valid registered PRN number", true)
            return false
        } else if (_binding.etPassword.text.isEmpty()){
            showSnackBar("Password should not be empty", true)
            return false
        }
        return true
    }


    private fun logIn(){

        if (validateDetails())
        {
            showProgressDialog("Please Wait...")
            val registerUrl = "https://wcegurukul.herokuapp.com/login"

            val prn = _binding.etPrn.text.toString().trim().lowercase()
            val password = _binding.etPassword.text.toString().trim()

            //Toast.makeText(this, branch + "  " + graduationYear, Toast.LENGTH_LONG).show()

            val jsonBodyObject = JSONObject()
            jsonBodyObject.put("username", prn)
            jsonBodyObject.put("password", password)

            val stringBodyObject = jsonBodyObject.toString()

            val sr : StringRequest = object : StringRequest(
                Method.POST, registerUrl,
                {
                    hideProgressDialog()
                    val jsonObject = JSONObject(it)

                    Log.e("TAG", it)

//                    if (jsonObject.getBoolean("verified")){
//                        showSnackBar("Successfully Logged In", false)
//                    } else{
//                        showSnackBar("Please verify your email address", true)
//                    }
                },
                {
                    hideProgressDialog()
                    showSnackBar(it.toString(), true)
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