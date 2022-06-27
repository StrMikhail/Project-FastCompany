import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextAreaField from "../../../../commom/form/TextAreaField";
import { validator } from "../../../../../utils/validator";
const CommentCreate = ({ onSubmit }) => {
    const initialData = {
        comment: ""
    };
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        comment: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };


    const handleChange = (target) => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }));
    };


    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const isValid = Object.keys(errors).length === 0;

    async function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            onSubmit(data);
            clearForm();    
        } catch (error) {
            setErrors(error);
        }
    };
    return (
        <div className="card mb-2 border-primary">
            <div className="p-2">
            <h1>Новый комментарий</h1>
            </div>
            <div className="card-body ">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <TextAreaField
                        label="Введите комментарий"
                        name="comment"
                        onChange={handleChange}
                        rows="3"
                        value={data.comment}
                        error={errors.comment}
                    />
                    <div className="d-flex align-items-end">
                        <button 
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Отправить
                        </button>
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
