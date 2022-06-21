package com.example.gurukul.adapters

import android.app.Activity
import android.content.Intent
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.gurukul.R
import com.example.gurukul.databinding.ItemAssigmentLayoutBinding
import com.example.gurukul.databinding.ItemNotesBinding
import com.example.gurukul.models.Assignment
import com.example.gurukul.models.Notes
import com.example.gurukul.view.activities.AssignmentUploadActivity
import com.example.gurukul.view.activities.AssignmentsListActivity
import com.example.gurukul.view.activities.NotesListActivity

class AssignmentsListAdapter(private val activity : Activity, private val assignments_array : ArrayList<Assignment>) : RecyclerView.Adapter<AssignmentsListAdapter.AssignmentsListViewHolder>(){
    class AssignmentsListViewHolder(_binding: ItemAssigmentLayoutBinding) : RecyclerView.ViewHolder(_binding.root)
    {
        val tvModuleName = _binding.tvSubjectName
        val tvAssignmentNumber = _binding.tvAssignmentNumber
        val tvTeacher = _binding.tvTeacherName
        val cardView = _binding.cardViewNotes
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AssignmentsListViewHolder{
        val binding = ItemAssigmentLayoutBinding.inflate(activity.layoutInflater, parent, false)

        return AssignmentsListViewHolder(binding)
    }

    override fun onBindViewHolder(holder: AssignmentsListViewHolder, position: Int) {
        val model = assignments_array[position]

        holder.tvModuleName.text = model.subject
        holder.tvAssignmentNumber.text = "Assignment ${model.assignmentNum}"
        holder.tvTeacher.text = model.teacher

        val currTime = System.currentTimeMillis()

        if (model.uploadedFile != ""){
            holder.cardView.backgroundTintList = activity.resources.getColorStateList(android.R.color.holo_green_dark)
            holder.tvAssignmentNumber.setTextColor(activity.resources.getColor(R.color.text_color_primary))
            holder.tvTeacher.setTextColor(activity.resources.getColor(R.color.text_color_primary))
            //holder.itemView.setBackgroundColor(activity.resources.getColor(android.R.color.holo_green_dark))
        } else if (currTime > model.due_time.toLong()){
            holder.cardView.backgroundTintList = activity.resources.getColorStateList(android.R.color.holo_red_light)
            //holder.cardView.setBackgroundColor(activity.resources.getColor(android.R.color.holo_red_dark))
            //holder.itemView.setBackgroundColor(activity.resources.getColor(android.R.color.holo_red_dark))
            holder.tvAssignmentNumber.setTextColor(activity.resources.getColor(R.color.text_color_primary))
            holder.tvTeacher.setTextColor(activity.resources.getColor(R.color.text_color_primary))
        }

        holder.itemView.setOnClickListener {
            (activity as AssignmentsListActivity).goToUploadAssignment(model)
        }

    }

    override fun getItemCount(): Int {
        return assignments_array.size
    }

}