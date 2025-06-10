import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            navigate('/home'); // Redirect only inside useEffect
        }
    }, [token, navigate]);

    return !token ? children : null;
};