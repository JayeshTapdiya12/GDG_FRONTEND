import React from 'react'
import '../Style/Scholarship.css'

const ScholarshipResult = ({ result, sop }) => {
    return (
        <div>
            <div className="scholarship-container">
                <h2 className="title">Scholarship Recommendations</h2>
                <div className="result-box">
                    {result
                        ? result.split('\n').map((line, index) => <p key={index}>{line}</p>)
                        : <p>No result available</p>}
                </div>

                <h2 className="title">Statement of Purpose</h2>
                <div className="sop-box">
                    {sop
                        ? sop.split('\n').map((line, index) => <p key={index}>{line}</p>)
                        : <p>No SOP provided</p>}
                </div>
            </div>
        </div>
    )
}

export default ScholarshipResult
