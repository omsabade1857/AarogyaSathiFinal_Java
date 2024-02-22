import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { BookAppointment, DoctorServices} from '../services/DoctorServices';
import { PatientServices, deletePatientById } from '../services/UserServices';
import { Alert, Col, Container, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './DoctorList.css';
import UpdateProfileForm from './UpdateProfileForm';

export function PatientList() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [Patient, setPatient] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  
  async function populatePatientState() {
    try {
      const result = await PatientServices();
      // if (result.status == 401) {
      //   setIsLoggedIn(false);
      // }
      // else {
        // setIsLoggedIn(true);
        // console.log("Entered")
        console.log(result);
        setPatient(result.data);
        //console.log(doctors);
      // }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    populatePatientState();
  }, []);

  const [bookingDate, setBookingDate] = useState("");

  const handleBookingDateChange = (e) => {
    setBookingDate(e.target.value);
  }

  const handleDelete = async (patientId) => {
    try {
      const response = await deletePatientById(patientId);
      if (response.status === 200) {
        //setPatients(patients.filter(patient => patient.patientId !== patientId));
        populatePatientState();
        alert("Patient deleted successfully");
      } else {
        alert("Failed to delete patient");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete patient");
    }
  };

  const handleUpdateClick = (patient) => {
    setSelectedPatient(patient);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
    populatePatientState();
  };

  const handleSubmit = (dctr_id) => {
    const patientId = sessionStorage.getItem('patientId');
    const booking = { doctorId: dctr_id, date: bookingDate, patientId: patientId }
    const result = BookAppointment(booking);
    
    alert("Appointment booked successfully");
    navigate("/myprofile");

  }
  function redirect(){
    navigate("/admindashboard");
  }

  return (
    <>
    <Container className="mt-4" md={{ span: 3, offset: 5 }}>
   <Button onClick={redirect}>Back</Button>
   </Container> 
     <Container style={{border:'1px solid black',marginTop:'3%' ,boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'}} >
      <h2 className='text-center mt-4 mb-6'>Patient's List</h2>
        <Table className="mt-4">
          <thead>
            <tr>
              <th>Patient Id</th>  
              <th>Patients's Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
              <th>City</th>
              <th>Delete Patient</th>
              <th>Update Patient</th>
            </tr>
          </thead>
          <tbody>
            {
              Patient.map((d) => {
                return (
                  <tr>
                    <td>{d.patientId}</td>
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.mobileNo}</td>
                    <td>{d.dateOfBirth}</td>
                    <td>{d.gender}</td>
                    <td>{d.city}</td>
                    <td>
                    <Button variant="danger" onClick={() => handleDelete(d.patientId)}>Delete</Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleUpdateClick(d)}>Update</Button>
                  </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        {showUpdateForm && selectedPatient && (
          <UpdateProfileForm
            patientId={selectedPatient.patientId}
            initialData={selectedPatient}
            onClose={handleCloseUpdateForm}
          />
        )}
      </Container>
    </>
  );
}
