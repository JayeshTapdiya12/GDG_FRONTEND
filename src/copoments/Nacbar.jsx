import React from 'react'
import { Link } from "react-router-dom";
const Nacbar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="logo">EduSupport</div>

                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/form">Student Form </Link></li>
                        <li><button className="logout-button">Logout</button></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nacbar
