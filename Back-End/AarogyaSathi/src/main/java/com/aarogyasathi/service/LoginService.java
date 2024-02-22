package com.aarogyasathi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aarogyasathi.entity.Admin;
import com.aarogyasathi.entity.Doctor;
import com.aarogyasathi.entity.Patient;
import com.aarogyasathi.exception.DoctorServiceException;
import com.aarogyasathi.exception.PatientServiceException;
import com.aarogyasathi.repository.AdminRepository;
import com.aarogyasathi.repository.DoctorRepository;
import com.aarogyasathi.repository.PatientRepository;
import com.aarogysathi.dto.LoginStatus;

@Service
public class LoginService {
	
	@Autowired
	private PatientRepository patientRepo;
	
	@Autowired
	private DoctorRepository doctorRepo;
	
	@Autowired
	private AdminRepository adminRepo;
	
	public LoginStatus login(String email, String password) {
		  try {
	           
	            Optional<Patient> patient = patientRepo.findByEmailAndPassword(email, password);
	           
	            if (patient.isPresent()) {
	                return createLoginStatus(true, "Login successful!", patient.get().getPatientId(), patient.get().getName(), "patient");
	            }
	            
	            Optional<Doctor> doctor = doctorRepo.findByEmailAndPassword(email,password);
	            if (doctor.isPresent()) {
	                return createLoginStatus(true, "Login successful!", doctor.get().getDoctorId(), doctor.get().getDoctorName(), "doctor");
	            }
	            
//	            Optional<Admin> admin= adminRepo.findByEmailAndPassword(email, password);
//	            if(admin.isPresent()) {
//	            	return createLoginStatus(true, "LoginSuccessful!", admin.get().getAdminId(),null,"admin");
//	            }            
	            
	            return createLoginStatus(false, "Invalid Email/Password", 0, null, null);
	            
	        } catch (Exception e) {
	            return createLoginStatus(false, e.getMessage(), 0, null, null);
	        }
	    }

	    private LoginStatus createLoginStatus(boolean status, String message, int id, String name, String role) {
	        LoginStatus loginStatus = new LoginStatus(message,status,id,name,role);
	        return loginStatus;
	    }
	}

