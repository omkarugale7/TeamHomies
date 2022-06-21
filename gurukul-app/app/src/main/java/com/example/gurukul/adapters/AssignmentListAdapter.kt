package com.example.gurukul.adapters

import android.app.Activity
import android.content.Intent
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
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

        holder.itemView.setOnClickListener {
            (activity as AssignmentsListActivity).goToUploadAssignment(model)
        }

    }

    override fun getItemCount(): Int {
        return assignments_array.size
    }

}