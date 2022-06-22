package com.example.gurukul.adapters

import android.app.Activity
import android.content.Intent
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.gurukul.databinding.ItemNotesSubjectLayoutBinding
import com.example.gurukul.models.Subject
import com.example.gurukul.view.activities.AssignmentsListActivity
import com.example.gurukul.view.activities.AttendanceListActivity

class AssignmentsSubjectAdapter(private val activity : Activity, private val subjects_array : ArrayList<Subject>) : RecyclerView.Adapter<AssignmentsSubjectAdapter.AssignmentsSubjectViewHolder>(){
    class AssignmentsSubjectViewHolder(_binding: ItemNotesSubjectLayoutBinding) : RecyclerView.ViewHolder(_binding.root)
    {
        val tvSubjectTitle = _binding.tvSubjectTitle
        val tvSubjectCode = _binding.tvSubjectCode
        val tvSubjectTeacher = _binding.tvSubjectTeacher
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AssignmentsSubjectViewHolder{
        val binding = ItemNotesSubjectLayoutBinding.inflate(activity.layoutInflater, parent, false)

        return AssignmentsSubjectViewHolder(binding)
    }

    override fun onBindViewHolder(holder: AssignmentsSubjectViewHolder, position: Int) {
        val model = subjects_array[position]
        holder.tvSubjectTitle.text = model.subjectName
        holder.tvSubjectCode.text = model.subjectCode
        holder.tvSubjectTeacher.text = model.subjectTeacher


        holder.itemView.setOnClickListener {
            Intent(activity, AssignmentsListActivity::class.java).also {
                it.putExtra("subjectCode", model.subjectCode)
                activity.startActivity(it)
            }
        }

    }

    override fun getItemCount(): Int {
        return subjects_array.size
    }

}