package com.aarogyasathi.controller;
import java.util.List;
import java.util.Optional;

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

import com.aarogyasathi.entity.AuthenticationResponse;
import com.aarogyasathi.entity.Doctor;
import com.aarogyasathi.entity.Patient;
import com.aarogyasathi.exception.DoctorServiceException;
import com.aarogyasathi.exception.PatientServiceException;
import com.aarogyasathi.service.AuthenticationService;
import com.aarogyasathi.service.DoctorService;
import com.aarogysathi.dto.DocRegistrationStatus;
import com.aarogysathi.dto.DoctorResponse;
import com.aarogysathi.dto.LoginDetails;
import com.aarogysathi.dto.LoginStatus;
import com.aarogysathi.dto.PasswordChangeDTO;
import com.aarogysathi.dto.RegistrationStatus;

@RestController
@CrossOrigin
public class DoctorController {
	
	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private AuthenticationService authService;
	
	@PostMapping("/admin/doctorsignup")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody  Doctor doctor){
		AuthenticationResponse newDoctor=authService.registerDoctor(doctor);
		if(newDoctor.getId()==0) {
			return new ResponseEntity<>(newDoctor,HttpStatus.NOT_ACCEPTABLE);
		}
		
		else
		return new ResponseEntity<>(newDoctor,HttpStatus.CREATED);
	}
	
	
	@PutMapping("/doctor/updatePassword/{doctorId}")
	  public ResponseEntity<String> updateDoctorPassword(
	          @PathVariable int doctorId,
	          @RequestBody PasswordChangeDTO passwordChangeDTO) {
	      try {
	          String oldPassword = passwordChangeDTO.getOldPassword();
	          String newPassword = passwordChangeDTO.getNewPassword();
	          String confirmNewPassword = passwordChangeDTO.getConfirmNewPassword();

	          // Validate old password
	          if (!doctorService.validateOldPassword(doctorId, oldPassword)) {
	              return new ResponseEntity<>("Old password does not match", HttpStatus.BAD_REQUEST);
	          }

	          // Validate new password and confirm password
	          if (!newPassword.equals(confirmNewPassword)) {
	              return new ResponseEntity<>("New password and confirm password do not match", HttpStatus.BAD_REQUEST);
	          }

	          // Update doctor's password
	          doctorService.updatePassword(doctorId, newPassword);

	          return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
	      } catch (Exception e) {
	          return new ResponseEntity<>("Failed to update password", HttpStatus.INTERNAL_SERVER_ERROR);
	      }
	  }
	
	
//	@PostMapping("/doctorsignup")
//	public DocRegistrationStatus register(@RequestBody Doctor doctor) {	
//		try {
//		int id=doctorService.addDoctor(doctor);
//		DocRegistrationStatus reg=new DocRegistrationStatus();
//		
//		reg.setDoctorId(id);
//		reg.setStatus(true);
//		reg.setMessage("Doctor registered successfully !");
//		
//		return reg;
//		
//		}
//		catch(DoctorServiceException exc) {
//			DocRegistrationStatus reg=new DocRegistrationStatus();
//			
//			reg.setStatus(false);
//			reg.setMessage(exc.getMessage());
//			
//			return reg;
//		}
//	}
	
	  @GetMapping("/doctor/profile/{doctorId}")
	    public DoctorResponse getDoctorById(@PathVariable int doctorId) {
	        try {
	            Optional<Doctor> doctorOptional = doctorService.getDoctorById(doctorId);

	            if (doctorOptional.isPresent()) {
	                return new DoctorResponse(true, "Doctor found by ID.", doctorOptional.get());
	            } else {
	                return new DoctorResponse(false, "Doctor not found by ID.", null);
	            }
	        } catch (Exception e) {
	            return new DoctorResponse(false, "Error retrieving doctor by ID.", null);
	        }
	    }
	  
//	  @PostMapping("/doctor/login")
//		public LoginStatus login(@RequestBody LoginDetails loginDetails) {
//			try {
//				Doctor doctor = doctorService.login(loginDetails.getEmail(), loginDetails.getPassword());
//				LoginStatus status = new LoginStatus();
//				status.setStatus(true);
//				status.setMessage("Login successful!");
//				status.setId (doctor.getDoctorId());
//				status.setName(doctor.getDoctorName());			
//				return status;
//			}
//			catch (DoctorServiceException e) {
//				LoginStatus status = new LoginStatus();
//				status.setStatus(false);
//				status.setMessage(e.getMessage());
//				return status;
//			}
//		}
	  
	  @GetMapping("/patient/doctorlist")
	    public List<Doctor> getAllDoctors() {
		   List<Doctor> doctorList=doctorService.getAllDoctors();
		   return doctorList;
	  }
	  
	  
	  @DeleteMapping("/doctors/delete/{doctorId}")
	    public ResponseEntity<?> deleteDoctor(@PathVariable int doctorId) {
	        try {
	            doctorService.deleteDoctor(doctorId);
	            return ResponseEntity.ok().body("Doctor with ID " + doctorId + " deleted successfully.");
	        } catch (Exception e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }

	  
}

