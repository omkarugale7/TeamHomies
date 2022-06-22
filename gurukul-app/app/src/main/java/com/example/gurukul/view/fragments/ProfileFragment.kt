package com.example.gurukul.view.fragments

import android.content.Context.MODE_PRIVATE
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.gurukul.databinding.FragmentProfileBinding
import com.example.gurukul.utils.Constants
import com.example.gurukul.view.activities.LogInActivity

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val pref = requireActivity().getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)

        _binding!!.etName.setText(pref.getString(Constants.NAME, ""))
        _binding!!.etPrn.setText(pref.getString(Constants.LOGGED_IN_USERNAME, ""))
        _binding!!.etEmail.setText(pref.getString(Constants.EMAIL, ""))
        _binding!!.etMobile.setText(pref.getString(Constants.MOBILE, ""))
        _binding!!.etSemester.setText(pref.getString(Constants.SEMESTER, ""))
        _binding!!.etBranch.setText(pref.getString(Constants.BRANCH, ""))


        _binding!!.btnLogout.setOnClickListener {
            val editor = pref.edit()
            editor.clear()
            editor.apply()
            Intent(requireContext(), LogInActivity::class.java).also{
                it.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                startActivity(it)
            }
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}