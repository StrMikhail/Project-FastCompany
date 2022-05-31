import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import UserInfo from "./ui/leftSide/UserInfo";
import UserComments from "./ui/rightSide/UserComments";
import Loading from "../../ui/Loading";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [users, setUsers] = useState();
    const [comments, setComments] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.users.fetchAll().then((data) => {
            const allUsers = Object.keys(data).map((userName) => ({
                label: data[userName].name,
                value: data[userName]._id
            }));
            setUsers(allUsers);
        });
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);
    const handleHistory = () => {
        history.push(`/users/`);
    };
    const handlePushComment = (userComment, text) => {
        api.comments.add({
            _id: Date.now(),
            pageId: userId,
            userId: userComment,
            content: text,
            created_at: Date.now()
        });
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    };
    const handleRemove = (id) => {
        api.comments.remove(id);
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    };
    if (user && comments) {
        return (
                <>
                <div className="container mt-4">
                    <div className="row gutters-sm">
                    <div className="col-1">
                        <button
                            onClick={handleHistory}
                            className="btn btn-outline-primary mb-5 border border-light"
                            style={{ height: "100%", width: "100%" }}
                        >
                            <h2><i className="bi bi-arrow-bar-left bi-lg"></i></h2>
                            <p>Назад</p>
                        </button>
                    </div>
                        <UserInfo user={user}/>
                        <UserComments
                            pushComment={handlePushComment}
                            removeComment={handleRemove}
                            userId={userId}
                            users={users}
                            comments={comments}
                        />
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
