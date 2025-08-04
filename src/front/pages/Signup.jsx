import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../index.css";
import { use } from "react";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalReducer()
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(apiUrl+"/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                navigate("/login");
            const data = await response.json(); // optional: get the JSON response
            console.log("User created:", data);
            return data;
            } 
        } catch (error) {
            console.error("Error during signup:", error);
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
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
