package com.aarogyasathi.entity;

public class AuthenticationResponse {

	private String token;
	private String role;
	private int id;
	private String status;
	public AuthenticationResponse(String token,  int id,String role,String status) {
		this.token = token;
		this.role = role;
		this.id = id;
		this.status=status;
	}
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
