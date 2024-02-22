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
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    populateDoctorState();
  }, []);

  async function populateDoctorState() {
    try {
      const result = await doctorList();
      setDoctors(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBookingDateChange = (e) => {
    const dateValue = e.target.value;
    setBookingDate(dateValue);
    if (!dateValue) {
      setDateError("Appointment date is required");
    } else {
      setDateError("");
    }
  }

  const handleBookingTimeChange = (e) => {
    const timeValue = e.target.value;
    setBookingTime(timeValue);
    if (!timeValue) {
      setTimeError("Appointment time is required");
    } else {
      setTimeError("");
    }
  }

  const handleSubmit = async (doctorId) => {
    if (!bookingDate) {
      setDateError("Appointment date is required");
      return;
    }
    if (!bookingTime) {
      setTimeError("Appointment time is required");
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
                <Form.Control type="date" name="date" value={bookingDate} onChange={handleBookingDateChange} required />
                {dateError && <span className="text-danger">{dateError}</span>}
              </td>
              <td>
                <Form.Control type="time" name="time" value={bookingTime} onChange={handleBookingTimeChange} required />
                {timeError && <span className="text-danger">{timeError}</span>}
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
