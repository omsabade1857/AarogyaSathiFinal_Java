import React, { useState } from 'react';
import { adminSignup } from '../services/UserServices';
import { Alert, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

export function AdminSignup() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    name: '', email: '', password: '', dateOfBirth: '', gender: '', city: '', mobileNo: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminSignup(formData);
      console.log('Admin signed up successfully:', response);
      setFormData({ email: "", password: "" });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        navigate("/admindashboard");
      }, 1500);
      console.log(response.message);

    } catch (error) {
      console.error('Error signing up admin:', error);
      // Handle error here
    }
  };
  const validateField = (fieldName, value) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = 'Invalid email address';
        }
        break;
      case 'password':
        const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(value)) {
          errorMessage = 'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one digit';
        }
        break;
      default:
        break;
  }
  
  setErrors({
    ...errors,
    [fieldName]: errorMessage,
});
};
const validateForm = () => {
  let isValid = true;

  Object.keys(formData).forEach((fieldName) => {
      const value = formData[fieldName];
      validateField(fieldName, value);
      if (errors[fieldName]) {
          isValid = false;
      }
  });

  return isValid;
};

        return (
          <div className="container mt-5">
            <Col md={{ span: 7, offset: 5 }}>
              <h2>Admin Sign Up</h2>
            </Col>
            <form onSubmit={handleSubmit}>
              <Col md={{ span: 6, offset: 3 }}>
                <div className="form-group" >
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={isSubmitted ? formData.email : null}                
                    onChange={handleChange}
                    onBlur={() => validateField('email', formData.email)}
                    required
                  />
                  {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
              </Col>
              <Col md={{ span: 6, offset: 3 }}>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={isSubmitted ? formData.password : null}
                    onChange={handleChange}
                    onBlur={() => validateField('password', formData.password)}
                    required
                  />
                   {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </div>
              </Col>
              <Col md={{ span: 2, offset: 6 }} style={{ width: '100px', marginLeft: '600px' }}>
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </Col>
            </form>
            <Row className="mt-3">
              <Col md={{ span: 4, offset: 4 }}>
                {isSubmitted ? <Alert variant="success">Sign Up Successfully Completed!</Alert> : null}
              </Col>
            </Row>

          </div>
        );
    }

   