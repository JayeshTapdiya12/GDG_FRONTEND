import React from 'react'
import '../Style/InfoCard.css'
const HomeInfo = () => {
    return (
        <>
            <div className="info-card-container">
                <div className="info-card">
                    <h2>💡 Our Mission</h2>
                    <p>
                        We aim to help students from underprivileged backgrounds overcome financial barriers to education by offering resources, support, and awareness.
                    </p>
                </div>

                <div className="info-card">
                    <h2>📊 Impact</h2>
                    <p>
                        Over <strong>1,200+ students</strong> assisted, <strong>300+ scholarships</strong> enabled, and <strong>500+ mentors</strong> engaged across India since 2023.
                    </p>
                </div>

                <div className="info-card">
                    <h2>🌐 Vision</h2>
                    <p>
                        A future where every student, regardless of background, can access quality education and unlock their full potential.
                    </p>
                </div>

                <div className="info-card">
                    <h2>🚀 Features</h2>
                    <ul>
                        <li>✔️ Simple online form submission</li>
                        <li>✔️ Fast application review process</li>
                        <li>✔️ Support across multiple academic streams</li>
                        <li>✔️ Transparent and secure documentation</li>
                    </ul>
                </div>

                <div className="info-card">
                    <h2>🛠️ How It Works</h2>
                    <ol>
                        <li>📄 Register on our platform</li>
                        <li>📝 Fill out the funding application form</li>
                        <li>📂 Upload required documents</li>
                        <li>🤝 Get matched with available financial support</li>
                    </ol>
                </div>
            </div>
        </>
    )
}

export default HomeInfo
