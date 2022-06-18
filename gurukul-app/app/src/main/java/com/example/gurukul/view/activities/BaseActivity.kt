package com.example.gurukul.view.activities

import android.R
import android.graphics.Color
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.google.android.material.snackbar.Snackbar

open class BaseActivity : AppCompatActivity() {

    fun setSimpleSpinner(spinner: Spinner, itemsArray: ArrayList<String>){
        val adapter = ArrayAdapter(this, R.layout.simple_spinner_dropdown_item, itemsArray)
        spinner.adapter = adapter
    }

    fun showSnackBar(message: String, errorMessage: Boolean)
    {
        val snackBar = Snackbar.make(findViewById(android.R.id.content), message, Snackbar.LENGTH_LONG)

        val snackBarView = snackBar.view

        if (errorMessage){
            snackBarView.setBackgroundColor(ContextCompat.getColor(this,
                R.color.holo_red_dark
            ))
        }
        else {
            snackBarView.setBackgroundColor(ContextCompat.getColor(this,
                R.color.holo_green_dark
            ))
        }
        snackBar.show()
    }






}