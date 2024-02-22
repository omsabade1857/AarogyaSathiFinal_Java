import { Button, Col, Container, Row, Table } from "react-bootstrap";

import { getPatientBookings, getPatientHistory, getUserProfile } from "../services/UserServices";
import { useState, useEffect } from "react";
import { DeleteAppointment, UpdateAppointment } from "../services/DoctorServices";
import './Profile.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getToken, isAuthenticated } from "../services/TokenUtil";
import UpdateProfileForm from "./UpdateProfileForm";

export function Profile() {
    const patientId = sessionStorage.getItem('patientId');
    const navigate = useNavigate();
    const [patient, setPatient] = useState({ name: "", email: "", dateOfBirth: "", gender: "", city: "",mobileNo: "" ,patientId:""});
    // const [bookings, setBookings] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

  const getUserInfo = async () => {
        try {
           
            const result = await getUserProfile();
            console.log(result);
            if (result.status == 401) {
                console.log("User Not Found");
              }
              else {
                
            setPatient(result.patient);
            // setBookings(result.booking);
            // console.log(bookings);
        }
        } catch (error) {
            console.log(error);
        }
    }

    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");

    const handleNewDate = (e) => {
        setBookingDate(e.target.value);
    }
    const handleNewTime = (e) => {
        setBookingTime(e.target.value);
    }

    const [bookings, setBookings] = useState([]);
    
    const getBookings = async (id) => {
        try {

            const result = await getPatientBookings(id);
            console.log(result);
            setBookings(result);
            
            console.log(bookings);
        }catch(error){
            console.log(error);
        }

    }

    const [history, setHistory] = useState([]);
    const getHistory = async () => {
        try {
            const result = await getPatientHistory();
            setHistory(result);
            console.log(history);
        }catch(error){
            console.log(error);
        }

    }

    const handleUpdate = async (appId) => {
        // Validate if both date and time are provided
        if (!bookingDate || !bookingTime) {
          alert("Please select both date and time.");
          return;
        }
      
        const updatedRec = { newDate: bookingDate, newTime: bookingTime };
        try {
          // Assuming UpdateAppointment is an asynchronous function
          await UpdateAppointment(updatedRec, appId);
          // Reset the input fields
          setBookingDate("");
          setBookingTime("");
          alert("Appointment updated successfully");
          // Refresh bookings after updating
          getBookings(patientId);
        } catch (error) {
          console.error("Error updating appointment:", error);
          alert("Failed to update the appointment.");
        }
      };

    const handleDelete =async (appId)=>{
        const result = await DeleteAppointment(appId);
        alert('Appointment deleted successfully');
        getBookings(patientId);    
    }

    useEffect(() => {
       if(isAuthenticated()){
       getUserInfo();
      getBookings();
       getHistory();
    }
    else
    navigate("/signin"); 
    }, []);

    function bookApp(){
        navigate("/book-appointment");
    }

    const handleUpdateProfileClick = () => {
        setShowUpdateForm(true);
    };

    const handleCloseForm = (updatedPatient) => {
        setShowUpdateForm(false);
        setPatient(updatedPatient);
    };

    return (
        <>
        <div style={{ textAlign: 'center', marginTop: '3%', color:"blue"}}>
        <h3>  My Profile</h3>
        </div>
           <Container className="hover-container" style={{border:'1px solid black',marginTop:'3%',marginBottom:'3%',boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}>
                
                <Row>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th>Aarogya ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                                <th>Date Of Birth</th>
                                <th>Gender</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> {patient.patientId}</td>
                                <td> {patient.name}</td>
                                <td> {patient.email}</td>
                                <td> {patient.mobileNo}</td>
                                <td> {patient.dateOfBirth}</td>
                                <td> {patient.gender}</td>
                                <td> {patient.city}</td>
                            </tr>
                        </tbody>
                    </Table>

                </Row>
            </Container>
            <Container>
                <Col md={{ span: 4, offset: 5 }}>
                    <Button onClick={handleUpdateProfileClick}>Update Profile</Button>
                </Col>
            </Container>
            {showUpdateForm && <UpdateProfileForm patientId={patientId} initialData={patient} onClose={handleCloseForm} />}
           

            <div style={{ textAlign: 'center', marginTop: '3%', color:"blue"}}>
                        <h3>  Booked Appointments</h3>
            </div>
            <Container className="hover-container" style={{border:'1px solid black',marginTop:'3%' ,boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'}}>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Name of Doctor</th>
                            <th>Specialization</th>
                            <th>Appointment Date</th>
                            <th>Appointment Time</th>
                            <th>Appointment Status</th>
                            <th>Change Date</th>
                            <th>Change Time</th>
                            <th>Update Booking</th>
                            <th>Cancel Booking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           bookings.map((b) => {
                            // Add a check to ensure b[2] is not null before accessing its properties
                            if (b[2] !== null) {
                                return (
                                    <tr key={b[0]}> {/* Add a unique key for each mapped element */}
                                        <td>{b[2].doctorName}</td>
                                        <td>{b[2].specialization}</td>
                                        <td>{b[1]}</td>
                                        <td>{b[3]}</td>
                                        <td>{b[4]}</td>
                                        <td><input type="date" name="date" onChange={handleNewDate} required/></td>
                                        <td><input type="time" name="time" onChange={handleNewTime} required/></td>
                                        <td>
                                        <Button variant="primary" onClick={() => handleUpdate(b[0])} disabled={b[4] === 'REJECTED' || b[4] === 'ACCEPTED'}>Update</Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDelete(b[0])}>Delete</Button>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return null; // Skip rendering if b[2] is null
                            }
                        })
                        }
                    </tbody>
                </Table>
                <Col lg={4}>
        </Col>
            </Container>
            <Container>
            <Col md={{ span: 4, offset: 5 }}>
                <button onClick={bookApp}>Book An Appointment</button>
                </Col>
            </Container>
           
            <div style={{ textAlign: 'center', marginTop: '3%', color:"blue"}}>
                        <h3>  Medical History</h3>
            </div>
            <Container className="hover-container" style={{border:'1px solid black',marginTop:'3%',marginBottom:'3%',boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}>
<Table className="mt-4">
    <thead>
        <tr>
            <th>Aarogya ID</th>
            <th>Date of Visit</th>
            <th>Symptoms</th>
            <th>Medicines Prescribed</th>
            <th>Remarks</th>
        </tr>
    </thead>
    <tbody>
        {history.map((visit) => (
            <tr key={visit.recordId}>
                <td>{visit.patient.patientId}</td> {/* Assuming patientId is defined elsewhere */}
                <td>{visit.visitDate}</td>
                <td>{visit.symptoms}</td>
                <td>
                    {visit.medicines.map((medicine, index) => (
                        <div key={index}>
                            <p>{medicine.medicine}</p>
                            <p>Dosage: {medicine.dosage}</p>
                            <p>Duration: {medicine.duration}</p>
                        </div>
                    ))}
                </td>
                <td>{visit.suggestion}</td>
            </tr>
        ))}
    </tbody>
</Table>
    <Col lg={4}>
{/* {isLoggedIn ? null : <Alert variant="danger">Please Login First</Alert>} */}
</Col>
</Container>
            </>
    );
}