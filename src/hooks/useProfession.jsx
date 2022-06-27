import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import profService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContenxt = React.createContext();
export const useProfessions = () => {
    return useContext(ProfessionContenxt);
};
export const ProfessionProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [profession, setProfession] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessionsList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function getProfessionsList() {
        try {
            const { content } = await profService.get();
            setProfession(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function getProfession(id) {
        return profession.find((p) => p._id === id);
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    }
    return (
        <ProfessionContenxt.Provider
            value={{ isLoading, profession, getProfession }}
        >
            {children}
        </ProfessionContenxt.Provider>
    );
};
ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
