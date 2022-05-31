import React, { useEffect, useState } from "react";
import AvatarRender from "../leftSide/AvatarRender";
import PropTypes from "prop-types";
import api from "../../../../../api";
import { displayDate } from "../../../../../utils/displayDate";
const Comment = ({ comment, removeComment }) => {
    const [userName, setUserName] = useState();
    useEffect(() => {
        api.users.getById(comment.userId).then((data) => setUserName(data.name));
    }, []);
    const handleDelete = () => {
        removeComment(comment._id);
    };
    return (
        <>
        {userName && (
                <div className="bg-light card-body  mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <AvatarRender
                                height="65px"
                                width="65px"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="mb-1 ">
                                                {userName}
                                            <p className="small">
                                                {displayDate(comment.created_at)}
                                            </p>
                                        </span>
                                        <button
                                            onClick={handleDelete}
                                            className="btn btn-sm text-primary d-flex align-items-center">
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};
Comment.propTypes = {
    comment: PropTypes.object,
    removeComment: PropTypes.func
};

export default Comment;
