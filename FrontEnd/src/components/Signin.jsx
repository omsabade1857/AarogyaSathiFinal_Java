import { useState } from "react";
import { Alert, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../services/UserServices.js";


export function Signin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login(formData);
            console.log(result);
         
            if(result.body.role=="ROLE_PATIENT") {
                sessionStorage.setItem("token", result.body.token);
                sessionStorage.setItem("id",result.body.id);
                navigate("/myprofile");
            }
            else {
                if(result.body.role=="ROLE_DOCTOR") {
                    sessionStorage.setItem("token", result.body.token);
                    sessionStorage.setItem("id",result.body.id);
                    navigate("/doctorprofile");    
                }
              
                else
                if(result.body.role=="ROLE_ADMIN") {
                    sessionStorage.setItem("token", result.body.token);
                    sessionStorage.setItem("id",result.body.id);
                   
                    navigate("/admindashboard");
                }
                if(result.statusCodeValue === 401){
                    setLoginError(true);
                setTimeout(() => {
                    setLoginError(false);
                }, 1500);
                }
            }
        } catch (error) {
            console.log(error);
            setLoginError(true);
        }
    }
    return (
        // <Container style={{ height:455 , marginTop:40}} md={{ span: 3, offset: 5 }} >
        <Container  fluid style={{
            height: 600,
            backgroundImage:
              'url("https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-101399.jpg?size=626&ext=jpg&ga=GA1.1.971321758.1707925740&semt=ais")',
            backgroundSize: "cover"}} >
            <Row>
                {/* <Col md={{ span: 4, offset: 4 }}> */}
                <Col lg={6} style={{
          height: 600,
          backgroundImage:
            'url("https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-101399.jpg?size=626&ext=jpg&ga=GA1.1.971321758.1707925740&semt=ais")',
          backgroundSize: "cover",
          backgroundPosition: "center"}} >
                    <Form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center mt-5">
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" style={{ width: '400px'}} placeholder="Enter email" name="email" onChange={handleChange} required/>
                        </Form.Group>
                        </div>
                         <div className="d-flex justify-content-center">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" style={{ width: '400px' }} placeholder="Password" name="password" onChange={handleChange} required/>
                        </Form.Group>
                        </div>

                        <Button variant="primary" type="submit" className="d-block mx-auto">
                            Login
                        </Button>
                    </Form>
                  
                    <Row className="mt-2">
                    <Col md={{ span: 6, offset: 3 }}>
             {loginError ? <Alert variant="danger">Invalid Email or Password!</Alert> : null}
         </Col>
            </Row>
           
                <div className="text-center">
                    <p>Not a registered member yet?</p>

                    <Link to="/signup">Click Here to Sign Up</Link>       </div>
                </Col>
                <Col lg={6}>
                <Image style={{height:'600px'}} width={800} src="https://img.freepik.com/premium-photo/medicine-doctor-team-meeting-analysis_34200-351.jpg?w=1060" />
                </Col>
            </Row>
        
         
     
        </Container>
         
    );
}