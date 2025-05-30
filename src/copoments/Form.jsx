import React from 'react'
import { useState } from 'react';
import '../Style/form.css'
import Footer from './Footer';
import Header from './Header';
import Nacbar from './Nacbar';

import { createProfile } from '../service/profileService'

const statesIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"
];

const occupationsList = [
    "Farmer",
    "Teacher",
    "Engineer",
    "Business",
    "Government Employee",
    "Self Employed",
    "Student",
    "Other"
];

const incomeRanges = [
    "NA",
    "0 to 2 Lakhs",
    "2.1 to 5 Lakhs",
    "5.1 to 9 Lakhs",
    "Above 9 Lakhs"
];

const yesNoOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
];

const disabilityOptions = [
    "None",
    "Visual Impairment",
    "Hearing Impairment",
    "Locomotor Disability",
    "Mental Disability",
    "Other"
];

const categoryOptions = [
    "General",
    "OBC",
    "SC",
    "ST",
    "Other"
];

const ugPgStatusOptions = [
    "Not Done",
    "Pursuing",
    "Completed"
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
        country: "",
        nationality: "",
        adharcard: "",
        sportsQuota: null,
        serviceQuota: null,
        familyincome: "",
        father: {
            fname: "",
            lname: "",
            occupation: "",
            income: "",
            phone: "",
            email: ""
        },
        mother: {
            fname: "",
            lname: "",
            occupation: "",
            income: "",
            phone: "",
            email: ""
        },
        education: {
            tenth: { schoolName: "", board: "", percentage: "" },
            twelfth: { schoolName: "", boardName: "", percentage: "" },
            underGrad: { schoolName: "", percentage: "" },
            postGrad: { schoolName: "", percentage: "" }
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "sameAddress") {
            // Checkbox to copy currentaddress -> permanentaddress
            setFormData((prev) => {
                const newPermanent = checked ? prev.currentaddress : "";
                return {
                    ...prev,
                    sameAddress: checked,
                    permanentaddress: newPermanent,
                };
            });
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
            return;
        }

        // Handle boolean fields like sportsQuota, serviceQuota which can come as string "true"/"false"
        if (name === "sportsQuota" || name === "serviceQuota") {
            setFormData((prev) => ({
                ...prev,
                [name]: value === "true" ? true : value === "false" ? false : null,
            }));
            return;
        }

        // Normal fields
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle father and mother occupation "Other" input conditionally
    const handleOccupationChange = (parent, e) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                occupation: value,
                // Clear occupationOther if not "Other"
                occupationOther: value === "Other" ? prev[parent].occupationOther : "",
            },
        }));
    };

    // Validation example for Aadhaar
    const isAadhaarValid = (aadhaar) => /^\d{12}$/.test(aadhaar);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAadhaarValid(formData.adharcard)) {
            alert("Aadhaar number must be exactly 12 digits.");
            return;
        }

        // Prepare payload for backend
        // Occupation fallback: if occupation is "Other", send occupationOther
        const prepareOccupation = (parentData) =>
            parentData.occupation === "Other"
                ? parentData.occupationOther || "Other"
                : parentData.occupation;

        const payload = {
            profileBy: "self", // or some dynamic value
            person: {
                ...formData,
                sportsQuota: !!formData.sportsQuota,
                serviceQuota: !!formData.serviceQuota,
                father: {
                    ...formData.father,
                    occupation: prepareOccupation(formData.father),
                },
                mother: {
                    ...formData.mother,
                    occupation: prepareOccupation(formData.mother),
                },
            },
        };

        // Remove sameAddress from payload as it's UI only
        delete payload.person.sameAddress;

        const res = await createProfile(formData);
        console.log(res);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // console.log("Form Data Submitted: ", formData);
    //     // Submit logic here
    //     console.log(formData)
    //     const res = await createProfile(formData);
    //     console.log(res);
    // };

    return (
        <>
            <Nacbar />
            <form onSubmit={handleSubmit} style={{ maxWidth: 900, margin: "auto", padding: 20, backgroundColor: "#f0f8ff", borderRadius: 15, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                <h2 style={{ textAlign: "center", color: "#4a148c", marginBottom: 20 }}>Student Profile Form</h2>

                {/* Basic info */}
                <div>
                    <label>First Name *</label>
                    <input
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                        placeholder="First Name"
                    />
                </div>

                <div>
                    <label>Last Name *</label>
                    <input
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        required
                        placeholder="Last Name"
                    />
                </div>

                <div>
                    <label>Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                    />
                </div>

                <div>
                    <label>Date of Birth *</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label>Phone *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Phone Number"
                        maxLength={10}
                    />
                </div>

                <div>
                    <label>Disability *</label>
                    <select name="disability" value={formData.disability} onChange={handleChange} required>
                        <option value="">Select Disability</option>
                        {disabilityOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Religion *</label>
                    <input name="religion" value={formData.religion} onChange={handleChange} required placeholder="Religion" />
                </div>

                <div>
                    <label>Language *</label>
                    <input name="language" value={formData.language} onChange={handleChange} required placeholder="Language" />
                </div>

                <div>
                    <label>Category *</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categoryOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* Address */}
                <div>
                    <label>Current Address *</label>
                    <textarea
                        name="currentaddress"
                        value={formData.currentaddress}
                        onChange={handleChange}
                        required
                        placeholder="Current Address"
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="sameAddress"
                            checked={formData.sameAddress}
                            onChange={handleChange}
                        /> Permanent Address same as Current Address
                    </label>
                </div>

                <div>
                    <label>Permanent Address *</label>
                    <textarea
                        name="permanentaddress"
                        value={formData.permanentaddress}
                        onChange={handleChange}
                        required
                        placeholder="Permanent Address"
                        disabled={formData.sameAddress}
                    />
                </div>

                <div>
                    <label>City *</label>
                    <input name="city" value={formData.city} onChange={handleChange} required placeholder="City" />
                </div>

                <div>
                    <label>State *</label>
                    <select name="state" value={formData.state} onChange={handleChange} required>
                        <option value="">Select State</option>
                        {statesIndia.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Country *</label>
                    <input
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        placeholder="Country"
                    />
                </div>

                <div>
                    <label>Nationality *</label>
                    <input
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                        placeholder="Nationality"
                    />
                </div>

                <div>
                    <label>Aadhaar Card Number *</label>
                    <input
                        name="adharcard"
                        value={formData.adharcard}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val) && val.length <= 12) {
                                setFormData((prev) => ({ ...prev, adharcard: val }));
                            }
                        }}
                        required
                        placeholder="12 digit Aadhaar Number"
                        maxLength={12}
                    />
                </div>

                <div>
                    <label>Sports Quota *</label>
                    <select name="sportsQuota" value={formData.sportsQuota === null ? "" : formData.sportsQuota} onChange={handleChange} required>
                        <option value="">Select</option>
                        {yesNoOptions.map(({ label, value }) => (
                            <option key={label} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Service Quota *</label>
                    <select name="serviceQuota" value={formData.serviceQuota === null ? "" : formData.serviceQuota} onChange={handleChange} required>
                        <option value="">Select</option>
                        {yesNoOptions.map(({ label, value }) => (
                            <option key={label} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Family Income *</label>
                    <select name="familyincome" value={formData.familyincome} onChange={handleChange} required>
                        {incomeRanges.map((income) => (
                            <option key={income} value={income}>{income}</option>
                        ))}
                    </select>
                </div>

                {/* Father details */}
                <fieldset style={{ border: "1px solid #ccc", padding: 15, marginTop: 20 }}>
                    <legend><b>Father's Details</b></legend>

                    <div>
                        <label>First Name *</label>
                        <input
                            name="father.fname"
                            value={formData.father.fname}
                            onChange={handleChange}
                            required
                            placeholder="Father's First Name"
                        />
                    </div>

                    <div>
                        <label>Last Name *</label>
                        <input
                            name="father.lname"
                            value={formData.father.lname}
                            onChange={handleChange}
                            required
                            placeholder="Father's Last Name"
                        />
                    </div>

                    <div>
                        <label>Occupation *</label>
                        <select
                            name="father.occupation"
                            value={formData.father.occupation}
                            onChange={(e) => handleOccupationChange("father", e)}
                            required
                        >
                            <option value="">Select Occupation</option>
                            {occupationsList.map((occ) => (
                                <option key={occ} value={occ}>{occ}</option>
                            ))}
                        </select>
                        {formData.father.occupation === "Other" && (
                            <input
                                name="father.occupationOther"
                                value={formData.father.occupationOther}
                                onChange={handleChange}
                                placeholder="Please specify"
                                required
                            />
                        )}
                    </div>

                    <div>
                        <label>Income *</label>
                        <select
                            name="father.income"
                            value={formData.father.income}
                            onChange={handleChange}
                            required
                        >
                            {incomeRanges.map((income) => (
                                <option key={income} value={income}>{income}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Phone *</label>
                        <input
                            name="father.phone"
                            value={formData.father.phone}
                            onChange={handleChange}
                            required
                            placeholder="Father's Phone"
                            maxLength={10}
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="father.email"
                            value={formData.father.email}
                            onChange={handleChange}
                            placeholder="Father's Email"
                        />
                    </div>
                </fieldset>

                {/* Mother details */}
                <fieldset style={{ border: "1px solid #ccc", padding: 15, marginTop: 20 }}>
                    <legend><b>Mother's Details</b></legend>

                    <div>
                        <label>First Name *</label>
                        <input
                            name="mother.fname"
                            value={formData.mother.fname}
                            onChange={handleChange}
                            required
                            placeholder="Mother's First Name"
                        />
                    </div>

                    <div>
                        <label>Last Name *</label>
                        <input
                            name="mother.lname"
                            value={formData.mother.lname}
                            onChange={handleChange}
                            required
                            placeholder="Mother's Last Name"
                        />
                    </div>

                    <div>
                        <label>Occupation *</label>
                        <select
                            name="mother.occupation"
                            value={formData.mother.occupation}
                            onChange={(e) => handleOccupationChange("mother", e)}
                            required
                        >
                            <option value="">Select Occupation</option>
                            {occupationsList.map((occ) => (
                                <option key={occ} value={occ}>{occ}</option>
                            ))}
                        </select>
                        {formData.mother.occupation === "Other" && (
                            <input
                                name="mother.occupationOther"
                                value={formData.mother.occupationOther}
                                onChange={handleChange}
                                placeholder="Please specify"
                                required
                            />
                        )}
                    </div>

                    <div>
                        <label>Income *</label>
                        <select
                            name="mother.income"
                            value={formData.mother.income}
                            onChange={handleChange}
                            required
                        >
                            {incomeRanges.map((income) => (
                                <option key={income} value={income}>{income}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Phone *</label>
                        <input
                            name="mother.phone"
                            value={formData.mother.phone}
                            onChange={handleChange}
                            required
                            placeholder="Mother's Phone"
                            maxLength={10}
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="mother.email"
                            value={formData.mother.email}
                            onChange={handleChange}
                            placeholder="Mother's Email"
                        />
                    </div>
                </fieldset>

                {/* Education */}
                <fieldset style={{ border: "1px solid #ccc", padding: 15, marginTop: 20 }}>
                    <legend><b>Education Details</b></legend>

                    <h4>10th</h4>
                    <div>
                        <label>School Name *</label>
                        <input
                            name="education.tenth.schoolName"
                            value={formData.education.tenth.schoolName}
                            onChange={handleChange}
                            required
                            placeholder="10th School Name"
                        />
                    </div>

                    <div>
                        <label>Board *</label>
                        <input
                            name="education.tenth.board"
                            value={formData.education.tenth.board}
                            onChange={handleChange}
                            required
                            placeholder="10th Board"
                        />
                    </div>

                    <div>
                        <label>Percentage *</label>
                        <input
                            type="number"
                            name="education.tenth.percentage"
                            value={formData.education.tenth.percentage}
                            onChange={handleChange}
                            required
                            placeholder="10th Percentage"
                            min={0}
                            max={100}
                            step={0.01}
                        />
                    </div>

                    <h4>12th</h4>
                    <div>
                        <label>School Name *</label>
                        <input
                            name="education.twelfth.schoolName"
                            value={formData.education.twelfth.schoolName}
                            onChange={handleChange}
                            required
                            placeholder="12th School Name"
                        />
                    </div>

                    <div>
                        <label>Board *</label>
                        <input
                            name="education.twelfth.boardName"
                            value={formData.education.twelfth.boardName}
                            onChange={handleChange}
                            required
                            placeholder="12th Board"
                        />
                    </div>

                    <div>
                        <label>Percentage *</label>
                        <input
                            type="number"
                            name="education.twelfth.percentage"
                            value={formData.education.twelfth.percentage}
                            onChange={handleChange}
                            required
                            placeholder="12th Percentage"
                            min={0}
                            max={100}
                            step={0.01}
                        />
                    </div>

                    <h4>Under Graduation</h4>
                    <div>
                        <label>Status *</label>
                        <select
                            name="education.underGrad.status"
                            value={formData.education.underGrad.status}
                            onChange={handleChange}
                            required
                        >
                            {ugPgStatusOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>School Name</label>
                        <input
                            name="education.underGrad.schoolName"
                            value={formData.education.underGrad.schoolName}
                            onChange={handleChange}
                            placeholder="Undergrad College Name"
                            disabled={formData.education.underGrad.status === "Not Done"}
                        />
                    </div>

                    <div>
                        <label>Percentage</label>
                        <input
                            type="number"
                            name="education.underGrad.percentage"
                            value={formData.education.underGrad.percentage}
                            onChange={handleChange}
                            placeholder="Undergrad Percentage"
                            disabled={formData.education.underGrad.status === "Not Done"}
                            min={0}
                            max={100}
                            step={0.01}
                        />
                    </div>

                    <h4>Post Graduation</h4>
                    <div>
                        <label>Status *</label>
                        <select
                            name="education.postGrad.status"
                            value={formData.education.postGrad.status}
                            onChange={handleChange}
                            required
                        >
                            {ugPgStatusOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>School Name</label>
                        <input
                            name="education.postGrad.schoolName"
                            value={formData.education.postGrad.schoolName}
                            onChange={handleChange}
                            placeholder="Postgrad College Name"
                            disabled={formData.education.postGrad.status === "Not Done"}
                        />
                    </div>

                    <div>
                        <label>Percentage</label>
                        <input
                            type="number"
                            name="education.postGrad.percentage"
                            value={formData.education.postGrad.percentage}
                            onChange={handleChange}
                            placeholder="Postgrad Percentage"
                            disabled={formData.education.postGrad.status === "Not Done"}
                            min={0}
                            max={100}
                            step={0.01}
                        />
                    </div>
                </fieldset>

                <button type="submit" style={{ marginTop: 30, padding: "10px 30px", backgroundColor: "#4a148c", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
                    Submit
                </button>
            </form>
            <Footer />
        </>
    )
}

export default Form
