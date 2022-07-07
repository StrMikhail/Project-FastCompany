import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import UserInfo from "./ui/leftSide/UserInfo";
import UserComments from "./ui/rightSide/UserComments";
import Loading from "../../ui/Loading";
import { getUserById } from "../../../store/users"

const UserPage = ({ userId }) => {
    const history = useHistory();
    const user = useSelector(getUserById(userId))
    if (user) {
        return (
                <>
                <div className="container mt-4">
                    <div className="gutters-sm d-flex flex-row">
                        <div className="col-1 mx-4 mb-4">
                            <button
                                className="btn flew-wrap btn-outline-primary mb-2"
                                style={{ height: "100%", width: "100%" }}
                                onClick={() => history.push(`/users`)}
                            >
                                <h2><i className="bi bi-arrow-bar-left bi-lg"></i></h2>
                                <p>Назад</p>
                            </button>
                        </div>
                        <UserInfo user={user}/>
                            <UserComments/>
                    </div>
                </div>
                </>
        );
    } else {
        return <Loading radius={6}/>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
