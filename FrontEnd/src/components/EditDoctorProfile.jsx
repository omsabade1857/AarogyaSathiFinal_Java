import React, { useState } from "react";
import { updateDoctorProfile } from "../services/DoctorServices"; // Import the updateDoctorProfile service method
import { useNavigate } from "react-router-dom";
import { Container, Table } from 'react-bootstrap';

const EditDoctorProfile = ({ initialData, onSave ,onClose}) => {
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const updatedData=await updateDoctorProfile(formData.doctorId, formData);
      onSave(formData);
    onClose(updatedData);
    alert('Profile updated successfully');
    } catch (error) {
      console.log("Error updating doctor profile:", error);
    }
  };

  return (
  //   <form className="edit-doctor-profile-form">
  //     <div className="container">
  //       <div className="row">
  //         <div className="col">
  //           <div className="form-group" required>
  //             <label>Doctor Name:</label>
  //             <input type="text" name="doctorName" value={formData.doctorName} onChange= {handleChange} required/>
  //           </div>
  //           <div className="form-group" required>
  //             <label>Email:</label>
  //             <input
  //               type="email"
  //               name="email"
  //               value={formData.email}
  //               onChange={handleChange}
  //               className="form-control"
  //             />
  //           </div>
  //         </div>
  //         <div className="col">
  //           <div className="form-group" required>
  //             <label>Specialization:</label>
  //             <input
  //               type="text"
  //               name="specialization"
  //               value={formData.specialization}
  //               onChange={handleChange}
  //               className="form-control"
  //             />
  //           </div>
  //           <div className="form-group" required>
  //             <label>Qualification:</label>
  //             <input
  //               type="text"
  //               name="qualification"
  //               value={formData.qualification}
  //               onChange={handleChange}
  //               className="form-control" 
  //             />
  //           </div>
  //           <div className="form-group">
  //             <label>Mobile Number:</label>
  //             <input
  //               type="text"
  //               name="mobileNo"
  //               value={formData.mobileNo}
  //               onChange={handleChange}
  //               className="form-control" 
  //               required
  //             />
  //           </div>
  //           <div className="form-group">
  //             <button
  //               type="submit"
  //               className="btn btn-primary"
  //               onClick={handleSubmit}
  //             >
  //               Save
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </form>
  // );

  <form className="edit-doctor-profile-form">
  <Container style={{ border: '1px solid black', marginTop: '3%', marginBottom: '3%', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}>
    <Table className="mt-4">
      <tbody>
        <tr>
          <td>Doctor Name:</td>
          <td>
            <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} required />
          </td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
          </td>
        </tr>
        <tr>
          <td>Specialization:</td>
          <td>
            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="form-control" required />
          </td>
        </tr>
        <tr>
          <td>Qualification:</td>
          <td>
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="form-control" required />
          </td>
        </tr>
        <tr>
          <td>Mobile Number:</td>
          <td>
            <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="form-control" required />
          </td>
        </tr>
      </tbody>
    </Table>
  </Container>
  <button className='UpdateProfileButton' type="submit" onClick={handleSubmit}>Save</button>
</form>
  );
};

export default EditDoctorProfile;
