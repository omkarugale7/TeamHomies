package com.example.gurukul.view.activities
import android.content.Intent
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.R
import com.example.gurukul.databinding.ActivityLogInBinding
import com.example.gurukul.utils.Constants
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

        _binding.btnLoginAsGuest.setOnClickListener {
            Intent(this, HomeActivity::class.java).also {
                startActivity(it)
            }
        }

        _binding.tvForgotPassword.setOnClickListener {
            Intent(this, ForgotPassword::class.java).also {
                startActivity(it)
            }
        }

    }

    override fun onResume() {

        val pref  = this.getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)

        //showProgressDialog("Please Wait...")

        val username = pref.getString(Constants.LOGGED_IN_USERNAME, "")
        val password = pref.getString(Constants.LOGGED_IN_PASSWORD, "")

        super.onResume()
//        if (!username.isNullOrEmpty() && !password.isNullOrEmpty()){
//            Intent(this, HomeActivity::class.java).also {it1 ->
//                startActivity(it1)
//                this.finish()
//                return
//            }
//        }

        val verifyTokenURL = "https://wcegurukul.herokuapp.com/login"

        val jsonBodyObject = JSONObject()
        jsonBodyObject.put(Constants.LOGGED_IN_USERNAME, username)
        jsonBodyObject.put(Constants.LOGGED_IN_PASSWORD, password)

        val stringBodyObject = jsonBodyObject.toString()

        val sr : StringRequest = object : StringRequest(
            Method.POST, verifyTokenURL,
            {
                hideProgressDialog()

                Log.d("TAG", it)

                val jsonObject = JSONObject(it)

                val userObj = jsonObject.getJSONObject("user")

                val sem = userObj.getInt("semester")

                val editor = pref.edit()

                editor.putInt(Constants.LOGGED_IN_USER_SEM, sem)

                editor.apply()

                Intent(this, HomeActivity::class.java).also {it1 ->
                    startActivity(it1)
                    this.finish()
                }

            },
            {
                hideProgressDialog()
                val resp = it.networkResponse
                if (resp == null) {
                    showSnackBar("Check your Internet Connection!", true)
                } else {
                    val err = String(resp.data)
                    Log.d("Network Response", err)
                    val respJO: JSONObject = JSONObject(err)
                    showSnackBar(respJO.getString("message"), true)
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
        //requestQueue.add(sr)

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

                    val userObj = jsonObject.getJSONObject("user")

                    val sem = userObj.getInt("semester")



                    Log.e("TAG", it)

                    val pref = this.getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)

                    val editor = pref.edit()
                    editor.putString(Constants.LOGGED_IN_USERNAME, prn)
                    editor.putString(Constants.LOGGED_IN_PASSWORD, password)
                    editor.putInt(Constants.LOGGED_IN_USER_SEM, sem)

                    editor.apply()

                    Intent(this, HomeActivity::class.java).also { it1 ->
                        startActivity(it1)
                        this.finish()
                    }

                },
                {
                    hideProgressDialog()

                    val resp = it.networkResponse

                    if (resp == null){
                        showSnackBar("Check your Internet Connection", true)
                    } else {
                        val err = String(resp.data)
                        Log.d("Network Response", err)
                        val respJO: JSONObject = JSONObject(err)
                        showSnackBar(respJO.getString("message"), true)
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