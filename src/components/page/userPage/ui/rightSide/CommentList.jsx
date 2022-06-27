import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

const CommentList = ({ comments, onDelete }) => {
    return (
        <div className="card mb-3 border-primary">
            <div className="card-body ">
                <h2>Комментарии</h2>
                <hr />
                    {comments.length === !0 ? <h2>Loading...</h2> : (comments.map(comment => (
                        <Comment key={comment._id} comment={comment} onDelete={onDelete}/>
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
