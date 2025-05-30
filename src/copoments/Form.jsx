import React from 'react'
import { useState } from 'react';
import '../Style/form.css'
import Footer from './Footer';
import Header from './Header';
import Nacbar from './Nacbar';

import { createProfile } from '../service/profileService'

const statesOfIndia = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
];

const occupationOptions = [
    "Farmer",
    "Teacher",
    "Engineer",
    "Doctor",
    "Business",
    "Government Service",
    "Self-Employed",
    "Unemployed",
    "Other",
];

const incomeOptions = [
    { value: "", label: "Select Income" },
    { value: "na", label: "N/A" },
    { value: "0-2", label: "0 to 2 Lakhs" },
    { value: "2.1-5", label: "2.1 to 5 Lakhs" },
    { value: "5.1-9", label: "5.1 to 9 Lakhs" },
    { value: "above-9", label: "Above 9 Lakhs" },
];

const educationStatusOptions = [
    { value: "", label: "Select Status" },
    { value: "completed", label: "Completed" },
    { value: "not_done", label: "Not Done" },
    { value: "na", label: "N/A" },
];

const Form = () => {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        dob: "",
        gender: "",
        phone: "",
        disability: "",
        religion: "",
        language: "",
        category: "",
        currentaddress: "",
        permanentaddress: "",
        city: "",
        state: "",
        country: "India",
        nationality: "Indian",
        adharcard: "",
        sportsQuota: null,
        serviceQuota: null,
        familyincome: "",
        father: {
            fname: "",
            lname: "",
            occupation: "",
            otherOccupation: "",
            income: "",
            phone: "",
            email: "",
        },
        mother: {
            fname: "",
            lname: "",
            occupation: "",
            otherOccupation: "",
            income: "",
            phone: "",
            email: "",
        },
        education: {
            tenth: { schoolName: "", board: "", percentage: "" },
            twelfth: { schoolName: "", boardName: "", percentage: "" },
            underGrad: { status: "", schoolName: "", percentage: "" },
            postGrad: { status: "", schoolName: "", percentage: "" },
        },
        sameAddress: false,
    });

    // Handle nested changes, including multiple levels (like father.occupation)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "sameAddress") {
            setFormData((prev) => ({
                ...prev,
                sameAddress: checked,
                permanentaddress: checked ? prev.currentaddress : "",
            }));
            return;
        }

        if (name.includes(".")) {
            const parts = name.split(".");
            if (parts.length === 3) {
                const [section, field, subfield] = parts;
                setFormData((prev) => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: {
                            ...prev[section][field],
                            [subfield]: value,
                        },
                    },
                }));
            } else if (parts.length === 2) {
                const [section, field] = parts;
                setFormData((prev) => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: value,
                    },
                }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle radio button changes
    const handleRadioChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Copy current address into permanent address on checkbox toggle
    const handleSameAddressChange = (e) => {
        const checked = e.target.checked;
        setFormData((prev) => ({
            ...prev,
            sameAddress: checked,
            permanentaddress: checked ? prev.currentaddress : "",
        }));
    };

    // Occupation handling with "Other" option
    const handleOccupationChange = (e, parent) => {
        const val = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                occupation: val,
                otherOccupation: val === "Other" ? prev[parent].otherOccupation : "",
            },
        }));
    };

    const handleOtherOccupationChange = (e, parent) => {
        const val = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                otherOccupation: val,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        // Submit logic here
        const res = await createProfile(formData);
        console.log(res);
    };
    return (
        <>
            <Nacbar />
            {/* <div className="form-container"> */}
            <form onSubmit={handleSubmit} className="student-form">
                <h2>Student Registration Form</h2>

                {/* Basic Info */}
                <label>First Name *</label>
                <input
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                    placeholder="First Name"
                />

                <label>Last Name</label>
                <input
                    type="text"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    placeholder="Last Name"
                />

                <label>Email *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                />

                <label>Date of Birth *</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <label>Gender *</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label>Disability</label>
                <select
                    name="disability"
                    value={formData.disability}
                    onChange={handleChange}
                >
                    <option value="">Select Disability</option>
                    <option value="none">None</option>
                    <option value="visual">Visual Impairment</option>
                    <option value="hearing">Hearing Impairment</option>
                    <option value="physical">Physical Disability</option>
                    <option value="other">Other</option>
                </select>

                <label>Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    <option value="general">General</option>
                    <option value="obc">OBC</option>
                    <option value="sc">SC</option>
                    <option value="st">ST</option>
                    <option value="ews">EWS</option>
                </select>

                <label>Current Address *</label>
                <textarea
                    name="currentaddress"
                    value={formData.currentaddress}
                    onChange={handleChange}
                    required
                    placeholder="Current Address"
                    rows={3}
                ></textarea>

                <label>
                    <input
                        type="checkbox"
                        name="sameAddress"
                        checked={formData.sameAddress}
                        onChange={handleSameAddressChange}
                    />{" "}
                    Permanent address is same as current
                </label>

                <label>Permanent Address *</label>
                <textarea
                    name="permanentaddress"
                    value={formData.permanentaddress}
                    onChange={handleChange}
                    required
                    placeholder="Permanent Address"
                    rows={3}
                    disabled={formData.sameAddress}
                ></textarea>

                <label>City *</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="City"
                />

                <label>State *</label>
                <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select State</option>
                    {statesOfIndia.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>

                <label>Country *</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    placeholder="Country"
                    disabled
                />

                <label>Nationality *</label>
                <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    placeholder="Nationality"
                    disabled
                />

                <label>Aadhar Card Number</label>
                <input
                    type="text"
                    name="adharcard"
                    value={formData.adharcard}
                    onChange={handleChange}
                    placeholder="Aadhar Card Number"
                />

                {/* Quotas */}
                <label>Sports Quota</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="sportsQuota"
                            value="yes"
                            checked={formData.sportsQuota === "yes"}
                            onChange={() => handleRadioChange("sportsQuota", "yes")}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sportsQuota"
                            value="no"
                            checked={formData.sportsQuota === "no"}
                            onChange={() => handleRadioChange("sportsQuota", "no")}
                        />
                        No
                    </label>
                </div>

                <label>Service Quota</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="serviceQuota"
                            value="yes"
                            checked={formData.serviceQuota === "yes"}
                            onChange={() => handleRadioChange("serviceQuota", "yes")}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="serviceQuota"
                            value="no"
                            checked={formData.serviceQuota === "no"}
                            onChange={() => handleRadioChange("serviceQuota", "no")}
                        />
                        No
                    </label>
                </div>

                <label>Family Income *</label>
                <select
                    name="familyincome"
                    value={formData.familyincome}
                    onChange={handleChange}
                    required
                >
                    {incomeOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>

                {/* Father's Details */}
                <h3>Father's Details</h3>
                <label>First Name *</label>
                <input
                    type="text"
                    name="father.fname"
                    value={formData.father.fname}
                    onChange={handleChange}
                    required
                    placeholder="Father's First Name"
                />
                <label>Last Name</label>
                <input
                    type="text"
                    name="father.lname"
                    value={formData.father.lname}
                    onChange={handleChange}
                    placeholder="Father's Last Name"
                />

                <label>Occupation *</label>
                <select
                    name="father.occupation"
                    value={formData.father.occupation}
                    onChange={(e) => handleOccupationChange(e, "father")}
                    required
                >
                    <option value="">Select Occupation</option>
                    {occupationOptions.map((occ) => (
                        <option key={occ} value={occ}>
                            {occ}
                        </option>
                    ))}
                </select>

                {formData.father.occupation === "Other" && (
                    <input
                        type="text"
                        name="father.otherOccupation"
                        value={formData.father.otherOccupation}
                        onChange={(e) => handleOtherOccupationChange(e, "father")}
                        placeholder="Specify Occupation"
                        required
                    />
                )}

                <label>Annual Income *</label>
                <select
                    name="father.income"
                    value={formData.father.income}
                    onChange={handleChange}
                    required
                >
                    {incomeOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>

                <label>Phone Number</label>
                <input
                    type="tel"
                    name="father.phone"
                    value={formData.father.phone}
                    onChange={handleChange}
                    placeholder="Father's Phone"
                />

                <label>Email</label>
                <input
                    type="email"
                    name="father.email"
                    value={formData.father.email}
                    onChange={handleChange}
                    placeholder="Father's Email"
                />

                {/* Mother's Details */}
                <h3>Mother's Details</h3>
                <label>First Name *</label>
                <input
                    type="text"
                    name="mother.fname"
                    value={formData.mother.fname}
                    onChange={handleChange}
                    required
                    placeholder="Mother's First Name"
                />
                <label>Last Name</label>
                <input
                    type="text"
                    name="mother.lname"
                    value={formData.mother.lname}
                    onChange={handleChange}
                    placeholder="Mother's Last Name"
                />

                <label>Occupation *</label>
                <select
                    name="mother.occupation"
                    value={formData.mother.occupation}
                    onChange={(e) => handleOccupationChange(e, "mother")}
                    required
                >
                    <option value="">Select Occupation</option>
                    {occupationOptions.map((occ) => (
                        <option key={occ} value={occ}>
                            {occ}
                        </option>
                    ))}
                </select>

                {formData.mother.occupation === "Other" && (
                    <input
                        type="text"
                        name="mother.otherOccupation"
                        value={formData.mother.otherOccupation}
                        onChange={(e) => handleOtherOccupationChange(e, "mother")}
                        placeholder="Specify Occupation"
                        required
                    />
                )}

                <label>Annual Income *</label>
                <select
                    name="mother.income"
                    value={formData.mother.income}
                    onChange={handleChange}
                    required
                >
                    {incomeOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>

                <label>Phone Number</label>
                <input
                    type="tel"
                    name="mother.phone"
                    value={formData.mother.phone}
                    onChange={handleChange}
                    placeholder="Mother's Phone"
                />

                <label>Email</label>
                <input
                    type="email"
                    name="mother.email"
                    value={formData.mother.email}
                    onChange={handleChange}
                    placeholder="Mother's Email"
                />

                {/* Education Details */}
                <h3>Education Details</h3>

                <h4>10th Standard</h4>
                <label>School Name</label>
                <input
                    type="text"
                    name="education.tenth.schoolName"
                    value={formData.education.tenth.schoolName}
                    onChange={handleChange}
                    placeholder="10th School Name"
                />
                <label>Board Name</label>
                <input
                    type="text"
                    name="education.tenth.board"
                    value={formData.education.tenth.board}
                    onChange={handleChange}
                    placeholder="10th Board"
                />
                <label>Percentage</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    name="education.tenth.percentage"
                    value={formData.education.tenth.percentage}
                    onChange={handleChange}
                    placeholder="10th Percentage"
                />

                <h4>12th Standard</h4>
                <label>School Name</label>
                <input
                    type="text"
                    name="education.twelfth.schoolName"
                    value={formData.education.twelfth.schoolName}
                    onChange={handleChange}
                    placeholder="12th School Name"
                />
                <label>Board Name</label>
                <input
                    type="text"
                    name="education.twelfth.boardName"
                    value={formData.education.twelfth.boardName}
                    onChange={handleChange}
                    placeholder="12th Board"
                />
                <label>Percentage</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    name="education.twelfth.percentage"
                    value={formData.education.twelfth.percentage}
                    onChange={handleChange}
                    placeholder="12th Percentage"
                />

                <h4>Undergraduate</h4>
                <label>Status</label>
                <select
                    name="education.underGrad.status"
                    value={formData.education.underGrad.status}
                    onChange={handleChange}
                >
                    {educationStatusOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <label>College/University Name</label>
                <input
                    type="text"
                    name="education.underGrad.schoolName"
                    value={formData.education.underGrad.schoolName}
                    onChange={handleChange}
                    placeholder="Undergraduate Institution"
                />
                <label>Percentage/CGPA</label>
                <input
                    type="text"
                    name="education.underGrad.percentage"
                    value={formData.education.underGrad.percentage}
                    onChange={handleChange}
                    placeholder="Undergraduate Percentage/CGPA"
                />

                <h4>Postgraduate</h4>
                <label>Status</label>
                <select
                    name="education.postGrad.status"
                    value={formData.education.postGrad.status}
                    onChange={handleChange}
                >
                    {educationStatusOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <label>College/University Name</label>
                <input
                    type="text"
                    name="education.postGrad.schoolName"
                    value={formData.education.postGrad.schoolName}
                    onChange={handleChange}
                    placeholder="Postgraduate Institution"
                />
                <label>Percentage/CGPA</label>
                <input
                    type="text"
                    name="education.postGrad.percentage"
                    value={formData.education.postGrad.percentage}
                    onChange={handleChange}
                    placeholder="Postgraduate Percentage/CGPA"
                />

                <button type="submit">Submit</button>
            </form>
            <Footer />
        </>
    )
}

export default Form
