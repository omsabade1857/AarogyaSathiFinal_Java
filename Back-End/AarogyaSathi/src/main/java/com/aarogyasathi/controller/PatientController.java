package com.aarogyasathi.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aarogyasathi.entity.AuthenticationResponse;
import com.aarogyasathi.entity.Patient;
import com.aarogyasathi.entity.UserInfoUserDetails;
import com.aarogyasathi.exception.PatientServiceException;
import com.aarogyasathi.service.AuthenticationService;
import com.aarogyasathi.service.PatientService;
import com.aarogysathi.dto.LoginDetails;
import com.aarogysathi.dto.LoginStatus;
import com.aarogysathi.dto.PasswordChangeDTO;
import com.aarogysathi.dto.PatientResponse;
import com.aarogysathi.dto.RegistrationStatus;

@RestController
@CrossOrigin
public class PatientController {
	
	@Autowired
	private PatientService patientService;

	@Autowired
	private AuthenticationService authService;
	
	
	@PostMapping("/signup")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody Patient patient){
		AuthenticationResponse newPatient= authService.register(patient);
		if(newPatient.getId()==0) {
			return new ResponseEntity<>(newPatient,HttpStatus.NOT_ACCEPTABLE);
		}
		else
		return new ResponseEntity<>(newPatient,HttpStatus.CREATED);
	}
	
	
//	@PostMapping("/signup")
//	public ResponseEntity<RegistrationStatus> register(@RequestBody Patient patient) {	
//		
//		System.out.println(patient);
//		try {
//			
//		int id=patientService.addPatient(patient);
//		RegistrationStatus reg=new RegistrationStatus();
//		
//		reg.setPatientId(id);
//		reg.setStatus(true);
//		reg.setMessage("Patient registered successfully !");
//
//		return new ResponseEntity<RegistrationStatus>(reg, HttpStatus.OK);
//		
//		}
//		catch(PatientServiceException exc) {
//			RegistrationStatus reg=new RegistrationStatus();
//			
//			reg.setStatus(false);
//			reg.setMessage(exc.getMessage());
//			
//			return new ResponseEntity<RegistrationStatus>(reg, HttpStatus.BAD_REQUEST);
//		}
//	}
	
	 @GetMapping("/patient/profile/{userId}")
	    public PatientResponse getPatientById(@PathVariable int userId) {
	        try {
	            Optional<Patient> patientOptional = patientService.getPatientById(userId);

	            if (patientOptional.isPresent()) {
	                return new PatientResponse(true, "Patient found by ID.", patientOptional.get());
	            } else {
	                return new PatientResponse(false, "Patient not found by ID.", null);
	            }
	        } catch (Exception e) {
	            return new PatientResponse(false, "Error retrieving patient by ID.", null);
	        }
	    }
	 
//	 @PostMapping("/patient/login")
//		public LoginStatus login(@RequestBody LoginDetails loginDetails) {
//			try {
//				Patient patient = patientService.login(loginDetails.getEmail(), loginDetails.getPassword());
//				LoginStatus status = new LoginStatus();
//				status.setStatus(true);
//				status.setMessage("Login successful!");
//				status.setId (patient.getPatientId());
//				status.setName(patient.getName());
//				return status;
//			}
//			catch (PatientServiceException e) {
//				LoginStatus status = new LoginStatus();
//				status.setStatus(false);
//				status.setMessage(e.getMessage());
//				return status;
//			}
//		}
	 
	 @GetMapping("/patientlist")
		public List<Patient> getAllPatients(){
			List<Patient> PatientList=patientService.getAllPatients();
			return PatientList;
		}
	 
	 @PutMapping("/patient/update/{patientId}")
	    public ResponseEntity<Patient> updatePatient(@PathVariable int patientId, @RequestBody Patient updatedPatient) {
	        try {
	            Patient updatedEntity = patientService.updatePatient(patientId, updatedPatient);
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

	 
	 @PutMapping("/patient/updatePassword/{patientId}")
     public ResponseEntity<String> updatePassword(
             @PathVariable int patientId,
             @RequestBody PasswordChangeDTO passwordChangeDTO,Authentication authentication) {
         try {
        	 
        	 UserInfoUserDetails userDetails = (UserInfoUserDetails) authentication.getPrincipal();
             int authenticatedPatientId = userDetails.getId();
        	 
             String oldPassword = passwordChangeDTO.getOldPassword();
             String newPassword = passwordChangeDTO.getNewPassword();
             String confirmNewPassword = passwordChangeDTO.getConfirmNewPassword();

             
             if (!patientService.validateOldPassword(patientId, oldPassword)) {
                 return new ResponseEntity<>("Wrong Old password", HttpStatus.BAD_REQUEST);
             }
             
             
             if (!newPassword.equals(confirmNewPassword)) {
                 return new ResponseEntity<>("New password and confirm password do not match", HttpStatus.BAD_REQUEST);
             }
             
             patientService.updatePassword(patientId, newPassword);

             return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
         } catch (Exception e) {
             return new ResponseEntity<>("Failed to update password", HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }
}