package com.aarogyasathi.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aarogyasathi.entity.Admin;
import com.aarogyasathi.entity.AuthenticationResponse;
import com.aarogyasathi.entity.Doctor;
import com.aarogyasathi.entity.Patient;
import com.aarogyasathi.repository.AdminRepository;
import com.aarogyasathi.repository.DoctorRepository;
import com.aarogyasathi.repository.PatientRepository;

@Service
public class AuthenticationService {
	private final PatientRepository patientRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authManager;
	private final DoctorRepository doctorRepo;
	private final AdminRepository adminRepo;

	public AuthenticationService(PatientRepository patientRepo, PasswordEncoder passwordEncoder, JwtService jwtService,
			AuthenticationManager authManager, DoctorRepository doctorRepo, AdminRepository adminRepo) {
		super();
		this.patientRepo = patientRepo;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authManager = authManager;
		this.doctorRepo = doctorRepo;
		this.adminRepo = adminRepo;
	}

	public boolean isEmailAlreadyRegistered(String email) {
		Doctor checkDoctor=doctorRepo.findByEmail(email).orElse(null);
		Patient checkPatient=patientRepo.findByEmail(email).orElse(null);
		Admin checkAdmin=adminRepo.findByEmail(email).orElse(null);
		
		if(checkDoctor==null && checkPatient==null && checkAdmin==null) {
			return false;
		}
		else
			return true;
	}
	public AuthenticationResponse register(Patient request) {
		
		if(!isEmailAlreadyRegistered(request.getEmail())) {
			Patient patient = new Patient();
			patient.setName(request.getName());
			patient.setEmail(request.getEmail());
			patient.setCity(request.getCity());
			patient.setDateOfBirth(request.getDateOfBirth());
			patient.setGender(request.getGender());
			patient.setMobileNo(request.getMobileNo());
			patient.setPassword(passwordEncoder.encode(request.getPassword()));
			patient.setRole("ROLE_PATIENT");
			
			patient=patientRepo.save(patient);
			return new AuthenticationResponse(null,patient.getPatientId(), "ROLE_PATIENT","CREATED");
			
		}
		else {
		  	return new AuthenticationResponse(null, 0, null,"Email ID already registered");
		}				
	}
	
	
	
	public AuthenticationResponse registerDoctor(Doctor request) {
		if(!isEmailAlreadyRegistered(request.getEmail())) {
			Doctor doctor=new Doctor();
			doctor.setDoctorName(request.getDoctorName());
			doctor.setEmail(request.getEmail());
			doctor.setMobileNo(request.getMobileNo());
			doctor.setPassword(passwordEncoder.encode(request.getPassword()));
			doctor.setQualification(request.getQualification());
			doctor.setSpecialization(request.getSpecialization());
			doctor.setRole("ROLE_DOCTOR");
	
			doctor=doctorRepo.save(doctor);
			return new AuthenticationResponse(null,doctor.getDoctorId(),"ROLE_DOCTOR","CREATED");
		}
		else {
		  	return new AuthenticationResponse(null, 0, null,"Email ID already registered");
		}	
			
	}
	
	public AuthenticationResponse registerAdmin(Admin request) {
		if(!isEmailAlreadyRegistered(request.getEmail())) {
			Admin admin=new Admin();
			admin.setEmail(request.getEmail());
			admin.setPassword(passwordEncoder.encode(request.getPassword()));
			admin=adminRepo.save(admin);
			return new AuthenticationResponse(null,admin.getAdminId(),"ROLE_ADMIN","CREATED");
		}
		else {
		  	return new AuthenticationResponse(null, 0, null,"Email ID already registered");
		}		
	}
	
	
	
	
	public ResponseEntity<?> authenticate(String email, String password) {
		
		try{
			
			authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
			Doctor doctor=doctorRepo.findByEmail(email).orElse(null);
			Patient patient=patientRepo.findByEmail(email).orElse(null);
			Admin admin=adminRepo.findByEmail(email).orElse(null);
			
			 if (patient != null) {
		            String token = jwtService.generateToken(patient.getEmail());
		           return new ResponseEntity<>(new AuthenticationResponse(token,patient.getPatientId(),"ROLE_PATIENT","ok"),HttpStatus.OK);
		        } 
			 else if(doctor != null) {
		            String token = jwtService.generateToken(doctor.getEmail());
		            return new ResponseEntity<>(new AuthenticationResponse(token,doctor.getDoctorId(),"ROLE_DOCTOR","ok"),HttpStatus.OK);
		        } 
			 else {
				 String token = jwtService.generateToken(admin.getEmail());
		            return new ResponseEntity<>(new AuthenticationResponse(token,admin.getAdminId(), "ROLE_ADMIN","ok"),HttpStatus.OK);
			 }
			 
			 


		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email or password is not valid");
		}
		
	}	
}
