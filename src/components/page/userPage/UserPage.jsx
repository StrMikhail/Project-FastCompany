import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities";
import { useHistory, Link } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleHistory = () => {
        history.push(`/users/`);
    };
    if (user) {
        return (
            <>
                <div>
                <h2>{user.name}</h2>
                <h3>Профессия: {user.profession.name}</h3>
                <QualitiesList qualities={user.qualities} />
                <h6>Всего встречь: {user.completedMeetings}</h6>
                <h3>Рейтинг: {user.rate}</h3>
                <Link to={`/users/${userId}/edit}`}>
                    <button type="button" className="btn btn-outline-primary sm">
                       Редактировать
                    </button>
                </Link>
                <button type="button" className="btn btn-outline-primary sm"
                    onClick={handleHistory}>
                    Вернуться к списку пользователей
                </button>
            </div>
       </>
       );
    } else {
        return <h2>Loding...</h2>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
