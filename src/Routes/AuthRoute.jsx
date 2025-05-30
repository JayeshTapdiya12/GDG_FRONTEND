import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    return !token ? children : navigate('/home');;
};
