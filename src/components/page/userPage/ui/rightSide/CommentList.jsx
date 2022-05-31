import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

const CommentList = ({ comments, removeComment }) => {
    return (
        <div className="card mb-3">
            <div className="card-body ">
                <h2>Комментарии</h2>
                <hr />
                    {comments.length === !0 ? <h2>Loading...</h2> : (comments.map(comment => (
                        <Comment key={comment._id} comment={comment} removeComment={removeComment}/>
                    )))}
            </div>
        </div>
    );
};
CommentList.propTypes = {
    comments: PropTypes.array,
    removeComment: PropTypes.func
};

export default CommentList;
