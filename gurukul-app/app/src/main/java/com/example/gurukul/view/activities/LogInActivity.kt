package com.example.gurukul.view.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.gurukul.R
import com.example.gurukul.databinding.ActivityLogInBinding

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

    fun validateDetails() : Boolean{
        if (_binding.etPrn.text.trim().isEmpty()) {
            showSnackBar("Please, Enter valid registered PRN number", true)
            return false
        } else if (_binding.etPassword.text.length < 8){
            showSnackBar("Please, Enter correct Password", true)
            return false
        }

        return true
    }


    fun logIn(){

    }

}