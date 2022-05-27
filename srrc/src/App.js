import React from "react";
import NavBar from "./components/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";
const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    ); 
};

export default App;
