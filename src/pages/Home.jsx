import React from 'react'

import Header from '../copoments/Header'
import Footer from '../copoments/Footer'
import About from './About'
import Nacbar from '../copoments/Nacbar'
import HomeInfo from './HomeInfo'
import { NavLink } from 'react-router-dom'
const Home = () => {
    return (
        <>
            {/* <Header /> */}
            <Nacbar />
            <section className="hero">
                <h1 className="hero-title">Supporting Students from Low-Income Families</h1>
                <p className="hero-description">
                    Breaking financial barriers to education and empowering dreams.
                </p>
                <NavLink to={'/form'}><button className="hero-button" >Get Started</button></NavLink>
                <img
                    src="https://images.unsplash.com/photo-1596495577886-d920f1a8f6f2?auto=format&fit=crop&w=800&q=80"
                    alt="Students studying"
                    className="hero-image"
                />
            </section>

            <section className="features">
                <h2 className="section-title">How We Help</h2>
                <div className="features-container">
                    <div className="feature-card">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                            alt="Scholarship Icon"
                            className="feature-icon"
                        />
                        <h3>Scholarships & Grants</h3>
                        <p>Helping students access funds to pay fees and buy books.</p>
                    </div>
                    <div className="feature-card">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1250/1250685.png"
                            alt="Resources Icon"
                            className="feature-icon"
                        />
                        <h3>Free Learning Resources</h3>
                        <p>Providing access to online courses, notes, and study materials.</p>
                    </div>
                    <div className="feature-card">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                            alt="Mentorship Icon"
                            className="feature-icon"
                        />
                        <h3>Mentorship & Support</h3>
                        <p>Guiding students through academic and career challenges.</p>
                    </div>
                </div>
            </section>

            <section className="impact">
                <h2 className="section-title">Our Impact</h2>
                <p className="section-text">
                    Over 10,000 students supported, 85% continuing education post-pandemic,
                    and growing every day.
                </p>
                <img
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
                    alt="Group of students"
                    className="impact-image"
                />
            </section>


            <HomeInfo />
            <Footer />
        </>
    )
}

export default Home
