package com.example.gurukul.view.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.gurukul.R
import com.example.gurukul.databinding.ActivityForgotPasswordBinding

class ForgotPassword : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val _binding = ActivityForgotPasswordBinding.inflate(layoutInflater)

        supportActionBar!!.hide()


        _binding.btnContinue.setOnClickListener {
            val email = _binding.etEmail.text.toString()
            val prn = _binding.etPrn.text.toString()
            if (email.isNotEmpty() && prn.isNotEmpty()) {



                Intent(this, VerifyEmailActivity::class.java).also {
                    it.putExtra("title", "You can now reset your Password")
                    it.putExtra(
                        "desc",
                        "A link has been sent to your email address to reset the password"
                    )
                    startActivity(it)
                    this.finish()
                }
            }
        }

        setContentView(_binding.root)
    }
}