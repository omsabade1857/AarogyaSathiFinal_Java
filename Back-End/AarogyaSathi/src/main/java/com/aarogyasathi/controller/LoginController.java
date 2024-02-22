package com.aarogyasathi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aarogyasathi.entity.AuthenticationResponse;
import com.aarogyasathi.service.AuthenticationService;
import com.aarogyasathi.service.LoginService;
import com.aarogysathi.dto.LoginDetails;
import com.aarogysathi.dto.LoginStatus;

@RestController
@CrossOrigin
public class LoginController {

	@Autowired
	private LoginService loginService;
	
	@Autowired
	private AuthenticationService authService;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDetails loginDetails){
		
		
		return ResponseEntity.ok(authService.authenticate(loginDetails.getEmail(), loginDetails.getPassword()));
		
	}
	
//    public LoginStatus login() {
//        return loginService.login(loginDetails.getEmail(), loginDetails.getPassword());
//    }
	
	
}
