import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
        <a className="navbar-brand mx-3 " href="/main">
          <h3><i className="bi bi-heart"></i><a>  FastCompany</a></h3>
        </a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
                <Link className="nav-link mx-1" aria-current="page" to="/main">Главная                </Link>
                <Link className="nav-link mx-1" to="/login">Авторизация</Link>
                <Link className="nav-link mx-1" to="/users">Пользователи</Link>
          </div>
        </div>
      </nav>
    );
};

export default NavBar;
