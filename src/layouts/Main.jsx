import React from "react";
import useMockData from "../utils/mocData";
const Main = () => {
    const { error, inicialize, progress, status } = useMockData();
    const handleClick = () => {
        inicialize();
    };
    return (
        <div className="container mt-5 ">
                <h3>Инициализация данных в FireBase</h3>
                <ul>
                    <li> Status: {status} </li>
                    <li> Progress: {progress}% </li>
                    {error && <li> error: {error}</li>}
                </ul>
                <button
                    className="btn btn-primary"
                    onClick={handleClick}>
                    {" "}
                    Загрузить
                </button>
        </div>
    );
};

export default Main;
