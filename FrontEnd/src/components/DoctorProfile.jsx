import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Row,
  Table,
  Modal,
  Form,
} from "react-bootstrap";
import { getUserProfile } from "../services/UserServices";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  DeleteAppointment,
  UpdateAppointment,
  acceptAppointment,
  getBookingsByDoctorId,
  getDoctorProfile,
  rejectAppointment,
  updateDoctorProfile,
  updatePassword,
} from "../services/DoctorServices";
import { isAuthenticated } from "../services/TokenUtil";
import EditDoctorProfile from "./EditDoctorProfile";

export function DoctorProfile() {
  const doctorId = sessionStorage.getItem("doctorId");
  const [successMessage, setSuccessMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    email: "",
    DateOfBirth: "",
    gender: "",
    specialization: "",
    qualification: "",
    mobileNo: "",
  });
  const [bookings, setBookings] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const getDoctorInfo = async () => {
    try {
      const result = await getDoctorProfile();
      console.log(result);
      setDoctorInfo(result.doctor);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookingsInfo = async () => {
    try {
      const result = await getBookingsByDoctorId();
      console.log(result);
      setAppointments(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleNewDate = (e) => {
    setBookingDate(e.target.value);
  };

  const handleClick = () => {
    navigate("/presform");
  };

  useEffect(() => {
    if (isAuthenticated()) {
      getDoctorInfo();
      getBookingsInfo();
    } else navigate("/dctrsignin");
  }, []);

  const handleSave = async (formData) => {
    const handleSave = async (formData) => {
      // Handle saving the edited data, then exit edit mode
      setEditMode(false);
      // Example: Call a function to update the doctor's profile
      await updateDoctorProfile(doctorId, formData);
      // Then fetch updated data
      getDoctorInfo(doctorId);
    };
  };

  // Helper function to calculate age
  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  // Filter appointments based on status
  const filteredAppointments = appointments.filter((appointment) => {
    if (statusFilter === "All") {
      return true;
    }
    return appointment[3] === statusFilter;
  });

  const handleAcceptAppointment = async (appId) => {
    try {
      console.log("inside onClickfunction" + appId);
      const response = await acceptAppointment(appId);
      getBookingsInfo(doctorId);
    } catch (error) {
      console.log("Error accepting appointment:", error);
    }
  };
  const handleRejectAppointment = async (appId) => {
    try {
      await rejectAppointment(appId);
      // Update appointments list after rejecting
      getBookingsInfo(doctorId);
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };
  const handleStatusChange = (appId, newStatus) => {
    // Update the status of the appointment with the given appId
    // You can implement this according to your backend logic
    console.log(`Changing status of appointment ${appId} to ${newStatus}`);
  };

  const handlePasswordUpdate = async () => {
    try {
      // Check if new password and confirm password match
      if (newPassword !== confirmNewPassword) {
        setError("New password and confirm password do not match");
        return;
      }

      // Check if any field is empty
      if (
        !oldPassword.trim() ||
        !newPassword.trim() ||
        !confirmNewPassword.trim()
      ) {
        setError("Please fill in all fields");
        return;
      }

      if (newPassword.length < 8) {
        setError("New password must be at least 8 characters long");
        return;
      }

      await updatePassword({
        oldPassword,
        newPassword,
        confirmNewPassword,
      });

      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setSuccessMessage("Password updated successfully");
    } catch (error) {
      setError("Error updating password:", error);
    }
  };

  return (
    <>
      <Container>
        <Container>
          <Button onClick={() => setShowPasswordModal(true)}>
            Update Password
          </Button>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </Container>
        <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
          <Container
            className="hover-container"
            style={{
              border: "1px solid black",
              marginTop: "3%",
              marginBottom: "3%",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Row>
              <Table className="mt-4">
                <thead>
                  <tr>
                    <th>Aarogya ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Specialization</th>
                    <th>Qualification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{doctorInfo.doctorId}</td>
                    <td>{doctorInfo.doctorName}</td>
                    <td>{doctorInfo.email}</td>
                    <td>{doctorInfo.mobileNo}</td>
                    <td>{doctorInfo.specialization}</td>
                    <td>{doctorInfo.qualification}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Container>
        </section>{" "}
      </Container>

      <Container>
        <div style={{ textAlign: "center", marginTop: "3%", color: "green" }}>
          <h3>Booked Appointments</h3>
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Filter by Status
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleStatusFilterChange("All")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusFilterChange("ACCEPTED")}>
              Accepted
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusFilterChange("PENDING")}>
              Pending
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusFilterChange("REJECTED")}>
              Rejected
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Table className="mt-4">
          <thead>
            <tr>
              <th>Patient's Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Patient Gender</th>
              <th>Patient Age</th>
              <th>Status</th>
              <th>Accept</th>
              <th>Reject</th>
              <th>Check Up</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((app) => (
              <tr key={app.appId}>
                <td>{app[4].name}</td>
                <td>{app[1]}</td>
                <td>{app[2]}</td> {/* Display appointment time */}
                <td>{app[4].gender}</td>
                <td>{calculateAge(app[4].dateOfBirth)}</td>
                <td>{app[3]}</td> {/* Display appointment status */}
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleAcceptAppointment(app[0])}
                    disabled={app[3] === "ACCEPTED" || app[3] === "REJECTED"}
                  >
                    Accept
                  </Button>{" "}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRejectAppointment(app[0])}
                    disabled={app[3] === "REJECTED"}
                  >
                    Reject
                  </Button>
                </td>
                <td>
                <Button variant="primary" onClick={() => handleClick()} disabled={app[3] == "PENDING" || app[3] == "REJECTED"}>
                  Check Now
                </Button>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Form.Group controlId="oldPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmNewPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPasswordModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handlePasswordUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}