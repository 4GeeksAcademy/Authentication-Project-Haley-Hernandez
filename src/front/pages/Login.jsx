import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../index.css"



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer()
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(apiUrl + "/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json(); 
            console.log("Logged in successful:", data);
            sessionStorage.setItem("jwt-token", data.token);
            navigate("/private")
            return data;
        } catch (error) {
            console.error("Error during Login:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;