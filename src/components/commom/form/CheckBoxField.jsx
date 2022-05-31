import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, text, error }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    return (
        <div className="form-check mb-4">
            <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={name}
                checked={value}
                onChange={handleChange}
            />
            <label className="form-check-label is-invalid" htmlFor={name}>
                {text}
            </label>
            {error && <div className="invalid-feedback" htmlFor={name}>
                {error}
            </div>}
        </div>
    );
};
CheckBoxField.propTypes = {
    name: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    text: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default CheckBoxField;
