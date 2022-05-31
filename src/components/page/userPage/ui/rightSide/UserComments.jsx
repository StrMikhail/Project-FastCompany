import React from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import PropTypes from "prop-types";

const UserComments = ({ users, comments, removeComment, pushComment }) => {
    return (
        <div className="container col-md-7">
            <CommentCreate users={users} pushComment={pushComment} />
            {comments.length > 0 ? (<CommentList
                comments={comments}
                removeComment={removeComment}
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
