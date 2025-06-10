import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Nacbar = () => {

    const navigate = useNavigate();

    const handleLogut = async () => {
        localStorage.clear('token');
        navigate('/');
    }

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="logo">EduSupport</div>

                    <ul className="nav-links">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to={'/visa'}>Visa Info.</Link></li>
                        <li><Link to="/form">Student Form </Link></li>
                        <li><Link to="/scholarship">Scholarship </Link></li>

                        <li><button className="logout-button" onClick={handleLogut}>Logout</button></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nacbar
