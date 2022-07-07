import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/commom/protectedRoute";
import LogOut from "./layouts/LogOut";
import AppLoader from "./components/hoc/appLoader";

const App = () => {
    return (
        <>
            <AppLoader>
                    <NavBar />
                        <Switch>
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/" component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    <ToastContainer />
                </AppLoader>
        </>
    );
};

export default App;
