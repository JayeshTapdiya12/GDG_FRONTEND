import React, { useEffect, useState } from 'react';
import Nacbar from '../copoments/Nacbar';
import Footer from '../copoments/Footer';
import { getUserProfile } from '../service/profileService';
import '../Style/Profile.css';

const Profile = () => {
    const [student, setStudent] = useState({});

    const fetchProfile = async () => {
        try {
            const res = await getUserProfile();
            const personData = res?.data?.data?.person;
            setStudent(personData || {});
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <>
            <Nacbar />
            <div className="profile-container">
                <h1 className="profile-title">🎓 Student Profile</h1>

                {/* Student Info */}
                <div className="section-card">
                    <h2>👤 Student Information</h2>
                    <div className="info-grid">
                        <p><strong>Full Name:</strong> {student.fname} {student.lname}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>DOB:</strong> {student.dob}</p>
                        <p><strong>Gender:</strong> {student.gender}</p>
                        <p><strong>Phone:</strong> {student.phone}</p>
                        <p><strong>Aadhar:</strong> {student.adharcard}</p>
                        <p><strong>Disability:</strong> {student.disability}</p>
                        <p><strong>Religion:</strong> {student.religion}</p>
                        <p><strong>Language:</strong> {student.language}</p>
                        <p><strong>Category:</strong> {student.category}</p>
                        <p><strong>Family Income:</strong> {student.familyincome}</p>
                        <p><strong>Sports Quota:</strong> {student.sportsQuota ? "Yes" : "No"}</p>
                        <p><strong>Service Quota:</strong> {student.serviceQuota ? "Yes" : "No"}</p>
                        <p><strong>Nationality:</strong> {student.nationality}</p>
                        <p><strong>Current Address:</strong> {student.currentaddress}</p>
                        <p><strong>Permanent Address:</strong> {student.permanentaddress}</p>
                        <p><strong>City:</strong> {student.city}</p>
                        <p><strong>State:</strong> {student.state}</p>
                        <p><strong>Country:</strong> {student.country}</p>
                    </div>
                </div>

                {/* Father Info */}
                <div className="section-card">
                    <h2>👨 Father's Information</h2>
                    <div className="info-grid">
                        <p><strong>Name:</strong> {student.father?.fname} {student.father?.lname}</p>
                        <p><strong>Occupation:</strong> {student.father?.occupation}</p>
                        <p><strong>Income:</strong> {student.father?.income}</p>
                        <p><strong>Phone:</strong> {student.father?.phone}</p>
                        <p><strong>Email:</strong> {student.father?.email}</p>
                    </div>
                </div>

                {/* Mother Info */}
                <div className="section-card">
                    <h2>👩 Mother's Information</h2>
                    <div className="info-grid">
                        <p><strong>Name:</strong> {student.mother?.fname} {student.mother?.lname}</p>
                        <p><strong>Occupation:</strong> {student.mother?.occupation}</p>
                        <p><strong>Income:</strong> {student.mother?.income}</p>
                        <p><strong>Phone:</strong> {student.mother?.phone}</p>
                        <p><strong>Email:</strong> {student.mother?.email}</p>
                    </div>
                </div>

                {/* Education Info */}
                <div className="section-card">
                    <h2>📚 Education Details</h2>

                    {/* 10th */}
                    <div className="edu-subsection">
                        <h3>📘 10th Standard</h3>
                        <p><strong>School Name:</strong> {student.education?.tenth?.schoolName}</p>
                        <p><strong>Board:</strong> {student.education?.tenth?.board}</p>
                        <p><strong>Percentage:</strong> {student.education?.tenth?.percentage}%</p>
                    </div>

                    {/* 12th */}
                    <div className="edu-subsection">
                        <h3>📙 12th Standard</h3>
                        <p><strong>School Name:</strong> {student.education?.twelfth?.schoolName}</p>
                        <p><strong>Board:</strong> {student.education?.twelfth?.boardName}</p>
                        <p><strong>Percentage:</strong> {student.education?.twelfth?.percentage}%</p>
                    </div>

                    {/* Undergraduate */}
                    <div className="edu-subsection">
                        <h3>🎓 Undergraduate</h3>
                        <p><strong>College Name:</strong> {student.education?.underGrad?.schoolName || "NA"}</p>
                        <p><strong>Percentage:</strong> {student.education?.underGrad?.percentage || "NA"}%</p>
                    </div>

                    {/* Postgraduate */}
                    <div className="edu-subsection">
                        <h3>📕 Postgraduate</h3>
                        <p><strong>College Name:</strong> {student.education?.postGrad?.schoolName || "NA"}</p>
                        <p><strong>Percentage:</strong> {student.education?.postGrad?.percentage || "NA"}%</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
