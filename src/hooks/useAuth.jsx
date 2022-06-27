import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import useService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";
import localStorageservice from "../services/localStorage.service";
import Loading from "../components/ui/Loading";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params : {
        key: process.env.REACT_APP_FIREBASE_KEY}
    }
);
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min +1 ) + min);
    }
    async function signUp({ email, password, ...rest }) {
        const url = `accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                rate: randomInt(1,5),
                completedMeetings: randomInt(0,200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                email,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function signIn({ email, password, ...rest }) {
        const url = `accounts:signInWithPassword`;
        try {
            const { data } = await httpAuth.post(url, {
                email: email,
                password: password,
                returnSecureToken: true
            });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code } = error.response.data.error;
            if (code === 400) {
                    const errorObject = {
                        email: "Неверный логи или пароль",
                    };
                    throw errorObject;
            }
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function logOut() {
        history.push("/");
        localStorageservice.removeAuthData();
        setUser(null);
    }

    async function createUser(data) {
        try {
            const { content } = await useService.create(data);
            setUser(content);    
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function editUser(data) {        
        try {
            const { content } = await useService.updateUser(data);
            setUser(content);
        } catch (error) {
            console.log(error);
        }
    }
 
    async function getUserData() {
        try {
            const { content } = await useService.me()
            setUser(content)
        } catch {
            const { message } = error.response.data;
            setError(message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if ( localStorageservice.getAccessToken()){
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ signUp, signIn, logOut, editUser, currentUser }}>
            {!isLoading ? children : <Loading/>}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
