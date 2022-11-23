package com.example.gurukul.view.fragments

import android.content.Context.MODE_PRIVATE
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.gurukul.adapters.MessageAdapter

import com.example.gurukul.databinding.FragmentForumBinding
import com.example.gurukul.models.Message
import com.example.gurukul.utils.Constants
import org.json.JSONObject
import java.util.HashMap

class ForumFragment : BaseFragment() {

    private var _binding: FragmentForumBinding? = null


    var flag : Boolean = true
    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = FragmentForumBinding.inflate(inflater, container, false)
        val root: View = binding.root

        _binding!!.ivSendMessage.setOnClickListener{
                sendMessage()
        }

       start()


        return root
    }

    private fun start()
    {
        val handler = Handler(Looper.getMainLooper())
        handler.postDelayed({
            //Toast.makeText(requireContext(), "HAndler", Toast.LENGTH_SHORT).show()
            if (flag)
            getMessages()
            if (flag)
            start()
        }, 1000)
    }


    private fun sendMessage(){

        val message = _binding!!.etMessage.text.toString()

        if (message.isEmpty()){
            showSnackBar("message can not be empty", true)
            return
        }

        val url = "https://wcegurukul.herokuapp.com/send"

        val jsonObject = JSONObject()
        val pref = activity?.getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE)

        val username = pref?.getString(Constants.LOGGED_IN_USERNAME, "")

        jsonObject.put("username", username)
        jsonObject.put("message", message)

        val stringBodyObject = jsonObject.toString()


        val sr : StringRequest = object : StringRequest(Method.POST, url, {
            showSnackBar("Message sent successfully", false)
            //getMessages()
        },{
            showSnackBar("Message not sent", true)
            //getMessages()
        }){
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                headers["Content-Type"] =  "application/json"
                return headers
            }

            override fun getBody(): ByteArray {
                return stringBodyObject.toByteArray()
            }
        }


        val q = Volley.newRequestQueue(context)
        q.add(sr)

    }


    private fun getMessages(){
        val url = "https://wcegurukul.herokuapp.com/fetch"

        val sr = StringRequest(Request.Method.GET, url, {
            Log.d("Messages", it.toString())

            val jsonObject = JSONObject(it)

            val jsonArr = jsonObject.getJSONArray("data")

            val messagesArr = ArrayList<Message>()

            for (i in 0 until jsonArr.length())
            {
                val msg = jsonArr.get(i) as JSONObject

                messagesArr.add(
                    Message(
                        msg.getString("username"),
                        msg.getString("message"),
                        msg.getString("date")
                    )
                )
            }


             var flag = true
             var ll : RecyclerView.LayoutManager? = null


            if (_binding != null) {
                ll = _binding!!.rvMessages.layoutManager
            }
            if (ll != null) {

                val llm = ll as LinearLayoutManager
                val ele = llm.itemCount
                if (llm.findLastVisibleItemPosition() == ele-1 || llm.findLastVisibleItemPosition() == ele)
                {

                } else {
                    flag = false
                }
            }

            if (flag) {
                val adapter = MessageAdapter(messagesArr, activity)

                _binding!!.rvMessages.adapter = adapter

                val layoutManager = LinearLayoutManager(context)

                layoutManager.scrollToPosition(messagesArr.size - 1)
                _binding!!.rvMessages.layoutManager = layoutManager
            }

        },{
            showSnackBar("Error while loading messages", true)
        })


        val q = Volley.newRequestQueue(context)

        q.add(sr)

    }

    override fun onPause() {
        flag = false
        super.onPause()
    }

    override fun onStop() {
        flag = false
        super.onStop()
    }



    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}