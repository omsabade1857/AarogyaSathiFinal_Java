package com.aarogyasathi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aarogyasathi.entity.Admin;
import com.aarogyasathi.entity.Appointment;
import com.aarogyasathi.entity.Doctor;
import com.aarogyasathi.entity.Patient;
import com.aarogyasathi.exception.AdminServiceException;
import com.aarogyasathi.exception.DoctorServiceException;
import com.aarogyasathi.exception.PatientServiceException;
import com.aarogyasathi.repository.AdminRepository;
import com.aarogyasathi.repository.AppointmentRepository;
import com.aarogyasathi.repository.DoctorRepository;
import com.aarogyasathi.repository.PatientRepository;
import com.aarogysathi.dto.LoginDetails;

@Service
public class AdminService {

	@Autowired
	private AdminRepository adminRepo;
	
	@Autowired
	private PatientRepository patientRepo;
	
	@Autowired
	private AppointmentRepository appRepo;
	
	@Autowired
	private DoctorRepository doctorRepo;
	
	  public void deletePatientById(int patientId) {
	        Optional<Patient> optionalPatient = patientRepo.findById(patientId);
	        if (optionalPatient.isPresent()) {
	            Patient patient = optionalPatient.get();
	            List<Appointment> appointments = patient.getAppointments();
	            for (Appointment appointment : appointments) {
	                appRepo.delete(appointment);
	            }
	            patientRepo.delete(patient);
	        }
	    }
	  
	  public void deleteDoctorById(int doctorId) {
	        Optional<Doctor> optionalDoctor = doctorRepo.findById(doctorId);
	        if (optionalDoctor.isPresent()) {
	            Doctor doctor = optionalDoctor.get();
	            List<Appointment> appointments = doctor.getAppointments();
	            for (Appointment appointment : appointments) {
	                appRepo.delete(appointment);
	            }
	            doctorRepo.delete(doctor);
	        }
	    }
	  
	  public Doctor updateDoctor(Doctor updatedDoctor) throws DoctorServiceException {
	       
	        Optional<Doctor> existingDoctorOptional = doctorRepo.findById(updatedDoctor.getDoctorId());

	        if (existingDoctorOptional.isPresent()) {
	            Doctor existingDoctor = existingDoctorOptional.get();

	         
	            if (updatedDoctor.getDoctorName() != null) {
	                existingDoctor.setDoctorName(updatedDoctor.getDoctorName());
	            }
	            if (updatedDoctor.getEmail() != null) {
	                existingDoctor.setEmail(updatedDoctor.getEmail());
	            }
	            if (updatedDoctor.getPassword() != null) {
	                existingDoctor.setPassword(updatedDoctor.getPassword());
	            }
	            if (updatedDoctor.getQualification() != null) {
	                existingDoctor.setQualification(updatedDoctor.getQualification());
	            }
	            if (updatedDoctor.getSpecialization() != null) {
	                existingDoctor.setSpecialization(updatedDoctor.getSpecialization());
	            }
	            if (updatedDoctor.getMobileNo() != null) {
	                existingDoctor.setMobileNo(updatedDoctor.getMobileNo());
	            }
	            
	            return doctorRepo.save(existingDoctor);
	        } else {
	            throw new DoctorServiceException("Doctor not found for update.");
	        }
	    }
	  
	  public Patient updatePatient(int patientId, Patient updatedPatient) {
	        Optional<Patient> patientOptional = patientRepo.findById(patientId);

	        if (patientOptional.isPresent()) {
	            Patient existingPatient = patientOptional.get();

	            // Update non-null fields only
	            if (updatedPatient.getName() != null) {
	                existingPatient.setName(updatedPatient.getName());
	            }
	            if (updatedPatient.getEmail() != null) {
	                existingPatient.setEmail(updatedPatient.getEmail());
	            }
	            if (updatedPatient.getPassword() != null) {
	                existingPatient.setPassword(updatedPatient.getPassword());
	            }
	            if (updatedPatient.getMobileNo() != 0) {
	                existingPatient.setMobileNo(updatedPatient.getMobileNo());
	            }
	            if (updatedPatient.getDateOfBirth() != null) {
	                existingPatient.setDateOfBirth(updatedPatient.getDateOfBirth());
	            }
	            if (updatedPatient.getCity() != null) {
	                existingPatient.setCity(updatedPatient.getCity());
	            }
	            if (updatedPatient.getGender() != null) {
	                existingPatient.setGender(updatedPatient.getGender());
	            }

	            // Save the updated patient
	            return patientRepo.save(existingPatient);
	        } 
	        else {
	        	return null;
	        }
	        }
	  public List<Doctor> getAllDoctors(){
			 List<Doctor> allDoctors=doctorRepo.findAll();
			 return  allDoctors;
		}
	
}
