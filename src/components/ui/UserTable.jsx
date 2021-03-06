import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../commom/Bookmark";
import QualitiesList from "./qualities";
import { Link } from "react-router-dom";
import Table from "../commom/table";
import Profession from "./profession";

const UserTable = ({ users, onSort, selectedSort, handleToggleBookMark }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: { name: "Качества", component: (user) => (<QualitiesList qualities={user.qualities}/>) },
        professions: { name: "Профессия", component: (user) => <Profession id={user.profession}/> },
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
        }
    };
    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />
    );
};

UserTable.propTypes = {
    users: PropTypes.array,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired
};

export default UserTable;
