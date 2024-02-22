import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import './NavigationBar.css';
import { isAuthenticated } from "../services/TokenUtil";

export function NavigationBar() {
    const navigate = useNavigate();
    function signOut(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
        navigate("/");
    }

    return (
        <Navbar className="bar" expand="lg">
            <Container >
            <Link className="navbar-brand mt-0" to="/">
             <img
                //src="HMS1.png"
                src="https://media.istockphoto.com/vectors/health-care-center-icon-flat-design-vector-id613137144?k=6&m=613137144&s=170667a&w=0&h=3OVopZCydrAzlDvUsV7AQv3q_rHKvqYvGYAfWN8zAIY="
                alt=""
                style={{ height: "50px", width: "70px"}}
            />
            </Link>
            <span className="fs-3 text-light">Arogya sathi</span>&nbsp; &nbsp;
                {/* <Link to="/">
                    <Navbar.Brand className="textcolor">Aarogya Sathi</Navbar.Brand>
                </Link> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"> 
                    {/* {isAuthenticated() ?<>
                        <LinkContainer to="/myprofile">
                            <Nav.Link className="textcolor">My Profile</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/book-appointment">
                            <Nav.Link className="textcolor">Book An Appointment</Nav.Link>
                        </LinkContainer></>:''} */}
                        <LinkContainer to="/about">
                            <Nav.Link className="textcolor">About Us</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contact">
                            <Nav.Link className="textcolor">Contact Us</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="right">
                        {isAuthenticated() ?
                            <>
                            {/* <Sidebar>Menu</Sidebar> */}
                            
                            <Button variant="light" onClick={signOut}>
                            Sign Out
                            </Button> 
            
                        
                            </>

                             :

                            <>

                                <LinkContainer to="/signin">
                                    <Nav.Link className="textcolor">Sign In </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/signup">
                                    <Nav.Link className="textcolor">Sign Up</Nav.Link>
                                </LinkContainer>
                            </>
                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}