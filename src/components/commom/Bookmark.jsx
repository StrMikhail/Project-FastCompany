import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";

const Bookmark = ({ status, ...rest }) => {
    const x = <i className="bi bi-heart"></i>;
    const y = <i className="bi bi-heart-fill"></i>;
    return (
        <button className="btn" {...rest}>
            {status ? y : x}
        </button>
    );
};
Bookmark.propTypes = {
    status: PropTypes.bool
};

export default Bookmark;
