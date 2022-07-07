import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../commom/form/TextField";
import SelectField from "../commom/form/SelectField";
import RadioField from "../commom/form/RadioField";
import MultiSelectField from "../commom/form/MultiSelectField";
import CheckBoxField from "../commom/form/CheckBoxField";
import { useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const qualities = useSelector(getQualities())
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professions = useSelector(getProfessions())
    const professionsList = professions.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен некорректно" }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотябы 1 заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотябы 1 число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: { 
                message: "Имя должно быть не менее 3 символов",
                value: 3
            }
        },
        profession: {
            isRequired: { message: "Обязательно выберете Вашу профессию" }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без лицензионного соглашения"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        dispatch(signUp(newData))
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
         
            <SelectField
                label="Выберите профессию"
                name="profession"
                dafaultOption="Выбрать..."
                options={professionsList}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Мужской", value: "male" },
                    { name: "Женский", value: "female" },
                    { name: "Другой", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                label="Выберите качества"
                name="qualities"
                options={qualitiesList}
                onChange={handleChange}
                defaultValue={data.qualities}
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                text="Подтвердите лицензионное соглашение"
                error={errors.licence}
            />
            <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Зарегестрировать
            </button>
        </form>
    );
};

export default RegisterForm;
