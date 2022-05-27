import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const NavBar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/main">Главная</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Авторизация</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link m2" to="/users">Пользователи</Link>
            </li>
        </ul>
    );
};

export default NavBar;
