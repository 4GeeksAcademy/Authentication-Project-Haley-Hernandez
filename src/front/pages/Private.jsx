import React, { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const token = sessionStorage.getItem("jwt-token");

    const getUserData = async () => {
        try {
            const resp = await fetch(
                `https://fictional-acorn-wrxrj49675v6hgjp9-3001.app.github.dev/api/protected`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
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
    }, []);

    return (
        <>
            {token ? (
                <h1>This is the private page</h1>
            ) : (
                <h1>You are not authorized</h1>
            )}
        </>
    );
};
