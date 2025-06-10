import React, { useEffect, useState } from 'react'
import { ScholarshipData } from '../service/profileService'
import Nacbar from '../copoments/Nacbar';
import Footer from '../copoments/Footer';
import '../Style/Scholarship.css'

// import ScholarshipResult from './ScholarshipResult';

const Scholarship = () => {
    const [data, setData] = useState({ result: "", sop: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScholarshipData = async () => {
            try {
                const response = await ScholarshipData();
                console.log("Raw Response from API:", response.data);

                const result = response?.data?.result || "";
                const sop = response?.data?.sop || "";

                setData({ result, sop });
                console.log("Data set in state:", { result, sop });
                setLoading(false);
            } catch (error) {
                console.error("API error:", error);
                setLoading(false);
            }
        };

        fetchScholarshipData();
    }, []);

    const formatText = (text) =>
        text.split("\n").map((line, index) => (
            <p key={index} className="mb-2">{line}</p>
        ));

    if (loading) return <> <Nacbar /><div className="text-center mt-8">Loading...</div></>;

    return (
        <>
            <Nacbar />
            <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-xl mt-10">
                <h1 className="text-2xl font-bold text-center mb-6">🎓 Scholarship Recommendation</h1>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2 text-blue-900">📘 Recommendation Summary:</h2>
                    <div className="bg-blue-50 p-4 rounded-md">
                        {formatText(data.result)}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2 text-green-900">✍️ SOP:</h2>
                    <div className="bg-green-50 p-4 rounded-md">
                        {formatText(data.sop)}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

};

export default Scholarship
