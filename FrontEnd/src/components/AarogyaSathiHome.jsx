import React from 'react';
import { Carousel, Container, Col, Row, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Navigate, useNavigate } from "react-router-dom";
import './CalmConnect.css';
import doctors2 from "../Photos/doctors2.jpg";
import doctors1 from "../Photos/doctors1.jpg";
import doctors3 from "../Photos/doctors3.jpg";

import doctors4 from "../Photos/doctors4.jpg";
//import { Container } from 'react-bootstrap';
//import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';

export function AarogyaSathiHome() {
    const navigate = useNavigate();
    function dctrLogin() {
        navigate("/dctrsignin");
    }
    function adminLogin() {
        navigate("/adminsignin");
    }
    function patientLogin() {
        navigate("/signin");
    }
    function patientSignUp() {
        navigate("/signup");
    }
    const containerStyle = {
        color: "black",
        fontFamily: "Segoe UI",
        textAlign: "center",
        marginTop: "50px", 
        marginBottom: "50px", 
    
      };
    const currentYear = new Date().getFullYear();
    return (
        <>
            <Container fluid className="container-fluid mt-4" >
                <Col lg={12} >
                    <Carousel >
                        <Carousel.Item >
                            <img
                                className="d-block w-100"
                                //src="https://www.aimprosoft.com/wp-content/uploads/2020/06/How-to-Create-a-Hospital-Management-Software.png"
                                //src="https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?w=1060&t=st=1707989385~exp=1707989985~hmac=2861e1632c6a81241de30887449d6e654dea905db8bd02b3dca1d2652ab8051f"
                                src="https://img.freepik.com/free-photo/doctor-patient_1421-64.jpg?w=1060&t=st=1707989650~exp=1707990250~hmac=4bc7f56e83dd239dfcde175df8d52e75fafe53f12fcf4e331598b1f7838b8414"
                                //src="https://img.freepik.com/free-photo/medical-banner-with-doctor-wearing-goggles_23-2149611193.jpg?size=626&ext=jpg&ga=GA1.1.971321758.1707925740&semt=sph"
                                alt="First slide"
                                style={{height:'600px'}}
                            // height={600}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                //src="https://acropolium.com/img/articles/hospital-management-software/img01.jpg"
                                src="https://img.freepik.com/free-photo/clean-empty-hospital-ward-ready-receive-patients-reflecting-modern-medical-care_91128-4460.jpg?w=1380&t=st=1707989598~exp=1707990198~hmac=ecaa1d814f11a0798111b4c3e46fd680d273f63a89ade4a6df3933e959e93043"
                                alt="Second slide"
                                // height={600}
                                style={{height:'600px'}}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                //src="https://miro.medium.com/v2/resize:fit:1200/1*A4Q1kK-pEP61zC6ErDwplg.jpeg"
                                //src="https://img.freepik.com/free-photo/doctor-patient_1421-64.jpg?w=1060&t=st=1707989650~exp=1707990250~hmac=4bc7f56e83dd239dfcde175df8d52e75fafe53f12fcf4e331598b1f7838b8414"
                                src="https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?w=1060&t=st=1707989385~exp=1707989985~hmac=2861e1632c6a81241de30887449d6e654dea905db8bd02b3dca1d2652ab8051f"

                                alt="Third slide"
                                // height={600}
                                style={{height:'600px'}}
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Container>

            <Container className="mt-5 mb-5">

                <div className="bg-light text-dark px-4 py-0 text-center">
                    <div className="py-5">
                        <div className="row">
                            <div className="col-3" />
                            <div className="col-1">
                                <img src="sahaas triangle.png" alt="" />
                            </div>
                            <div className="col-5">
                                <h2 className="display-6 fw-medium text-primary">
                                    Health is Wealth!
                                </h2>
                            </div>
                            <div className="col-3" />
                        </div>
                        <div className="col-lg-6 mx-auto">
                            <p className="fs-5 mb-1 mt-4">
                                Wellness can be defined as the act of practicing healthy habits in all areas of your life,
                                including health, fitness, mindfulness, mental health and social well-being.
                            </p>
                        </div>
                    </div>
                </div>
        </Container >
      {/* //////////////////////////////////// */}
      <Container fluid>
      <Row>
      <h1 className="section-heading fw-medium text-primary mb-4"><span className="mb-6" style={{fontFamily:'serif',marginLeft:'150px'}}>News and Announcements</span></h1>

      <Col lg={6} style={{ width:'700px'}}>
      <Container fluid className="row align-items-center section-news">
        
            <div className="col-md-12">
                <div className="holder">
                    <div className="mt-6" style={{backgroundColor:'#def1f8'}}>
                        <div className="tickercontainer">
                            <marquee behavior="scroll" scrollamount="5" direction="up" scrolldelay="6" style={{fontFamily:'serif'}}>
                                <div className="mask">
                                    <ul id="ticker01" className="newsticker" style={{ height: '300px' }}>
                                        <li><span>12/02/2024</span><p><br/>The 2008 <a href="">Health Information Management Systems Society's</a> (HIMSS) Analytics Report: <a href="">Security of Patient Data,</a>which surveyed 263 health professionals in February, found that:</p></li>
                                        <li><span>Loopholes in data management standards allow data breaches to go unreported, preventing an accurate measurement of frequency;</span></li>
                                        <li><span><p>56% of organizations surveyed that had data breaches notified the patients involved;</p></span></li>
                                        
                                        <li><span>14/02/2024</span><p><br/>BE ALERT!!<br />BEWARE OF FAKE CALLS/SMS !!!<br />We never demands patients to pay extra amount online for Doctors Fees via phone or SMS. Any such request should be considered as a fraud call.<br />Please don't share OTP / UPI pin with anyone.</p></li>
                                        <li><span>18/02/2024</span><p><br />Impact of technology on the future of healthcare<br />Global healthcare and IT market size were remarked at a value of US$74.2 billion in 2020</p></li>
                                        <li><span>21/02/2024</span><p><br />Did you know…?<br />STIs impact young people the hardest. In the U.S., almost half of all new infections in 2018 were among people aged 15-24.</p></li>

                                        <li><p>सावधान रह|!!<br /><br />ऑनलाइन अधिक पैसे भरण्याची मागणी करत नाहीत. अशी कोणतीही विनंती, फसवणूक कॉल मानली जावी. कृपया OTP / UPI पिन कुणालाही शेयर करू नका.</p></li>
                                        <li><p>बिमारियों को हटायें, खुशियों को बनायें<br /></p></li>
                                    </ul>
                                </div>
                            </marquee>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Container>
        </Col>
        <Col lg={5} className=''>
          <img src="https://scienceleadership.org/media/open/42356" alt="" style={{height:'323px', width:'800px'}} />
        </Col>
        </Row>
        </Container>
      {/* /////////////////////////////////// */}
        <Container fluid style={containerStyle}  >
          <Row>
            <Col lg={6}>
              <img src="banner.jpg" alt=""style={{height:'300px'}} />
            </Col>
            <Col lg={6}>

              <h3 className='fw-medium text-primary mb-4'>Welcome to Aarogya Sathi where healthcare meets innovation!</h3>
              {/* </Container>
      <Container style={containerStyle} > */}
              <p className="col-lg-10 m-auto d-block fs-5">
                Aarogya Sathi is a collaborative effort of a dynamic team of healthcare
                experts, software engineers, and innovators. With a shared vision of
                transforming healthcare delivery, we bring together expertise from the
                medical field and the tech industry to create a platform that redefines
                the patient-doctor relationship.
              </p>
            </Col>
          </Row>
        </Container>
{/* //////////////////////////////////////////////////////// */}

  

{/* //////////////////////////////////////////////////////////// */}
 
      <div className="col-lg-4 m-auto d-block mb-5">
        <div style={{backgroundColor:"#5d94cb"}}
          className="modal-header text-light rounded-4"
        >
          <h4 className="mb-2 mt-2 fs-1 mx-auto text-light" >Doctors</h4>
        </div>
      </div>
   <Container className='mb-5 mt-5'>
    <Row>
      <Col lg={6}>
      <div class="card mb-3 shadow p-3 mb-5 bg-body-tertiary rounded"style={{width:'600px'}}className='lg-6'>
  <div class="row g-0">
    <div class="col-md-4">
      <img src={doctors2} class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body" style={{marginLeft:'10px',marginTop:'30px'}}>
        <h5 style={{marginBottom:'10px'}} class="card-title" >Dr. Riya Sharma</h5>
        <p class="card-text">Chief Medical Officer, Orthopaedic Surgeon<br></br><hr></hr> M.B.B.S., M.S.</p>
        <div>
        <FontAwesomeIcon icon={faEnvelope} className="icon " />
        &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="black" className="bi bi-facebook" viewBox="0 0 16 16">
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
        </svg>&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="black" className="bi bi-linkedin" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
        </svg>
        </div>
        {/* <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
      </div>
    </div>
  </div>
</div>
      </Col>
      <Col lg={6}>
      <div class="card mb-3 shadow p-3 mb-5 bg-body-tertiary rounded"style={{width:'600px'}}className='lg-6'>
  <div class="row g-0">
    <div class="col-md-4">
      <img src={doctors1} class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body" style={{marginLeft:'10px',marginTop:'30px'}}>
        <h5 style={{marginBottom:'10px'}} class="card-title" >Dr. Aarav Kumar</h5>
        <p class="card-text">Cardiologist<br></br><hr></hr> M.B.B.S., M.D</p>
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
        &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="black" className="bi bi-facebook" viewBox="0 0 16 16">
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
        </svg>&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="black" className="bi bi-linkedin" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
        </svg>
        {/* <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
      </div>
    </div>
  </div>
</div>
      </Col>
    </Row>
    <Row className='mt-5'>
      <Col lg={6}>
      <div class="card mb-3  shadow p-3 mb-5 bg-body-tertiary rounded"style={{width:'600px'}}className='lg-6'>
  <div class="row g-0">
    <div class="col-md-4">
      <img src={doctors3} class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body" style={{marginLeft:'10px',marginTop:'30px'}}>
        <h5 style={{marginBottom:'10px'}} class="card-title" >Dr. Advait Patel</h5>
        <p class="card-text">Ophthalmologist<br></br><hr></hr> M.B.B.S</p>
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
        {/* <FontAwesomeIcon icon={faXTwitter}className="icon"/> */}
        {/* <FontAwesomeIcon icon={faTwitter} /> */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg> */}
        {/* <FontAwesomeIcon icon="fa-brands fa-x-twitter" /> */}&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="black" className="bi bi-facebook" viewBox="0 0 16 16">
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
        </svg>&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="black" className="bi bi-linkedin" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
        </svg>
        {/* <i class="fa-brands fa-twitter"></i> */}
        {/* <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
      </div>
    </div>
  </div>
</div>
      </Col>
      <Col lg={6}>
      <div class="card mb-3 shadow p-3 mb-5 bg-body-tertiary rounded"style={{width:'600px'}}className='lg-6'>
  <div class="row g-0">
    <div class="col-md-4">
      <img src={doctors4} class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body" style={{marginLeft:'10px',marginTop:'30px'}}>
        <h5 style={{marginBottom:'10px'}} class="card-title" >Dr. Naina Reddy</h5>
        <p class="card-text">Dermatologist<br></br><hr></hr> M.B.B.S., M.D.</p>
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
        &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="black" className="bi bi-facebook" viewBox="0 0 16 16">
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
        </svg>&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="black" className="bi bi-linkedin" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
        </svg>
        {/* <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
      </div>
    </div>
  </div>
</div>
      </Col>
    </Row>

</Container>
        <Container style={containerStyle} >
          <h3 className='fw-medium text-primary'>-Frequently Asked Questions on Aarogyasathi- </h3>
        </Container>

              <Container className='mb-5'>
                <Accordion>
                    <Accordion.Item eventKey="0" className=' mb-1 shadow p-3 mb-1 bg-body-light rounded'>
                        <Accordion.Header>FAQ 1: What is Aarogyasathi Website About?</Accordion.Header>
                        <Accordion.Body>
                        Aarogyasathi site is a digital platform designed to streamline hospital operations, including patient registration, appointment scheduling, medical records management, billing, and more.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className=' mb-1 shadow p-3 mb-1 bg-body-light rounded'>
                        <Accordion.Header>FAQ 2: How can I register as a patient in the Aarogyasathi?</Accordion.Header>
                        <Accordion.Body>
                        Patients can register by visiting the hospital's website. They need to provide personal details such as name, contact information, address,age etc.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className=' mb-1 shadow p-3 mb-1 bg-body-light rounded'>
                        <Accordion.Header>FAQ 3: Can I book appointments with doctors online?</Accordion.Header>
                        <Accordion.Body>
                        Yes, we offer online appointment booking features. Patients can log in to their accounts, view the availability of doctors, and schedule appointments according to the doctors convenience.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3" className=' mb-1 shadow p-3 mb-1 bg-body-light rounded'>
                        <Accordion.Header>FAQ 4: What is the difference between a psychiatrist and a psychologist?</Accordion.Header>
                        <Accordion.Body>
                        Psychiatrists are medical doctors who specialize in mental health and can prescribe medication. They often treat mental health conditions with a combination of medication and therapy. Psychologists, on the other hand, are trained in psychology and provide therapy or counseling to help individuals cope with mental health issues using various talk therapies and behavioral interventions.
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item eventKey="4" className=' mb-1 shadow p-3 mb-1 bg-body-light rounded'>
                        <Accordion.Header>FAQ 5: How do I know if I need therapy?</Accordion.Header>
                        <Accordion.Body>
                        There's no strict rule for when therapy is needed, but some signs might indicate it could be beneficial. Persistent feelings of sadness, anxiety, difficulty coping with daily life, relationship issues, major life changes, or trauma can all be reasons to seek therapy. If these feelings or experiences interfere with your ability to function or enjoy life, therapy can offer support and strategies to navigate these challenges.
                        </Accordion.Body>
                    </Accordion.Item> */}
                    <Accordion.Item eventKey="4" className=' mb-1 shadow p-3 mb-1 bg-body-light rounded'>
                        <Accordion.Header>FAQ 5: What are some self-care practices for mental health?</Accordion.Header>
                        <Accordion.Body>
                        Self-care involves activities that promote well-being and reduce stress. These can include regular exercise, mindfulness or meditation, maintaining a healthy diet, getting enough sleep, engaging in hobbies or activities you enjoy, setting boundaries, seeking social support, and practicing relaxation techniques like deep breathing or progressive muscle relaxation.
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item eventKey="6" className=' mb-1 shadow p-3 mb-1 bg-body-light rounded'>
                        <Accordion.Header>FAQ 7: Can mental health conditions be cured?</Accordion.Header>
                        <Accordion.Body>
                        Mental health conditions are often manageable with treatment, but "cure" might not be the right term. Recovery looks different for everyone and might involve a combination of therapy, medication, lifestyle changes, and support networks. Some individuals may experience periods of remission or improvement where symptoms are less severe or absent, while others may learn to manage their condition effectively to lead fulfilling lives.
                        </Accordion.Body>
                    </Accordion.Item> */}
                    </Accordion> 
            </Container>
            
            {/* <Container >
                <Row >
                    <Col lg={4}>
                        <Card className="card" style={{width:'350px',height:'450px'}}>
                            <Card.Img src="https://static.vecteezy.com/system/resources/previews/005/015/246/original/doctor-icon-in-trendy-long-shadow-style-isolated-on-soft-blue-background-free-vector.jpg" style={{width:'315px'}} />
                            <Card.Body className='text-center'>
                                <Card.Title>Doctor</Card.Title>
                                <Button onClick={dctrLogin} className='mt-4'>Login</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="card" style={{width:'350px',height:'450px'}}>
                            <Card.Img variant="top" src="https://media.istockphoto.com/id/1097493802/vector/patient-icon-customer-icon-with-add-additional-sign-patient-icon-and-new-plus-positive.jpg?s=612x612&w=0&k=20&c=IrugHP6i-oobykGTLg7kCHP-SPENaDFxhQKAIdM9XuI=" style={{width:'315px' ,height:'350px'}} />
                            <Card.Body className='text-center'>
                                <Card.Title>Patient</Card.Title>
                                <Row>
                                    <Col lg={2}></Col>
                                    <Col lg={4} ><Button onClick={patientLogin} className='mt-4'>Login</Button></Col>

                                    <Col lg={4} > <Button onClick={patientSignUp} className='mt-4'>SignUp</Button></Col>
                                    <Col lg={2}></Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="card" style={{width:'330px'}}>
                            <Card.Img variant="top" src="https://i.pngimg.me/thumb/f/720/comvecteezy287717.jpg" className='mt-4' height={300} style={{width:'300px'}} />
                            <Card.Body className='text-center'>
                                <Card.Title>Admin</Card.Title>
                                <Button onClick={adminLogin} className='mt-4'>Login</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
              */}
            </>
            
    );
}