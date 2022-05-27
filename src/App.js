import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/ui/NavBar";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";
import UserEditPage from "./components/page/userEditPage";
const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId/:edit" component={UserEditPage} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default App;
