import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../../../../hooks/useAuth";
import Loading from "../../../../ui/Loading";
import { useSelector } from "react-redux";
import { getProfessionsById } from "../../../../../store/professions";

const InfoCard = ({ user }) => {
    const history = useHistory();
    const { currentUser } = useAuth();
    const profession = useSelector(getProfessionsById(user.profession))

    const handleHistory = () => {
        history.push(`/users/${user._id}/edit`);
    };
    if (user !== undefined) {
        return (
            <div className="card card-body mb-3 border-primary">
                {currentUser._id === user._id
                    ? (<button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleHistory}
                        >
                        <i className="bi bi-gear"></i>
                    </button> )
                    : null }
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
                        height="200"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">{profession.name}</p>
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                            <i className="bi bi-caret-up text-secondary" role="button"></i>
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loading/>
    }
   
};
InfoCard.propTypes = {
    user: PropTypes.object
};

export default InfoCard;
