package com.example.gurukul.view.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.gurukul.R
import com.example.gurukul.databinding.ActivityVerifyEmailBinding

class VerifyEmailActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val _binding = ActivityVerifyEmailBinding.inflate(layoutInflater)

        val intent = intent

        val title = intent.getStringExtra("title")
        val desc = intent.getStringExtra("desc")

        _binding.tvDesc.text = desc
        _binding.tvTitle.text = title

        setContentView(_binding.root)
        _binding.btnGoToLogIn.setOnClickListener {
            Intent(this, LogInActivity::class.java).also {
                startActivity(it)
                this.finish()
            }
        }
    }
}