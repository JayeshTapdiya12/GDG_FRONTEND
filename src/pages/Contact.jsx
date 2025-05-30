import React from 'react'
import Nacbar from '../copoments/Nacbar'
import Footer from '../copoments/Footer'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import '../Style/Conatct.css'
const Contact = () => {
    return (
        <>
            <Nacbar />
            <div className="contact-page" data-aos="fade-up">
                <h1>Contact Us</h1>

                <div className="contact-info">
                    <div className="info-box" data-aos="fade-right">
                        <FaMapMarkerAlt className="icon" />
                        <h3>Our Location</h3>
                        <p>Indore<br /> India</p>
                    </div>

                    <div className="info-box" data-aos="zoom-in">
                        <FaPhoneAlt className="icon" />
                        <h3>Phone</h3>
                        <p>+91 7456981230</p>
                    </div>

                    <div className="info-box" data-aos="fade-left">
                        <FaEnvelope className="icon" />
                        <h3>Email</h3>
                        <p>support@edusupport.in</p>
                    </div>
                </div>

                <div className="contact-form" data-aos="fade-up">
                    <h2>Send Us a Message</h2>
                    <form>
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea rows="5" placeholder="Your Message" required></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact
