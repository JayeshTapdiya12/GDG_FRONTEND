import React, { useState } from 'react'
import '../Style/login.css'
import { Link, useNavigate } from 'react-router-dom';
// import image from '../assets/image.png'

import { login } from '../service/userService';
import Header from '../copoments/Header';
import Footer from '../copoments/Footer';



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const send = async () => {
        if (email === null || password === null) {
            alert("Please enter all the details.");
            console.log("enter ther details")

        } else {
            try {
                const res = await login(email, password);
                console.log(res);

                localStorage.setItem("token", res?.data?.data);
                navigate('/home');

            } catch (error) {
                alert("Login failed. Please try again.");

            }
        }
    }

    const handleLogin = async () => {
        send();
    }

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="login-left">
                    {/* <img src={image} alt="Online Ecommerce website Shopping" className="login-image" style={{ borderRadius: "15vw" }} /> */}
                    <p>ScholarShip Portal</p>
                </div>
                <div className="login-right">
                    <div className="login-box">
                        <div className="login-header">
                            <h2 className='active-tab'>LOGIN</h2>
                            <Link to={'/sign'} style={{ textDecoration: "none" }}>
                                <h2 className='inactive-tab'>SIGNUP</h2>
                            </Link>
                        </div>
                        <div className="input-group">
                            <label>Email Id</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="forgot-password">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button onClick={handleLogin} className="login-button">Login</button>
                        <div className="or-divider">OR</div>
                        <div className="social-login">
                            <button className="social-button facebook">Facebook</button>
                            <button className="social-button google">Google</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;
