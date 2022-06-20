package com.example.gurukul.utils

import android.widget.ImageView
import com.bumptech.glide.Glide
import java.io.IOException

class GliderLoader {

    fun loadImage(image : Any, imageView : ImageView)
    {
        try{

            Glide.with(imageView.context)
                .load(image)
                .centerCrop()
                .into(imageView)

        } catch (e: IOException){
            e.printStackTrace()
        }
    }

}