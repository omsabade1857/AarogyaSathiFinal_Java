package com.aarogysathi.dto;



public class LoginStatus {

	private String message;
	private boolean status;
	private int id;
	private String name;
	private String role;
	
	
	
	public LoginStatus() {
		super();
	}


	public LoginStatus(String message, boolean status, int id, String name, String role) {
		
		this.message = message;
		this.status = status;
		this.id = id;
		this.name = name;
		this.role = role;
	}


	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id =id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
		
	
	
}