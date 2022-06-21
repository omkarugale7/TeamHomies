package com.example.gurukul.adapters

import android.app.Activity
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.gurukul.databinding.ItemNotesBinding
import com.example.gurukul.models.Notes
import com.example.gurukul.view.activities.NotesListActivity

class NotesListAdapter(private val activity : Activity, private val notes_array : ArrayList<Notes>) : RecyclerView.Adapter<NotesListAdapter.NotesListViewHolder>(){
    class NotesListViewHolder(_binding: ItemNotesBinding) : RecyclerView.ViewHolder(_binding.root)
    {
        val tvModuleName = _binding.tvModuleName
        val tvModulePart = _binding.tvModulePart
        val tvSubjectCode = _binding.tvSubjectCode
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NotesListViewHolder{
        val binding = ItemNotesBinding.inflate(activity.layoutInflater, parent, false)

        return NotesListViewHolder(binding)
    }

    override fun onBindViewHolder(holder: NotesListViewHolder, position: Int) {
        val model = notes_array[position]
        holder.tvSubjectCode.text = model.subCode
        holder.tvModuleName.text = "Module ${model.moduleNum} : ${model.moduleName}"
        holder.tvModulePart.text = "Part ${model.noteNum}"

        holder.itemView.setOnClickListener {
            (activity as NotesListActivity).openPdf(notes_array[position])
        }
    }

    override fun getItemCount(): Int {
        return notes_array.size
    }

}