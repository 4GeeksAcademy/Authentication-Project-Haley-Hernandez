import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../index.css";
import { use } from "react";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [store, dispatch] = useGlobalReducer // this i need help figuring out 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password
        };

        try {
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                navigate("/login");
            } else {
                const data = await response.json();
                console.log("Signup failed:", data);
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
