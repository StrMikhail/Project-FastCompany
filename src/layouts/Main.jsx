import React from "react";
import AvatarRender from "../components/page/userPage/ui/leftSide/AvatarRender";

const Main = () => {
    return (
        <div className="container-fluid ">
            <div className="container mb-4">
                <h1>Замечательные люди</h1>
            </div>
            <div className="container">
                <div className="row justify-content-evenly">
                <div className="card col-sm-3 p-4"><AvatarRender width="300px" height="200px"/></div>
                <div className="card col-sm-8 justify-content-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, eum et. Debitis provident iusto suscipit impedit, tempore mollitia nihil quis necessitatibus neque omnis iste magni facere minima voluptas. Ullam beatae saepe incidunt atque, architecto voluptates iusto minus dolores natus, dolor repellendus. Natus laborum ad doloremque at magnam, fuga ullam assumenda.
                </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
