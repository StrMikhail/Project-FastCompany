import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "../../../../ui/qualities";

const InfoQual = ({ qualities }) => {
    return (
        <div className="card mb-3 border-primary">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Качества</span>
                </h5>
                <p className="card-text">
                <QualitiesList qualities={qualities} />
                </p>
            </div>
        </div>
    );
};
InfoQual.propTypes = {
    qualities: PropTypes.array
};

export default InfoQual;
