import React from "react";
import UserFavoriteFlag from "./UserFavoriteFlag";
import PropTypes from "prop-types";

const UserComponent = ({ user, removeItem }) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{user.name}</th>
                <td>
                    {user.qualities.map((quality) => (
                        <span
                            className={`badge m-1 bg-${quality.color}`}
                            key={quality._id}
                        >
                            {quality.name}
                        </span>
                    ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                    <UserFavoriteFlag />
                </td>
                <th scope="col">
                    <button
                        type="button"
                        className="btn btn-sm btn-danger "
                        onClick={() => removeItem(user._id)}
                    >
                        Удалить
                    </button>
                </th>
            </tr>
        </tbody>
    );
};

UserComponent.propTypes = {
    user: PropTypes.object.isRequired,
    removeItem: PropTypes.func.isRequired
};

export default UserComponent;
