package com.example.gurukul.view.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.R
import com.example.gurukul.databinding.ActivityForgotPasswordBinding
import com.example.gurukul.utils.Constants
import org.json.JSONObject
import java.util.HashMap

class ForgotPassword : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val _binding = ActivityForgotPasswordBinding.inflate(layoutInflater)

        _binding.btnBackArrow.setOnClickListener {
            onBackPressed()
        }

        supportActionBar!!.hide()

        _binding.btnContinue.setOnClickListener {
            val email = _binding.etEmail.text.toString()
            val prn = _binding.etPrn.text.toString()
            if (email.isNotEmpty() && prn.isNotEmpty()) {

                val verifyTokenURL = "https://wcegurukul.herokuapp.com/forgotPassword"

                val jsonBodyObject = JSONObject()
                jsonBodyObject.put("email", email)

                val stringBodyObject = jsonBodyObject.toString()

                showProgressDialog("Please wait...")

                val sr = object : StringRequest(
                    Method.POST, verifyTokenURL,
                    {
                        hideProgressDialog()

                        Log.d("FORGOT PASS SUCCESS", it.toString())

                        Intent(this, VerifyEmailActivity::class.java).also {
                            it.putExtra("title", "You can now reset your Password")
                            it.putExtra(
                                "desc",
                                "A link has been sent to your email address to reset the password"
                            )
                            startActivity(it)
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
                    override fun getBody(): ByteArray {
                        return stringBodyObject.toByteArray()
                    }

                    override fun getHeaders(): MutableMap<String, String> {
                        val headers = HashMap<String, String>()
                        headers["Content-Type"] =  "application/json"
                        return headers
                    }

                }

                val q = Volley.newRequestQueue(this)
                q.add(sr)


            }
        }
        setContentView(_binding.root)
    }
}