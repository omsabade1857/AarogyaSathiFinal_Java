import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { BookAppointment, DoctorServices, deleteDoctorById, getDoctorProfile } from '../services/DoctorServices';
import { Alert, Col, Container, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './DoctorList.css';
import EditDoctorProfile from './EditDoctorProfile';

export function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
 async function populateDoctorState() {
    try {
      const result = await DoctorServices();
        setDoctors(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    console.log("in useEffect");
    populateDoctorState();
  }, []);

  const [bookingDate, setBookingDate] = useState("");

  const handleBookingDateChange = (e) => {
    setBookingDate(e.target.value);
  }

  // const handleSubmit = (dctr_id) => {
  //   const patientId = sessionStorage.getItem('patientId');
  //   const booking = { doctorId: dctr_id, date: bookingDate, patientId: patientId }
  //   const result = BookAppointment(booking);
    
  //   alert("Appointment booked successfully");
  //   navigate("/myprofile");

  // }

  const handleDelete = async (doctorId) => {
    try {
      const response = await deleteDoctorById(doctorId);
      if (response.status === 200) {
       
        alert("Doctor deleted successfully");
        populateDoctorState();
      } else {
        alert("Failed to delete doctor");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete doctor");
    }
  };
function redirect(){
  navigate("/admindashboard");
}
const handleSave = async (formData) => {
  setEditMode(false);
};
const handleEditClick = (doctor) => {
  setSelectedDoctor(doctor);
   setEditMode(true);
  };
const handleCloseForm = () => {
  setEditMode(false);
  console.log("control");
  populateDoctorState();
  };

  return (
    <>
   <Container className="mt-4" md={{ span: 3, offset: 5 }}>
   <Button onClick={redirect}>Back</Button>
   </Container> 
      <Container  style={{border:'1px solid black',marginTop:'3%' ,boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'}} >
        <h2 className='text-center mt-4 mb-6'>Doctor's List</h2>
        <Table className="mt-4">

          <thead>
            <tr>
              <th>Id</th>  
              <th>Doctor's Name</th>
              <th>Email</th>
              <th>Qualification</th>
              <th>Specialization</th>
              <th>Mobile No</th>
              <th>Update </th>
              <th>Delete </th>
            </tr>
          </thead>
          <tbody>
            {
              doctors.map((d) => {
                return (
                  <tr>
                    <td>{d.doctorId}</td>
                    <td>{d.doctorName}</td>
                    <td>{d.email}</td>
                    <td>{d.qualification}</td>
                    <td>{d.specialization}</td>
                    <td>{d.mobileNo}</td>
                    <td>
                    <Button variant="primary" onClick={() => handleEditClick(d)}>Update</Button>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(d.doctorId)}>Delete</Button>
                     </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        {editMode && selectedDoctor && (
        <EditDoctorProfile
          doctorId={selectedDoctor.doctorId}
          initialData={selectedDoctor}
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}
      </Container>
    </>
  );
}
