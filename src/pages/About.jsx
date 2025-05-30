import React from 'react'
import Nacbar from '../copoments/Nacbar';
import Footer from '../copoments/Footer';

import '../Style/About.css';

const About = () => {
    return (
        <>
            <Nacbar />
            <div className="about-page">
                <h1>About Us</h1>

                <section className="about-section mission">
                    <h2>🎯 Our Mission</h2>
                    <p>
                        We are on a mission to empower students from financially weaker sections by providing a platform that supports their education journey through awareness, accessibility, and resources.
                    </p>
                </section>

                <section className="about-section vision">
                    <h2>🌟 Our Vision</h2>
                    <p>
                        We envision a future where every student, regardless of their financial background, has equal access to quality education and opportunities to grow.
                    </p>
                </section>

                <section className="about-section story">
                    <h2>📚 Our Story</h2>
                    <p>
                        After witnessing a rise in dropouts during the COVID-19 pandemic due to fee-related challenges, our team decided to build a solution that could bridge the financial gap for students and ensure no one is left behind.
                    </p>
                </section>

                <section className="about-section problem">
                    <h2>🧩 The Problem We Solve</h2>
                    <p>
                        Many families struggle to pay tuition and school-related costs. This leads to a cycle of dropouts, missed opportunities, and continued poverty. We’re here to break that cycle.
                    </p>
                </section>

                <section className="about-section unique">
                    <h2>🚀 What Makes Us Unique</h2>
                    <ul>
                        <li>✅ Easy-to-use application form</li>
                        <li>🔐 Secure document handling</li>
                        <li>🌐 Online access across devices</li>
                        <li>📊 Transparent, fair evaluation</li>
                        <li>🤝 Community and mentor support</li>
                    </ul>
                </section>

                <section className="about-section help">
                    <h2>🎓 Who We Help</h2>
                    <p>
                        We support school and college students, especially those from rural areas, marginalized communities, and families impacted by economic hardships.
                    </p>
                </section>

                <section className="about-section team">
                    <h2>👥 Our Team</h2>
                    <p>
                        Created by a passionate group of student developers with a mission to change lives through technology and empathy.
                    </p>
                </section>

                <section className="about-section quote">
                    <h2>💬 Inspiring Thought</h2>
                    <blockquote>
                        “Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela
                    </blockquote>
                </section>

                <section className="about-section cta">
                    <h2>📩 Join Us</h2>
                    <p>
                        Want to be part of the change? <a href="/form">Click here to fill out the support form</a> and start your journey toward a better education.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default About;
