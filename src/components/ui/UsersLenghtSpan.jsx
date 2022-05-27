import React from "react";
import PropTypes from "prop-types";

const UsersLenghtSpan = ({ len }) => {
    let user = "пользователей";
    let meet = "встретятся";
    switch (len.length) {
    case 1:
        user = "пользователь";
        meet = "встретится";
        break;
    case 2:
    case 3:
    case 4:
        user = "пользователя";
        break;
    };

    const getStringDiv = () => {
        if (len.length > 0) {
            return (<div className="badge bg-primary ">
                <h4>{len.length} {user} {meet} с тобой сегодня</h4>
            </div>);
        }
        return (
            <div className="badge bg-danger ">
                <h4>Ты никому не нужен</h4>
            </div>);
    };

    return (
        <>
            {getStringDiv(len)}
        </>
    );
};

UsersLenghtSpan.propTypes = {
    len: PropTypes.array.isRequired
};

export default UsersLenghtSpan;
