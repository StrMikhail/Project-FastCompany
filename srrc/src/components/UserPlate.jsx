import React from "react";
import PropTypes from "prop-types";
import Plate from "./Plate";
import Bookmark from "./Bookmark";
import QualitiesList from "./QualitiesList";
import { Link } from "react-router-dom";

const UserPlate = ({ users, onSort, removeItem, selectedSort, handleToggleBookMark }) => {
    const columns = {
        name: {
            path: "name", 
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: { name: "Качества", component: (user) => (<QualitiesList qualities={user.qualities}/>) },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встрелится, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => handleToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) =>
                (<button className="btn btn-danger "
                    onClick={() => removeItem(user._id)}
                >
                    Удалить
                </button>
                )
        }
    };
    return (
        <Plate onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />
    );
};

UserPlate.propTypes = {
    users: PropTypes.array,
    removeItem: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired
};

export default UserPlate;
