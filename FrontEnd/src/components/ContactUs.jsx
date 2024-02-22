import React from 'react';
import './ContactUs.css';

export function ContactUs(){
  const phoneNumber = "+1 (123) 456-7890";
  const emailAddress = "contact@Aarogyasathi.com";

  return (
    <div className="contact-container"style={{height:'500px',backgroundImage:
      'url("https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-101399.jpg?size=626&ext=jpg&ga=GA1.1.971321758.1707925740&semt=ais")',
    backgroundSize: "cover",
    backgroundPosition: "center"}} >
      <h1 className='fw-medium text-primary' style={{fontFamily:'serif'}}>Contact Us</h1>
      <p>Feel free to reach out to us for any inquiries or questions.</p>

      <div className="contact-details">
        <p>Phone: {phoneNumber}</p>
        <p>Email: {emailAddress}</p>
      </div>

      <div className="additional-details">
        <h2 className='fw-medium text-primary' style={{fontFamily:'serif'}}>Additional Information</h2>
        <p>Our office hours are Monday to Friday, 9:00 AM - 5:00 PM.</p>
        <p>We usually respond to emails within 24 hours.</p>
        <p>Address: Raintree Marg, near Bharati Vidyapeeth, Sector 7, CBD Belapur, Navi Mumbai, Maharashtra 400614</p>
        <div className="social-links">
          
        </div>
      </div>
    </div>
  );
};


