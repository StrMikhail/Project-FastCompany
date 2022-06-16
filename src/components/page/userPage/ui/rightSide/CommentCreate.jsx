import React, { useState } from "react";
// import TextField from "../../../../commom/form/TextField";
import SelectField from "../../../../commom/form/SelectField";
import PropTypes from "prop-types";
import TextAreaField from "../../../../commom/form/TextAreaField";
const CommentCreate = ({ users, pushComment }) => {
    const [userComment, setUserComment] = useState({
        user: "",
        comment: ""
    });
    const handleChange = (target) => {
        setUserComment(prevState => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        pushComment(userComment.user, userComment.comment);
        setUserComment({
            user: "",
            comment: ""
        });
    };
    return (
        <div className="card mb-2 border-primary">
            <div className="p-2">
            <h1>Новый комментарий</h1>
            </div>
            <div className="card-body ">
                <form onSubmit={handleSubmit}>
                    <SelectField
                        label="Выберите пользователя"
                        name="user"
                        dafaultOption="Выбрать..."
                        options={users}
                        onChange={handleChange}
                        value={userComment.user}
                    />
                    <TextAreaField
                        label="Введите комментарий"
                        name="comment"
                        onChange={handleChange}
                        rows="3"
                        value={userComment.comment}
                    />
                    <div className="d-flex align-items-end">
                        <button className="btn btn-primary w-100 mx-auto">Отправить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

CommentCreate.propTypes = {
    users: PropTypes.array,
    pushComment: PropTypes.func
};

export default CommentCreate;
