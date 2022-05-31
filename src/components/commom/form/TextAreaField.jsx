import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, onChange, rows, value, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <textarea
                label="Введите комментарий"
                className={getInputClasses()}
                aria-label="With textarea"
                rows={rows}
                id={name}
                name={name}
                onChange={handleChange}
                value={value}
                >
            </textarea>
            <div className="invalid-feedback">{error}</div>
        </div>
    );
};
TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    rows: PropTypes.string,
    value: PropTypes.string
};

export default TextAreaField;
