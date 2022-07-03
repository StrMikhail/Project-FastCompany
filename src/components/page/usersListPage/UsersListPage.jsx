import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import Pagination from "../../commom/Pagination";
import { paginate } from "../../../utils/paginate.js";
import GroupList from "../../commom/GroupList";
import UserTable from "../../ui/UserTable";
import UsersLenghtSpan from "../../ui/UsersLenghtSpan";
import SearchStatus from "../../ui/SearchStatus";
import Loading from "../../ui/Loading";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getQualities } from "../../../store/qualities";
import { getProfessions } from "../../../store/professions";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [searchUsers, setSearchUsers] = useState("");
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;

    const { users } = useUser();
    const { currentUser } = useAuth();
    const profession = useSelector(getProfessions())
    const qualities = useSelector(getQualities())
    const usersList = users;
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
    const handleToggleBookMark = (id) => {
        // setUsers(
        //     users.map((user) => {
        //         if (user._id === id) {
        //             return { ...user, bookmark: !user.bookmark };
        //         }
        //         return user;
        //     })
        // );
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
 
    if (users && qualities.lenght !== 0 && profession) {
        const users = usersList.filter(u => u._id !== currentUser._id);
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
                    <div className="d-flex flex-column flex-shrink-0 p-2">
                        <GroupList
                            selectedItem={selectedProf}
                            items={profession}
                            onItemSelect={handleProfessionSelect}/>
                        <button className="btn btn-secondary mt-2"
                            onClick={clearFilter}>Очистить фильтр</button>
                    </div>
                <div className=" container-fluid d-flex flex-column my-2">
                    <UsersLenghtSpan len={users}/>
                    <SearchStatus
                        value={searchUsers}
                        handleSearchUsers={handleSearchUsers}
                    />
                    <UserTable
                        selectedSort={sortBy}
                        users={userCrop}
                        onSort={handleSort}
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
    return <Loading radius={6}/>;
};

UsersListPage.propTypes = {
    users: PropTypes.array
};
export default UsersListPage;
