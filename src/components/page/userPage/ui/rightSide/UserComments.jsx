import React, { useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import PropTypes from "prop-types";
import { useComments } from "../../../../../hooks/useComments";

const UserComments = () => {
    const { createComment, comments, removeComment } = useComments();
    const handleSubmit = (data) => {
        createComment(data)
    }
    useEffect(() => {

    }, [comments])
    const handleDeleteCommetn = (id) => {
        removeComment(id);
    }
    return (
        <div className="container col-md-7">
            <CommentCreate onSubmit={handleSubmit}/>
            {comments.length > 0 ? (<CommentList
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
