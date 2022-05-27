import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import Pagination from "../../commom/Pagination";
import { paginate } from "../../../utils/paginate.js";
import GroupList from "../../commom/GroupList";
import api from "../../../api";
import UserTable from "../../ui/UserTable";
import UsersLenghtSpan from "../../ui/UsersLenghtSpan";
import SearchStatus from "../../ui/SearchStatus";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchUsers, setSearchUsers] = useState("");
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState();
    const pageSize = 4;

    useEffect(() => {
        api.users.fetchAll().then((data) =>
            setUsers(data));
        api.professions.fetchAll().then((data) =>
        setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        setSelectedProf();
        setCurrentPage(1);
    }, [searchUsers]);

    const handleSearchUsers = ({ target }) => {
        setSearchUsers(target.value);
    };

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
        setSearchUsers("");
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
        let searchedUsers;
        if (searchUsers) {
            searchedUsers = users.filter(user => user.name.toLowerCase().includes(searchUsers.toLowerCase()));
        };
        const filteredUsers = selectedProf
            ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate((searchedUsers === undefined ? sortedUsers : searchedUsers), currentPage, pageSize);
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
                    <SearchStatus
                        value={searchUsers}
                        handleSearchUsers={handleSearchUsers}
                    />
                    <UserTable
                        selectedSort={sortBy}
                        users={userCrop}
                        onSort={handleSort}
                        removeItem={removeItem}
                        handleToggleBookMark={handleToggleBookMark}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={searchedUsers ? searchedUsers.length : filteredUsers.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <h3>Loading..</h3>;
};

UsersListPage.propTypes = {
    users: PropTypes.array
};
export default UsersListPage;
