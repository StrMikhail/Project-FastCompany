import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate.js";
import PropTypes from "prop-types";
import GroupList from "./GroupList";
import api from "../api";
import UserPlate from "./UserPlate";
import UsersLenghtSpan from "./UsersLenghtSpan";
import _ from "lodash";

const UsersTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState();
    const pageSize = 8;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) =>
            setProfessions(data)
        );
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, users]);

    const removeItem = (index) => {
        setUsers((prev) =>
            prev.filter((item) => item._id !== index)
        );
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        return (
            <div className="d-flex">
                {professions &&
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}/>
                        <button className="btn btn-secondary mt-2"
                            onClick={clearFilter}>Очистить фильтр</button>
                    </div>
                }
                <div className="d flex flex-column">
                    <UsersLenghtSpan len={users}/>
                    <UserPlate
                        selectedSort={sortBy}
                        users={userCrop}
                        onSort={handleSort}
                        removeItem={removeItem}
                        handleToggleBookMark={handleToggleBookMark}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={filteredUsers.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

UsersTable.propTypes = {
    users: PropTypes.array
};
export default UsersTable;
