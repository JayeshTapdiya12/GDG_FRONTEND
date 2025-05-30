import axios from "axios";

const baseUrl = 'http://localhost:4000/api/v1/profile';


const token = localStorage.getItem('token')
const headers = { headers: { 'Authorization': 'Bearer ' + token } }

export const getUserProfile = async () => {
    const data = await axios.get(`${baseUrl}`, headers);
    return data;
}

export const createProfile = async () => {

    const data = {

    }

    const res = await axios.post(`${baseUrl}`, data, headers);
    return res;
}