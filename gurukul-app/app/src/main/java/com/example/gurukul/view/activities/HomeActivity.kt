package com.example.gurukul.view.activities

import android.os.Bundle
import android.view.View
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.os.bundleOf
import androidx.navigation.NavOptions
import androidx.navigation.Navigation
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.example.gurukul.R
import com.example.gurukul.databinding.ActivityHomeBinding
import com.example.gurukul.utils.Constants

class HomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityHomeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navView: BottomNavigationView = binding.navView

        val navController = findNavController(R.id.nav_host_fragment_activity_home)

        val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
        if (pref.getString(Constants.LOGGED_IN_PASSWORD, "") == "") {
            navController.setGraph(R.navigation.mobile_navigation2)
            navView.visibility = View.GONE
        } else navController.setGraph(R.navigation.mobile_navigation)

        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_home, R.id.navigation_forum, R.id.navigation_profile
            )
        )

        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

        supportActionBar!!.hide()


    }

    override fun onDestroy() {
        val pref = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
        if (pref.getString(Constants.LOGGED_IN_PASSWORD, "") == ""){
            pref.edit().clear().apply()
        }
        super.onDestroy()
    }

}