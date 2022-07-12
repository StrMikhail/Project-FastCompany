import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/commom/protectedRoute";
import LogOut from "./layouts/LogOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";
const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionsList())
    }, [])

    return (
        <>
            <AuthProvider>
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
            </AuthProvider>
        </>
    );
};

export default App;
