import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Private = () => {

    const { store, dispatch } = useGlobalReducer()
    const token = sessionStorage.getItem("jwt-token");



    return (
        <>
            {token ? (
                <h1>This is the private page</h1>
            ) : (
                <h1>You are not authorized</h1>
            )}
        </>
    )

}; 