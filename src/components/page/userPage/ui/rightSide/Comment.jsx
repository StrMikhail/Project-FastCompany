import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../../../utils/displayDate";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../../../../store/users";
const Comment = ({ comment, onDelete }) => {
    const user = useSelector(getUserById(comment.userId))
    const currentUserId = useSelector(getCurrentUserId())

    return (
        <>
            <div className="bg-light card-body position-relative mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <div className="avatar m-auto">
                                <img src={user.image} alt="avatar" height="100" className="img-responsive rounded-circle"/>                           
                            </div>
                            <div className="flex-grow-1 flex-shrink-1 px-4">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="mb-1 ">
                                                <b>{user.name}</b>
                                            <p className="small">
                                                <small>{displayDate(comment.created_at)}</small>
                                            </p>
                                        </span>
                                        {currentUserId === comment.userId && <button
                                            onClick={() => onDelete(comment._id)}
                                            className="btn btn-sm text-primary position-absolute top-0 end-0">
                                            <i className="bi bi-x-lg"></i>
                                        </button>}
                          
                                    </div>
                                    <div className="comment-text d-flex">{comment.comment}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
Comment.propTypes = {
    comment: PropTypes.object,
};

export default Comment;
