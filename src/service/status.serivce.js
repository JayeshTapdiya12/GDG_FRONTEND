import axios from "axios";

// const baseUrl = 'http://localhost:4000/api/v1/profile';
const baseUrl = 'http://localhost:4000/api/v1/status';



const token = localStorage.getItem('token')
const headers = { headers: { 'Authorization': 'Bearer ' + token } }

export const submitStatus = async (formData) => {
    return await axios.post(baseUrl, formData, headers);
};

// Get all status entries for the current user
export const getStatusList = async () => {
    return await axios.get(baseUrl, headers);
};

// Update a specific status entry
export const updateStatus = async (id, status) => {
    return await axios.patch(`${baseUrl}/${id}`, { status }, headers);
};

// Delete a specific status entry
export const deleteStatus = async (id) => {
    return await axios.delete(`${baseUrl}/${id}`, headers);
};