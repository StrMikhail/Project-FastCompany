import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ value, handleSearchUsers }) => {
    return (
        <div className="input-group input-group-sm mt-2 mb-3">
            <input
                type="text"
                placeholder="Поиск..."
                value={value}
                className="form-control p-2"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                onChange={e => handleSearchUsers(e)}/>
        </div>
    );
};
SearchStatus.propTypes = {
    handleSearchUsers: PropTypes.func,
    value: PropTypes.string
};

export default SearchStatus;
