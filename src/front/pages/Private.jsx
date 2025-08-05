import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const token = sessionStorage.getItem("jwt-token");
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const [userData, setUserData] = useState({
        email: "",
        id: ""
    })


    const getUserData = async () => {
        try {
            const resp = await fetch(
                apiUrl + "/protected",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                }
            );

            if (resp.status === 403) {
                throw Error("Missing or invalid token");
            }

            if (!resp.ok) {
                throw Error("Issue with login request");
            }
            const data = await resp.json();
            setUserData(data)
            console.log("This is the data you requested", data);
            return data;
        } catch (error) {
            console.error("Error fetching protected data:", error.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUserData();
        }
    }, [token]);

    return (
        <>
            {token ? (
                <div>
                    <h1>This is the private page</h1>
                    <div>
                        {userData.email}
                    </div>
                </div>
            ) : (
                <h1>You are not authorized</h1>
            )}
        </>
    );
};
