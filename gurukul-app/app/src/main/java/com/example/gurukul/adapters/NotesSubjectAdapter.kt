package com.example.gurukul.adapters

import android.app.Activity
import android.content.Intent

import android.view.ViewGroup

import androidx.recyclerview.widget.RecyclerView
import com.example.gurukul.databinding.ItemNotesSubjectLayoutBinding

import com.example.gurukul.models.NotesSubject
import com.example.gurukul.view.activities.NotesListActivity


class NotesSubjectAdapter(private val activity :Activity, private val subjects_array : ArrayList<NotesSubject>) : RecyclerView.Adapter<NotesSubjectAdapter.NotesSubjectViewHolder>(){
    class NotesSubjectViewHolder(_binding: ItemNotesSubjectLayoutBinding) : RecyclerView.ViewHolder(_binding.root)
    {
        val tvSubjectTitle = _binding.tvSubjectTitle
        val tvSubjectCode = _binding.tvSubjectCode
        val tvSubjectTeacher = _binding.tvSubjectTeacher
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NotesSubjectViewHolder{
        val binding = ItemNotesSubjectLayoutBinding.inflate(activity.layoutInflater, parent, false)

        return NotesSubjectViewHolder(binding)
    }

    override fun onBindViewHolder(holder: NotesSubjectViewHolder, position: Int) {
        val model = subjects_array[position]
        holder.tvSubjectTitle.text = model.subjectName
        holder.tvSubjectCode.text = model.subjectCode
        holder.tvSubjectTeacher.text = model.subjectTeacher


        holder.itemView.setOnClickListener {
            Intent(activity, NotesListActivity::class.java).also {
                it.putExtra("subjectCode", model.subjectCode)
                activity.startActivity(it)
            }
        }

    }

    override fun getItemCount(): Int {
        return subjects_array.size
    }

}