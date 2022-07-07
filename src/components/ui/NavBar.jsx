import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
          <div className="container-fluid">
            <Link className="navbar-brand mx-3 " to="/main">
              <h3>P!nderx</h3>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                    <Link className="nav-link mx-1" aria-current="page" to="/main">Главная</Link>
                    {isLoggedIn && <Link className="nav-link mx-1" to="/users">Пользователи</Link>}
              </div>
          </div>
          <div className="navbar-nav d-flex">
            {isLoggedIn
              ? (
                  <NavProfile/>
              ) : <Link className="nav-link mx-1" to="/login">Авторизация</Link>
            }
          </div>
        </div>
      </nav>
    );
};

export default NavBar;
