package com.aarogyasathi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aarogyasathi.entity.Medicine;
import com.aarogyasathi.entity.PatientMedicalHistory;

public interface PatientMedicalHistoryRepository extends JpaRepository<PatientMedicalHistory, Integer> {
	
	List<PatientMedicalHistory> findByPatient_PatientId(int patientId);
			//to save complete obj
	Medicine save(Medicine medicine);
	
			//remeber order desc
	List<PatientMedicalHistory> findByPatient_PatientIdOrderByVisitDateDesc(int patientId);

}
