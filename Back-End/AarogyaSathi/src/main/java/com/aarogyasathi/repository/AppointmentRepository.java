package com.aarogyasathi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aarogyasathi.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer>{

	@Query("SELECT a.appId, a.visitDate, a.doctor, a.visitTime, a.status FROM Appointment a JOIN a.doctor d WHERE a.patient.patientId = ?1")
	List<Object[]> findAppointmentsAndDoctorByPatientId(int patientId);

    
    @Query("SELECT appId, visitDate, visitTime,status,patient FROM Appointment a JOIN a.patient p WHERE a.doctor.doctorId = ?1")
    List<Object[]> findAppointmentsAndPatientsByDoctorId(int doctorId);
    
    
}