import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/LoginForm";
import RegisterForm from "../components/ui/RegisterForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");
    const toogleType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };
    return (
        <div className="container m-4 ">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow-lg">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Регистрация</h3>
                            <RegisterForm />
                            <p>Уже есть аккаут? <a role="button" onClick={toogleType}>Войти</a></p>
                        </>
                        ) : (
                        <>
                            <h3 className="mb-4">Авторизация</h3>
                            <LoginForm />
                             <p>Еще нет аккаунта? <a role="button" onClick={toogleType}>Загерестрироваться</a></p>
                        </>
                            )
                        }
                </div>
            </div>
        </div>
    );
};

export default Login;
