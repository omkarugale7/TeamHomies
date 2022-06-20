package com.example.gurukul.adapters

import android.content.Context
import android.graphics.Point
import android.view.ViewGroup
import android.view.WindowManager
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.RecyclerView
import com.example.gurukul.databinding.ItemNoticeLayoutBinding
import com.example.gurukul.models.Notice
import com.example.gurukul.utils.GliderLoader

class NoticeAdapter(private val fragment : Fragment, private val notice_array : ArrayList<Notice>) : RecyclerView.Adapter<NoticeAdapter.NoticeViewHolder>(){
    class NoticeViewHolder(private val _binding : ItemNoticeLayoutBinding, private val fragment: Fragment) : RecyclerView.ViewHolder(_binding.root)
    {
        val ivNoticeImage = _binding.ivNoticeImage
        val tvNoticeTitle = _binding.tvNoticeTitle
        val tvNoticeDesc = _binding.tvNoticeDesc

        // setting size of an item
        init {
            val wm = fragment.requireContext().getSystemService(Context.WINDOW_SERVICE) as WindowManager
            val display = wm.defaultDisplay
            val p = Point()
            display.getSize(p)
            val width = p.x
            _binding.llNoticeItem.layoutParams.width = width - 100
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NoticeViewHolder {
        val binding = ItemNoticeLayoutBinding.inflate(fragment.layoutInflater)

        return NoticeViewHolder(binding, fragment)
    }

    override fun onBindViewHolder(holder: NoticeViewHolder, position: Int) {
        val model = notice_array[position]
        GliderLoader().loadImage(model.img, holder.ivNoticeImage)

        holder.tvNoticeTitle.text = model.title
        holder.tvNoticeDesc.text = model.desc
    }

    override fun getItemCount(): Int {
        return notice_array.size
    }

}