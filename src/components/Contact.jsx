import React from 'react'
import '../css/Contact.css'
import { Link } from 'react-router-dom';


const Contact = () => {
  return (
    <div className='contact-page flex-column align-items-center'>
    <h2 className='fs-1 b-3 text-uppercase fw-bold'>Where to Find Us</h2>
    <p className='mb-5'>
      <div className="map-container">
        <iframe 
          title="Google Map"
          width="100%" 
          height="100%" 
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.6193195499627!2d88.41285357529668!3d22.443349679583918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0272166e4cb263%3A0x27f12170efd9ddee!2sFuture%20Institute%20of%20Engineering%20and%20Management!5e0!3m2!1sen!2sin!4v1739679942092!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </p>
    <h3>Working Hours</h3>
      <p>Mon - Sat: 8:00-21:00</p>
      <p>Sun: 10:00-19:00</p>

      <Link to="/about">
        <button type='button' className='btn btn-outline-dark btn-lg'>
          Check Us Out!
        </button>
      </Link>

      <Link to="/">
        <button type='button' className='btn btn-outline-dark btn-lg'>
          Go to first page!
        </button>
      </Link>
      

<p><b><center>CONTACT US: 8653015622</center></b></p>
            <a href="tell:8653015622" className="contact-button">
               <center>CALL US NOW</center> 
            </a>

            <p><center>Email: <a href="mailto:sutapak2903@gmail.com">sutapak2903@gmail.com</a></center></p>
    </div>
  
  )
}

export default Contact