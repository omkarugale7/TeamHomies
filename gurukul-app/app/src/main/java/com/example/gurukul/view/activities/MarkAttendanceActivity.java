package com.example.gurukul.view.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.gurukul.databinding.ActivityMarkAttendaceBinding;
import com.example.gurukul.utils.Constants;

import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class MarkAttendanceActivity extends BaseActivity {


    LocationManager locationManager ;
    LocationListener locationListener ;
    Location location ;

    ActivityMarkAttendaceBinding _binding ;


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED)
        {
            if (ContextCompat.checkSelfPermission(this , Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED)
            {
                locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER , 0 , 0 , locationListener);
            }
        }
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        _binding = ActivityMarkAttendaceBinding.inflate(getLayoutInflater()) ;

        setContentView(_binding.getRoot());


        locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE) ;
        locationListener = location -> {
            //Log.d("Location : " , location.toString()) ;
            this.location = location ;

            Log.d("LOC", location.toString()) ;


        };

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED)
        {
            ActivityCompat.requestPermissions(this ,new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
        }
        else
        {
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER , 0 ,0 , locationListener) ;
        }

        Intent intent = getIntent() ;
        String password = intent.getStringExtra("password") ;
        String id = intent.getStringExtra("_id") ;
        double lat = Double.parseDouble(intent.getStringExtra("latitude")) ;
        double lon = Double.parseDouble(intent.getStringExtra("longitude")) ;

        _binding.btnConfirm.setOnClickListener(v -> {

            SharedPreferences spf = getSharedPreferences(Constants.SAVED_USER_PREF, MODE_PRIVATE) ;

            String token = spf.getString(Constants.JWT_TOKEN, "");
            String username = spf.getString(Constants.LOGGED_IN_USERNAME, "") ;

            Location teacherLocation = new Location("") ;
            teacherLocation.setLatitude(lat);
            teacherLocation.setLongitude(lon);

            if (location != null)
            {
                float distInMeters = teacherLocation.distanceTo(location);

                Toast.makeText(this, "Distance = " + distInMeters, Toast.LENGTH_LONG).show();

                if (lat != 0 && location == null){
                    showSnackBar("Location not added, Try again!", true);
                } else
                if (lat != 0 && distInMeters > 50) {
                    showSnackBar("You are not present in the class", true);
                } else if (!_binding.etPinForAttendance.getText().toString().equals(password)) {
                    showSnackBar("You have entered wrong PIN", true);
                } else {

                    String url = "https://wcegurukul.herokuapp.com/markPresent";

                    try {
                        JSONObject jsonObject = new JSONObject();

                        jsonObject.put("username", username);

                        jsonObject.put("id", id);

                        String stringBodyObject = jsonObject.toString();

                        StringRequest sr = new StringRequest(
                                Request.Method.POST,
                                url,
                                response -> {
                                    showSnackBar("Successfully Marked Present", false);
                                },
                                error -> {
                                    if (error.getMessage() != null)
                                        showSnackBar(error.getMessage(), true);
                                    else showSnackBar("Check your internet conncection", true);
                                }) {
                            @Override
                            public byte[] getBody() {
                                return stringBodyObject.getBytes() ;
                            }

                            @Override
                            public Map<String, String> getHeaders() throws AuthFailureError {
                                Map<String, String> map = new HashMap<>();
                                map.put("x-access-token", token);
                                map.put("Content-Type", "application/json");
                                return map;
                            }
                        };


                        RequestQueue rq = Volley.newRequestQueue(this);
                        rq.add(sr);

                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                }
            } else showSnackBar("Please wait...", false);
        });

    }
}