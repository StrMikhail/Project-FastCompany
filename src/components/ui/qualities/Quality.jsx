import React from "react";
import PropTypes from "prop-types";
const Quality = ({  _id, color, name }) => {
    // const { } = qual; 
        return (
            <span className={`mx-1 badge bg-` + color}>{name}</span>
        );
};
Quality.propTypes = {
    _id: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string

};

export default Quality;
