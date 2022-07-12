import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionsById, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
    const profession = useSelector(getProfessionsById(id))
    const isLoading = useSelector(getProfessionsLoadingStatus())
    if (!isLoading) {
        return <p>{profession.name}</p>;
    } 
    return <span>Loading...</span>
};
Profession.propTypes = {
    id: PropTypes.string,
    isLoading: PropTypes.bool
};
export default Profession;
