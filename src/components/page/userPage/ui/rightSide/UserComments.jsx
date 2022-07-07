import React, { useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments, getCommentsLoadingStatus, loadCommentsList, removeComment } from "../../../../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../../../../store/users";

const UserComments = () => {
    const {userId} = useParams()
    const currentUserId = useSelector(getCurrentUserId())
    const comments = useSelector(getComments())
    const isLoading = useSelector(getCommentsLoadingStatus())
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])

    const handleSubmit = (text) => {
        const data = {...text, pageId: userId, userId: currentUserId} 
        dispatch(createComment(data))
    }

    const handleDeleteCommetn = (id) => {
        dispatch(removeComment(id))
    }

    return (
        <div className="container col-md-7">
            <CommentCreate onSubmit={handleSubmit}/>
            {!isLoading && comments.length !== 0 ? (<CommentList
                comments={comments}
                onDelete={handleDeleteCommetn}
                />) : null }
        </div>
    );
};
UserComments.propTypes = {
    users: PropTypes.array,
    comments: PropTypes.array,
    removeComment: PropTypes.func,
    pushComment: PropTypes.func

};
export default UserComments;
