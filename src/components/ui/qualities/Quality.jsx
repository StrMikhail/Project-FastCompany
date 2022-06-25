import React from "react";
import PropTypes from "prop-types";
const Quality = ({ quality }) => {
        return (
            <span className={`mx-1 badge bg-` + quality[0].color}>{quality[0].name}</span>
        );
};
Quality.propTypes = {
    quality: PropTypes.array.isRequired
};

export default Quality;
