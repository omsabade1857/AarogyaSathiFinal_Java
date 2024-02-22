import React, { useEffect, useState } from 'react';
import { Form, Col, Container, Table, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { BookAppointment, DoctorServices, doctorList } from '../services/DoctorServices';
import { getId } from '../services/TokenUtil';

export function Bookings() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    populateDoctorState();
  }, []);

  async function populateDoctorState() {
    try {
      const result = await doctorList();
      setDoctors(result.data);
      // Initialize booking details state with empty values for each doctor
      setBookingDetails(result.data.map(doctor => ({ doctorId: doctor.doctorId, bookingDate: "", bookingTime: "" })));
    } catch (error) {
      console.log(error);
    }
  }

  const handleBookingDateChange = (doctorId, dateValue) => {
    setBookingDetails(prevState => {
      const updatedDetails = [...prevState];
      const doctorIndex = updatedDetails.findIndex(detail => detail.doctorId === doctorId);
      updatedDetails[doctorIndex].bookingDate = dateValue;
      return updatedDetails;
    });
  }

  const handleBookingTimeChange = (doctorId, timeValue) => {
    setBookingDetails(prevState => {
      const updatedDetails = [...prevState];
      const doctorIndex = updatedDetails.findIndex(detail => detail.doctorId === doctorId);
      updatedDetails[doctorIndex].bookingTime = timeValue;
      return updatedDetails;
    });
  }

  const handleSubmit = async (doctorId) => {
    const doctorBooking = bookingDetails.find(detail => detail.doctorId === doctorId);
    const { bookingDate, bookingTime } = doctorBooking;

    if (!bookingDate) {
      alert("Appointment date is required");
      return;
    }
    if (!bookingTime) {
      alert("Appointment time is required");
      return;
    }

    const patientId = getId();
    const booking = { doctorId, visitDate: bookingDate, visitTime: bookingTime, patientId };

    try {
      await BookAppointment(booking);
      alert("Appointment booked successfully");
      navigate("/myprofile");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  }

  return (
    <Container>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>Doctor's Name</th>
            <th>Qualification</th>
            <th>Specialization</th>
            <th>Enter date</th>
            <th>Enter time</th>
            <th>Book Now</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.doctorId}>
              <td>{doctor.doctorName}</td>
              <td>{doctor.qualification}</td>
              <td>{doctor.specialization}</td>
              <td>
                <Form.Control type="date" name="date" value={bookingDetails.find(detail => detail.doctorId === doctor.doctorId)?.bookingDate || ""} onChange={(e) => handleBookingDateChange(doctor.doctorId, e.target.value)} required />
              </td>
              <td>
                <Form.Control type="time" name="time" value={bookingDetails.find(detail => detail.doctorId === doctor.doctorId)?.bookingTime || ""} onChange={(e) => handleBookingTimeChange(doctor.doctorId, e.target.value)} required />
              </td>
              <td>
                <Button variant="primary" onClick={() => handleSubmit(doctor.doctorId)}>Book Now</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Col lg={4}>
        {!isLoggedIn && <Alert variant="danger">Please Login First</Alert>}
      </Col>
    </Container>
  );
}