import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AvatarRender from '../page/userPage/ui/leftSide/AvatarRender';

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState();
    const toggleMenu = () => {
        setOpen(prevState => !prevState);
    }
    return (
        <div className='dropdown' onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center text-light">
                <div className="m-2 text-light">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    height="40"
                    alt="avatar"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu " + (isOpen ? "show" : "")}>
                <Link className="dropdown-item" to={`/users/${currentUser._id}`}>Профиль</Link>
                <Link to="/logout" className="dropdown-item">Выйти</Link>
            </div>
        </div>
    );
};

export default NavProfile;