import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQialities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/commom/protectedRoute";
import LogOut from "./layouts/LogOut";
const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />
                    <ProfessionProvider>
                        <QualityProvider>
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
                        </QualityProvider>
                    </ProfessionProvider>
                <ToastContainer />
            </AuthProvider>
        </>
    );
};

export default App;
