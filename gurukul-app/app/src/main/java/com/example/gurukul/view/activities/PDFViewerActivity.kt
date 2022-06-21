package com.example.gurukul.view.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebViewClient
import com.example.gurukul.R
import com.example.gurukul.databinding.ActivityPdfviewerBinding

class PDFViewerActivity : AppCompatActivity() {


    lateinit var _binding : ActivityPdfviewerBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _binding = ActivityPdfviewerBinding.inflate(layoutInflater)
        setContentView(_binding.root)

        val webView = _binding.wvPdfViewer


    }
}