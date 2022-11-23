package com.example.gurukul.view.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.gurukul.R
import com.example.gurukul.databinding.ActivityGuestLoginBinding
import com.example.gurukul.utils.Constants

class GuestLogin : BaseActivity() {

    private lateinit var _binding : ActivityGuestLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityGuestLoginBinding.inflate(layoutInflater)

        setContentView(_binding.root)

        _binding.btnLogIn.setOnClickListener {
            logIn()
        }
    }

    private fun logIn()
    {
        val username = _binding.etUsername.text.toString()

        if (username.isEmpty()){
            showSnackBar("Please enter your username", true)
            return
        }

        val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)

        val editor = pref.edit()

        editor.clear()

        editor.putString(Constants.LOGGED_IN_USERNAME, username)
        editor.apply()

        Intent(this, HomeActivity::class.java).also {
            it.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(it)
            finish()
        }

    }

}