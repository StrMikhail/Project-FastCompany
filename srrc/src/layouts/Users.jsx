import React from "react";
import { useParams } from "react-router-dom";
import UserPersonal from "../components/UserPersonal";
import UsersTable from "../components/UsersTable";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPersonal userId={userId} /> : <UsersTable />}</>;
};

export default Users;
