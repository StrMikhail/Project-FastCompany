import React from 'react';
import { useState, useEffect } from 'react';
import api from "../api";
import QualitiesList from './QualitiesList';
import { useHistory } from 'react-router-dom';

const UserPersonal = ({ userId }) => {
    const history = useHistory()
    const [user, setUser] = useState()


    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });

    const handleHistory = () => {
        history.push("/users")
    }

    if (user) {
        return (
            <div>
                <h2>{user.name}</h2>
                <h3>Профессия: {user.profession.name}</h3>
                <QualitiesList qualities={user.qualities} />
                <h6>Всего встречь: {user.completedMeetings}</h6>
                <h3>Рейтинг: {user.rate}</h3>
                <button type="button" className="btn btn-outline-primary sm"
                    onClick={handleHistory}                
                >К списку пользователей</button>
            </div>
        );
    } else {
        return <h2>Loding...</h2>
    }
  
};

export default UserPersonal;