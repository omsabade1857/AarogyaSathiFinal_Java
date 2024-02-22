package com.aarogyasathi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aarogyasathi.entity.Admin;
import com.aarogyasathi.entity.AuthenticationResponse;
import com.aarogyasathi.entity.Doctor;
import com.aarogyasathi.entity.Patient;
import com.aarogyasathi.exception.AdminServiceException;
import com.aarogyasathi.exception.DoctorServiceException;
import com.aarogyasathi.exception.PatientServiceException;
import com.aarogyasathi.service.AdminService;
import com.aarogyasathi.service.AuthenticationService;
import com.aarogyasathi.service.PatientService;
import com.aarogysathi.dto.LoginDetails;
import com.aarogysathi.dto.LoginStatus;

@RestController
@CrossOrigin
public class AdminController {
	@Autowired
	private PatientService patientService;

	@Autowired
	private AdminService adminService;
	
	@Autowired
	private AuthenticationService authService;
	
	@PostMapping("/adminsignup")

	public ResponseEntity<AuthenticationResponse> register(@RequestBody  Admin admin){
		AuthenticationResponse newAdmin=authService.registerAdmin(admin);
		if(newAdmin.getId()==0) {
			return new ResponseEntity<>(newAdmin,HttpStatus.NOT_ACCEPTABLE);
		}
		
		else
		return new ResponseEntity<>(newAdmin,HttpStatus.CREATED);
	}
	
	 @GetMapping("/admin/doctorlist")
	    public List<Doctor> getAllDoctors() {
		   List<Doctor> doctorList=adminService.getAllDoctors();
		   return doctorList;
	  }
	 @DeleteMapping("/admin/patientdelete/{patientId}")
     public ResponseEntity<String> deletePatientById(@PathVariable int patientId) {
         try {
             adminService.deletePatientById(patientId);
             return new ResponseEntity<>("Patient with ID " + patientId + " deleted successfully", HttpStatus.OK);
         } catch (Exception e) {
             return new ResponseEntity<>("Failed to delete patient with ID " + patientId, HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }
	 
	 @DeleteMapping("/admin/doctordelete/{doctorId}")
     public ResponseEntity<String> deleteDoctorById(@PathVariable int doctorId) {
         try {
             adminService.deleteDoctorById(doctorId);
             return new ResponseEntity<>("Doctor with ID " + doctorId + " deleted successfully", HttpStatus.OK);
         } catch (Exception e) {
             return new ResponseEntity<>("Failed to delete doctor with ID " + doctorId, HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }
	 
	 @PutMapping("/admin/doctorupdate/{doctorId}")
	  public ResponseEntity<?> updateDoctor(@PathVariable int doctorId, @RequestBody Doctor updatedDoctor) {
	      try {
	          updatedDoctor.setDoctorId(doctorId);
	          Doctor updatedDoctorEntity = adminService.updateDoctor(updatedDoctor);
	          return ResponseEntity.ok().body("Doctor with ID " + updatedDoctorEntity.getDoctorId() + " updated successfully.");
	      } catch (DoctorServiceException e) {
	          return ResponseEntity.badRequest().body(e.getMessage());
	      }
	  }
	 
	 @PutMapping("/admin/patientupdate/{patientId}")
	    public ResponseEntity<Patient> updatePatient(@PathVariable int patientId, @RequestBody Patient updatedPatient) {
	        try {
	            Patient updatedEntity = adminService.updatePatient(patientId, updatedPatient);
	            if (updatedEntity != null) {
	                return new ResponseEntity<>(updatedEntity, HttpStatus.OK);
	            } else {
	                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	                
	            }
	        } catch (Exception e) {
	            // Handle any exceptions
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 
//Patient Controller Method
//	 @PostMapping("/admin/login")
//		public LoginStatus login(@RequestBody LoginDetails loginDetails) {
//			try {
//				Admin admin = adminService.adminLogin(loginDetails.getEmail(), loginDetails.getPassword());
//				LoginStatus status = new LoginStatus();
//				status.setStatus(true);
//				status.setMessage("Login successful!");
//				status.setId(admin.getAdminId());
//				return status;
//			}
//			catch (AdminServiceException e) {
//				LoginStatus status = new LoginStatus();
//				status.setStatus(false);
//				status.setMessage(e.getMessage());
//				return status;
//			}
//		}
}
