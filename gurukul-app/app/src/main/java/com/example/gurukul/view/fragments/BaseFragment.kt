package com.example.gurukul.view.fragments

import android.app.Dialog
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import com.example.gurukul.R
import com.example.gurukul.databinding.DialogWaitBinding
import com.google.android.material.snackbar.Snackbar


open class BaseFragment : Fragment() {

    lateinit var mProgressDialog : Dialog

    fun showProgressDialog(text: String)
    {
        mProgressDialog = Dialog(requireContext())

        val _binding = DialogWaitBinding.inflate(layoutInflater)

        mProgressDialog.setContentView(_binding.root)

        _binding.tvProgressText.text = text

        mProgressDialog.setCancelable(false)
        mProgressDialog.setCanceledOnTouchOutside(false)

        mProgressDialog.show()

    }

    fun hideProgressDialog()
    {
        mProgressDialog.dismiss()
    }

    fun showSnackBar(message: String, errorMessage: Boolean)
    {
        val snackBar = Snackbar.make(requireActivity().findViewById(android.R.id.content), message, Snackbar.LENGTH_LONG)

        val snackBarView = snackBar.view

        if (errorMessage){
            snackBarView.setBackgroundColor(
                ContextCompat.getColor(requireContext(),
                android.R.color.holo_red_dark
            ))
        }
        else {
            snackBarView.setBackgroundColor(
                ContextCompat.getColor(requireContext(),
                android.R.color.holo_green_dark
            ))
        }
        snackBar.show()
    }




    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_base, container, false)
    }


}