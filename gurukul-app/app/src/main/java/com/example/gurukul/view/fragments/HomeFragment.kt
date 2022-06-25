package com.example.gurukul.view.fragments

import android.app.Dialog
import android.content.Context.MODE_PRIVATE
import android.content.Intent
import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.adapters.NoticeAdapter
import com.example.gurukul.databinding.DialogWaitBinding
import com.example.gurukul.databinding.FragmentHomeBinding
import com.example.gurukul.models.Notice
import com.example.gurukul.utils.Constants
import com.example.gurukul.view.activities.*
import org.json.JSONObject

class HomeFragment : BaseFragment() {


    private var _binding: FragmentHomeBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root


        _binding!!.cardNotes.setOnClickListener {
            Intent(requireContext(), NotesSubjectsActivity::class.java).also {
                startActivity(it)
            }
        }

        _binding!!.cardAssignments.setOnClickListener {
            Intent(requireContext(), AssignmentsSubjectsActivity::class.java).also {
                startActivity(it)
            }
        }

        _binding!!.cardAttendance.setOnClickListener {
            Intent(requireContext(), AttendanceSubjectsActivity::class.java).also {
                startActivity(it)
            }
        }

        _binding!!.cardDocuments.setOnClickListener {
            Intent(requireContext(), DocumentsListActivity::class.java).also {
                startActivity(it)
            }
        }

        val pref = requireActivity().getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)
        if (pref.getString(Constants.LOGGED_IN_PASSWORD, "") != "")
        getNotices()

        return root
    }

    private fun getNotices()
    {
        val notices = ArrayList<Notice>()

        //showProgressDialog("Please wait...")
        val getNoticesURL = "https://wcegurukul.herokuapp.com/getNotice"


        val pref = activity?.getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)!!

        val token = pref.getString(Constants.JWT_TOKEN, "")!!

        if (token.isEmpty()){
            Intent(requireContext(), LogInActivity::class.java).also {
                it.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                startActivity(it)
                return
            }
        }

        val sr : StringRequest = object: StringRequest(Request.Method.GET, getNoticesURL, {
            Log.d("NOTICES", it.toString())

            val jsonObj = JSONObject(it)
            val jsonArr = jsonObj.getJSONArray("data")

            for (i in 0 until jsonArr.length()){
                val obj = jsonArr[i] as JSONObject
                notices.add(Notice(obj.getString("title"), obj.getString("desc"), obj.getString("img")))
            }
            //hideProgressDialog()
            val adapter = NoticeAdapter(this, notices)
            _binding?.rvNotices?.adapter = adapter
            _binding?.rvNotices?.layoutManager = LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false)

        }, {
            //hideProgressDialog()
            Log.d("NO Notice fetched", it.toString())
        }){
            override fun getHeaders(): MutableMap<String, String> {
                val hm = HashMap<String, String>()
                hm["x-access-token"] = token
                return hm
            }
        }

        val queue = Volley.newRequestQueue(requireContext())
        queue.add(sr)

    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }







}