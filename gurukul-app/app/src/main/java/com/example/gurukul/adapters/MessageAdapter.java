package com.example.gurukul.adapters;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gurukul.R;
import com.example.gurukul.databinding.ItemLayoutRecievedBinding;
import com.example.gurukul.models.Message;
import com.example.gurukul.utils.Constants;

import java.util.ArrayList;

public class MessageAdapter extends RecyclerView.Adapter {

    ArrayList<Message> messages ;
    Context context ;

    int SENDER_VIEW_TYPE = 1 ;
    int RECEIVER_VIEW_TYPE = 2 ;

    public MessageAdapter(ArrayList<Message> messages, Context context) {
        this.messages = messages;
        this.context = context;
    }

    @Override
    public int getItemViewType(int position) {

        SharedPreferences sp = context.getSharedPreferences(Constants.SAVED_USER_PREF, Context.MODE_PRIVATE);

        String username = sp.getString(Constants.LOGGED_IN_USERNAME, "") ;

        if (messages.get(position).getUsername().equals(username)) {
            return SENDER_VIEW_TYPE ;
        } else {
            return RECEIVER_VIEW_TYPE ;
        }

    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        if (viewType == SENDER_VIEW_TYPE) {
            View view = LayoutInflater.from(context).inflate(R.layout.item_message_layout, parent, false) ;
            return new SentMessageViewHolder(view) ;
        } else{
            View view = LayoutInflater.from(context).inflate(R.layout.item_layout_recieved, parent, false) ;
            return new RecievedMessageViewHolder(view) ;
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        Message msgModel=  messages.get(position) ;

        if (holder.getClass() == SentMessageViewHolder.class){
            ((SentMessageViewHolder) holder).tvMessage.setText(msgModel.getMessage());
            ((SentMessageViewHolder) holder).tvUsername.setText(msgModel.getUsername());
            ((SentMessageViewHolder) holder).tvTime.setText(msgModel.getTime());
        } else if (holder.getClass() == RecievedMessageViewHolder.class){
            ((RecievedMessageViewHolder) holder).tvTime.setText(msgModel.getTime());
            ((RecievedMessageViewHolder) holder).tvMessage.setText(msgModel.getMessage());
            ((RecievedMessageViewHolder) holder).tvUsername.setText(msgModel.getUsername()) ;
        }
    }

    @Override
    public int getItemCount() {
        return messages.size();
    }

    public class RecievedMessageViewHolder extends RecyclerView.ViewHolder {

        TextView tvUsername, tvMessage, tvTime ;
        public RecievedMessageViewHolder(@NonNull View itemView) {
            super(itemView);

            tvUsername = itemView.findViewById(R.id.tv_username) ;
            tvMessage  = itemView.findViewById(R.id.tv_message_received) ;
            tvTime = itemView.findViewById(R.id.tv_time) ;

        }
    }

    public class SentMessageViewHolder extends RecyclerView.ViewHolder {

        TextView tvUsername, tvMessage, tvTime ;
        public SentMessageViewHolder(@NonNull View itemView) {
            super(itemView);

            tvUsername = itemView.findViewById(R.id.tv_username_sent) ;
            tvMessage  = itemView.findViewById(R.id.tv_message_sent) ;
            tvTime = itemView.findViewById(R.id.tv_time_sent) ;

        }
    }


}
