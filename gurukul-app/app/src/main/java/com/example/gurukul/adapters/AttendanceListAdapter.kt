package com.example.gurukul.adapters

import android.content.Intent
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.example.gurukul.R
import com.example.gurukul.databinding.ItemAttendanceLayoutBinding
import com.example.gurukul.models.AttendanceSession
import com.example.gurukul.view.activities.AttendanceListActivity
import com.example.gurukul.view.activities.AttendanceSubjectsActivity
import com.example.gurukul.view.activities.MarkAttendanceActivity

class AttendanceListAdapter (val activity: AttendanceListActivity,
                             val attendanceArr: ArrayList<AttendanceSession>
                             ) :
    RecyclerView.Adapter<AttendanceListAdapter.AttendanceListViewHolder>()
{
    class AttendanceListViewHolder(_binding : ItemAttendanceLayoutBinding) : RecyclerView.ViewHolder(_binding.root){
        val cardView = _binding.cardViewNotes
        val tvAttendanceDate = _binding.tvAttendanceDate
        val tvSubject = _binding.tvSessionSubject
        val tvTeacher = _binding.tvSessionTeacher
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AttendanceListViewHolder {
        val binding = ItemAttendanceLayoutBinding.inflate(activity.layoutInflater)
        return AttendanceListViewHolder(binding)
    }

    override fun onBindViewHolder(holder: AttendanceListViewHolder, position: Int) {
        val model = attendanceArr[position]

        if (model.present){
            holder.cardView.backgroundTintList = activity.resources.getColorStateList(android.R.color.holo_green_dark)
            holder.tvSubject.setTextColor(activity.resources.getColor(R.color.text_color_primary))
            holder.tvTeacher.setTextColor(activity.resources.getColor(R.color.text_color_primary))
        } else if (!model.session_state){
            Toast.makeText(activity, "Session ended", Toast.LENGTH_LONG).show()
            holder.cardView.backgroundTintList = activity.resources.getColorStateList(android.R.color.holo_red_light)
            holder.tvSubject.setTextColor(activity.resources.getColor(R.color.text_color_primary))
            holder.tvTeacher.setTextColor(activity.resources.getColor(R.color.text_color_primary))
        }

        holder.tvSubject.text = model.session_subject_code
        holder.tvAttendanceDate.text = model.session_date
        holder.tvTeacher.text = model.session_teacher


        holder.itemView.setOnClickListener {
            if (model.present) {
                activity.showSnackBar("Already marked the attendance", false)
            } else if (!model.session_state){
                activity.showSnackBar("You are marked absent", true)
            } else{
                Intent(activity, MarkAttendanceActivity::class.java).also {
                    it.putExtra("password", model.session_password)
                    it.putExtra("latitude", model.session_latitude)
                    it.putExtra("longitude", model.String_longitude)
                    it.putExtra("_id", model.id)
                    activity.startActivity(it)
                }
            }
        }

    }

    override fun getItemCount(): Int = attendanceArr.size
}