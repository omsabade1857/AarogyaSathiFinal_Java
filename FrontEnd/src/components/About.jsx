import React from 'react';
import Card from 'react-bootstrap/Card';
import Kanika from "../Photos/Kanika.jpg";
import Vaibhav from "../Photos/Vaibhav.jpg";
import Omkar from "../Photos/Omkar.jpg";
import Nishant from "../Photos/Nishant.jpg";
import Yash from "../Photos/Yash.jpg";
import doctors2 from "../Photos/doctors2.jpg";
import doctors1 from "../Photos/doctors1.jpg";
import doctors3 from "../Photos/doctors3.jpg";
import doctors4 from "../Photos/doctors4.jpg";
//import { Container } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faXTwitter, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './About.css';
export function About() {

  const containerStyle = {
    color: "black",
    fontFamily: "Segoe UI",
    textAlign: "center",
    marginTop: "50px", 
    marginBottom: "50px", 

  };
  return (
  <>
        <Container fluid style={{backgroundImage:
            'url("https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-101399.jpg?size=626&ext=jpg&ga=GA1.1.971321758.1707925740&semt=ais")',
          backgroundSize: "cover",
          backgroundPosition: "center",height:'600px'}}>
          
            {/* ======= Hero Section ======= */}
            <section id="hero" className="d-flex align-items-center">
                <Container>
                    <h1 style={{textAlign:'center',marginBottom:'10px', marginTop:'40px',fontFamily:'serif',}} className='fw-medium text-primary'>Welcome to Aarogya Sathi</h1>
                    <h4 style={{textAlign:'center',marginBottom:'10px',fontFamily:'Roboto'}}>
                        We are team of healthcare experts, software engineers, and innovators with a shared vision of transforming healthcare.
                    </h4>
                </Container>
            </section>
            {/* End Hero */}

   <div className="d-flex justify-content-around mt-5">
     <Card style={{ width: '23rem',backgroundColor:'#1E90FF',color:'white',marginLeft:'60px' }} className="shadow text-center">
       
       <Card.Body >
         <Card.Title className='mb-4'><h1 >Why Choose Aarogya Sathi?</h1></Card.Title>
         <Card.Text >Empowering Minds, Enhancing Lives: Welcome to Aarogya Sathi, where knowledge meets compassion. Unleash the potential within, as we journey together towards enlightenment and well-being. Discover the art of balanced living and holistic growth – because here, every step is a stride towards a brighter, healthier future.</Card.Text>
       </Card.Body>
     </Card>
     <Card style={{ width: '18rem' }} className="shadow text-center" >
       <Card.Img className="mt-4 "style={{height:"30px", width:"30px", margin:'auto'}} variant="top" src="https://cdn-icons-png.freepik.com/256/14025/14025560.png?ga=GA1.1.971321758.1707925740&semt=ais" />
       <Card.Body>
         
         <Card.Text>In the sanctuary of health, discover the harmony of mind, body, and soul. Arogya Sathi is your compass on the journey to holistic well-being, guiding you towards a life of vitality and balance</Card.Text>
       </Card.Body>
     </Card>
     <Card style={{ width: '18rem' }} className="shadow text-center">
     <Card.Img className="mt-4 "style={{height:"30px", width:"30px", margin:'auto'}} variant="top" src="https://cdn-icons-png.freepik.com/256/5291/5291527.png?ga=GA1.1.971321758.1707925740&semt=ais" />
       <Card.Body>
         
         <Card.Text>Health is the rhythm of life's melody, and Arogya Sathi is the symphony that harmonizes every note. Uncover the secrets of well-being with our transformative resources, empowering you to thrive in every chapter of your health journey.</Card.Text>
       </Card.Body>
     </Card> 
     <Card style={{ width: '18rem',marginRight:'60px' }} className="shadow text-center ">
     <Card.Img className="mt-4 "style={{height:"30px", width:"30px", margin:'auto'}} variant="top" src="https://cdn-icons-png.freepik.com/256/11305/11305935.png?ga=GA1.1.971321758.1707925740&semt=ais" />
       <Card.Body>
         
         <Card.Text>For us, wellness is not just a destination but a continuous expedition. Step into a world of knowledge, support, and inspiration, as we redefine health together. Your journey to a healthier, happier you starts here.</Card.Text>
       </Card.Body>
     </Card>
     
     </div>
    
   
        </Container>
  {/* ////////////////////////////// */}
  <div class="Content2">
        <br />
        {/* <h2 class="titletop">Take Action</h2><br /> */}
        <Row>
        <Col xs={4}>
          <img src="https://img.freepik.com/free-photo/nurse-with-stethoscope-white-medical-uniform-white-protective-sterile-mask_179666-205.jpg?size=626&ext=jpg&ga=GA1.1.971321758.1707925740&semt=sph" alt="" />
        </Col>
        <Col className='mt-5'>
          <p class="title">Health Information Security</p>
          <p class="text2" >
          Rest assured, your personal health information is safe with us. We adhere to strict data security protocols to safeguard your confidentiality and privacy.
          </p><br />

          <p class="title">Medical Records Access</p>
          <p class="text2" >
          Access your medical records securely anytime, anywhere through our patient portal. View treatment history at your convenience, ensuring you stay informed about your healthcare journey
          </p><br />

          <p class="title">Appointment Booking</p>
          <p class="text2" >
          Schedule your next appointment with ease using our online booking system. Choose your preferred date and time, and our team will confirm your appointment promptly
          </p><br />
        
        </Col>
        </Row>
        {/* <Row>
          <h4 class="text3-1">TO BECOME A PART OF Trustee</h4>
          <h6 class="text3-1">Check our <a href="#" class="a">Events</a> and become a part of it</h6>
        </Row> */}
        <br />
      </div>
{/* /////////////////////////////////////// */}
      <div className="col-lg-4 m-auto d-block mb-5 mt-5" >
        <div style={{backgroundColor:"#5d94cb"}}
          className="modal-header text-light rounded-4"
        >
          <h4 className="mb-2 mt-2 fs-1 mx-auto text-light" >Founders</h4>
        </div>
      </div>


      <Container>
      <div className="d-flex justify-content-around mt-5">
        <Card style={{ width: '18rem' }} className="shadow">
          <Card.Img style={{height:"300px"}} variant="top" src={Kanika} />
          <Card.Body>
            <Card.Title>Kanika Rawal</Card.Title>
            <Card.Text>Student, PG-DAC, CDAC Khargar<br />
              Batch - September 2023</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="shadow">
          <Card.Img style={{height:"300px"}} variant="top" src={Nishant} />
          <Card.Body>
            <Card.Title>Nishant Bangar</Card.Title>
            <Card.Text>Student, PG-DAC, CDAC Khargar<br />
              Batch - September 2023</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="shadow">
          <Card.Img style={{height:"300px"}} variant="top" src={Omkar} />
          <Card.Body>
            <Card.Title>Omkar Yelam</Card.Title>
            <Card.Text>Student, PG-DAC, CDAC Khargar<br />
              Batch - September 2023</Card.Text>
          </Card.Body>
        </Card>
        </div>
        </Container>
        <Container>
        <div className="d-flex justify-content-around mt-5">
        <Card style={{ width: '18rem' }} className="shadow">
          <Card.Img style={{height:"300px"}} variant="top" src={Vaibhav} />
          <Card.Body>
            <Card.Title>Vaibhav Yadav</Card.Title>
            <Card.Text>Student, PG-DAC, CDAC Khargar<br />
              Batch - September 2023</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="shadow">
          <Card.Img style={{height:"300px"}}  variant="top" src={Yash} />
          <Card.Body>
            <Card.Title>Yash Patil</Card.Title>
            <Card.Text>Student, PG-DAC, CDAC Juhu<br />
              Batch - September 2023</Card.Text>
          </Card.Body>
        </Card>
        </div>
        </Container>
      
    </>
  );

}

