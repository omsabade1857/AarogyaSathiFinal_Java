package com.aarogyasathi.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aarogyasathi.entity.Doctor;


public interface DoctorRepository extends JpaRepository<Doctor, Integer>{

	public Optional<Doctor> findByEmail(String email);
	public Optional<Doctor> findById(int doctorId);
	public Optional<Doctor> findByEmailAndPassword(String email, String password);
	
	
}
