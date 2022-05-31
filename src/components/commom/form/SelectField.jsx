import React from "react";
import PropTypes from "prop-types";
const SelectField = ({ name, label, value, onChange, dafaultOption, options, error }) => {
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
        return (
            <div className="mb-4">
                    <label htmlFor={name} className="form-label">
                        {label}
                    </label>
                    <select
                        label="Выберите профессию"
                        className={getInputClasses()}
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                    >
                    <option disabled value="">
                        {dafaultOption}
                    </option>
                    {
                        optionsArray && optionsArray.map(option => <option
                            value={option.value}
                            key={option.value}
                        >
                           {option.label}
                        </option>)
                    }
                    </select>
                    {error && <div className="invalid-feedback">
                        {error}
                    </div>}
                </div>
    );
};
SelectField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    dafaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string
};

export default SelectField;
