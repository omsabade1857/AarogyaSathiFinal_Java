import React, { useState } from 'react';
import { updateUserProfile, updatePassword } from '../services/UserServices'; // Import updatePassword function
import { Container, Table } from 'react-bootstrap';
import './UpdateProfileForm.css'; 

function UpdateProfileForm({ patientId, initialData, onClose }) {
    const [patientData, setPatientData] = useState(initialData);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [profileErrors, setProfileErrors] = useState({
        name: '',
        email: '',
        mobileNo: '',
        dateOfBirth: '',
        city: ''
    });
    const [passwordErrors, setPasswordErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
        validateProfileField(name, value);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
        validatePasswordField(name, value);
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (validateProfileForm()) {
            try {
                await updateUserProfile(patientId, patientData);
                onClose(patientData); 
                alert('Profile updated successfully');
            } catch (error) {
                console.error('Error updating profile:', error);
                alert('Error updating profile. Please try again.');
            }
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (validatePasswordForm()) {
            try {
                await updatePassword(patientId, passwordData.oldPassword, passwordData.newPassword, passwordData.confirmNewPassword);
                alert('Password updated successfully');
            } catch (error) {
                console.error('Error updating password:', error);
                if (error.response && error.response.status === 400 && error.response.data && error.response.data.message) {
                    const errorMessage = error.response.data.message;
                    if (errorMessage.includes('Old password')) {
                        alert('Wrong old password');
                    } else if (errorMessage.includes('New password')) {
                        alert('New password and confirm password do not match');
                    } else {
                        alert('Error updating password. Please try again.');
                    }
                } else {
                    alert('Error updating password. Please try again.');
                }
            }
        }
    };

    const validateProfileField = (fieldName, value) => {
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (value.trim().length < 4) {
                    errorMessage = 'Name must be at least 4 characters';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Invalid email address';
                }
                break;
            case 'mobileNo':
                const mobileNoRegex = /^\d{10}$/;
                if (!mobileNoRegex.test(value)) {
                    errorMessage = 'Phone number must be 10 digits';
                }
                break;
            case 'dateOfBirth':
                const currentDate = new Date();
            const selectedDate = new Date(value);
            if (selectedDate >= currentDate) {
                errorMessage = 'Date of birth must be a past date';
            }
                
                break;
            case 'city':
                const cityRegex = /^[a-zA-Z\s]+$/;
                if (!cityRegex.test(value)) {
                    errorMessage = 'Only letters and spaces are allowed';
                }
                break;
            default:
                break;
        }

        setProfileErrors({
            ...profileErrors,
            [fieldName]: errorMessage,
        });
    };

    const validateProfileForm = () => {
        let isValid = true;

        Object.keys(patientData).forEach((fieldName) => {
            const value = patientData[fieldName];
            validateProfileField(fieldName, value);
            if (profileErrors[fieldName]) {
                isValid = false;
            }
        });

        return isValid;
    };

    const validatePasswordField = (fieldName, value) => {
        let errorMessage = '';

        switch (fieldName) {
            case 'oldPassword':
                // Add validation for old password if needed
                break;
            case 'newPassword':
                const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}$/;
                if (!passwordRegex.test(value)) {
                    errorMessage = 'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one digit';
                }
                break;
            case 'confirmNewPassword':
                if (value !== passwordData.newPassword) {
                    errorMessage = 'Passwords do not match';
                }
                break;
            default:
                break;
        }

        setPasswordErrors({
            ...passwordErrors,
            [fieldName]: errorMessage,
        });
    };

    const validatePasswordForm = () => {
        let isValid = true;

        Object.keys(passwordData).forEach((fieldName) => {
            const value = passwordData[fieldName];
            validatePasswordField(fieldName, value);
            if (passwordErrors[fieldName]) {
                isValid = false;
            }
        });

        return isValid;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
             <form className="update-profile-form" onSubmit={handleProfileSubmit}>
                <Container className="hover-container" style={{border:'1px solid black', marginTop:'3%', marginBottom:'3%', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'}}>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile No</th>
                                <th>Date of Birth</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="input-container">
                                        <input type="text" name="name" value={patientData.name} onChange={handleProfileChange} required />
                                        <div className="error">{profileErrors.name}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input-container">
                                        <input type="tel" name="mobileNo" value={patientData.mobileNo} onChange={handleProfileChange} required />
                                        <div className="error">{profileErrors.mobileNo}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input-container">
                                        <input type="date" name="dateOfBirth" value={patientData.dateOfBirth} onChange={handleProfileChange} required />
                                        <div className="error">{profileErrors.dateOfBirth}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input-container">
                                        <input type="text" name="city" value={patientData.city} onChange={handleProfileChange} required />
                                        <div className="error">{profileErrors.city}</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
                <button className='UpdateProfileButton' type="submit">Update Profile</button>
            </form>

            <form className="update-profile-form" onSubmit={handlePasswordSubmit}>
                <Container className="hover-container" style={{border:'1px solid black', marginTop:'3%', marginBottom:'3%', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'}}>
                    <Table className="mt-4">
                        <tbody>
                            <tr>
                                <td>Old Password</td>
                                <td>
                                    <div className="input-container">
                                        <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} required />
                                        <div className="error">{passwordErrors.oldPassword}</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>New Password</td>
                                <td>
                                    <div className="input-container">
                                        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required />
                                        <div className="error">{passwordErrors.newPassword}</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Confirm New Password</td>
                                <td>
                                    <div className="input-container">
                                        <input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} required />
                                        <div className="error">{passwordErrors.confirmNewPassword}</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
                <button className='UpdateProfileButton' type="submit">Update Password</button>
            </form>
        </>
    );
}

export default UpdateProfileForm;