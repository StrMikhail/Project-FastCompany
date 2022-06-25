import React from "react";
import PropTypes from "prop-types";

const Loading = ({ radius }) => {
    return (
        <div className="text-center">
            <div className="text-center" style={{ margin: "13rem" }}>
                <div
                    className="spinner-border"
                    style={{ width: `${radius}rem`, height: `${radius}rem` }}
                    role="status">
                </div>
                <div className="sr-only mt-2"><h3>Loading</h3></div>
            </div>
        </div>
    );
};
Loading.propTypes = {
    radius: PropTypes.number
};
export default Loading;
