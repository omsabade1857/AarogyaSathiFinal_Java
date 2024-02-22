package com.aarogyasathi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.aarogyasathi.entity.Admin;
import com.aarogyasathi.entity.Doctor;
import com.aarogyasathi.entity.Patient;
import com.aarogyasathi.entity.UserInfoUserDetails;
import com.aarogyasathi.repository.AdminRepository;
import com.aarogyasathi.repository.DoctorRepository;
import com.aarogyasathi.repository.PatientRepository;

@Service
public class UserInfoDetailService implements UserDetailsService{

	
@Autowired
private PatientRepository patientRepo;

@Autowired
private DoctorRepository doctorRepo;

@Autowired
private AdminRepository adminRepo;	

@Override
public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	Patient patient=patientRepo.findByEmail(email).orElse(null);
	Doctor doctor=doctorRepo.findByEmail(email).orElse(null);
	Admin admin=adminRepo.findByEmail(email).orElse(null);
	
	if(patient!=null) {
	return new UserInfoUserDetails(patient);
	}
	else if(doctor!=null){
		return new UserInfoUserDetails(doctor);
	}
	else if(admin!=null){
		return new UserInfoUserDetails(admin);
	}
	else {
		throw new UsernameNotFoundException("Invalid Email ID");
	}
	

}
}
