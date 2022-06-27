import React, { useEffect } from "react";
import Loading from "../components/ui/Loading";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut()
    }, [])
    return (
        <>
            <Loading />
        </>
    );
};

export default LogOut;