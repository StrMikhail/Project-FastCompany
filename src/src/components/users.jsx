import React from "react";
import UsersTable from "./UsersTable";
import UsersLenghtSpan from "./UsersLenghtSpan";
import PropTypes from "prop-types";

const Users = ({ peoples, removeItem, handleToggleBookMark }) => {
    return (
        <>
            <UsersLenghtSpan len={peoples} />
            <UsersTable peoples={peoples} removeItem={removeItem} handleToggleBookMark={handleToggleBookMark}/>
        </>
    );
};

Users.propTypes = {
    peoples: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    removeItem: PropTypes.func.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired
};
export default Users;
