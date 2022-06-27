import React, { useEffect } from "react";
import PropTypes from "prop-types";
import UserInfo from "./ui/leftSide/UserInfo";
import UserComments from "./ui/rightSide/UserComments";
import Loading from "../../ui/Loading";
import { useUser } from "../../../hooks/useUsers";
import { useHistory } from "react-router-dom";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const { getUserById } = useUser();
    const user = getUserById(userId);

    if (user) {
        return (
                <>
                <div className="container mt-4">
                    <div className="gutters-sm d-flex flex-row">
                        <div className="col-1 mx-4 mb-4">
                            <button
                                className="btn flew-wrap btn-outline-primary mb-2"
                                style={{ height: "100%", width: "100%" }}
                                onClick={() => history.push("/users")}
                            >
                                <h2><i className="bi bi-arrow-bar-left bi-lg"></i></h2>
                                <p>Назад</p>
                            </button>
                        </div>
                        <UserInfo user={user}/>
                        <CommentsProvider>
                            <UserComments/>
                        </CommentsProvider>
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
