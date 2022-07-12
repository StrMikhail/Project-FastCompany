import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../commom/form/TextField";
import RadioField from "../../commom/form/RadioField";
import SelectField from "../../commom/form/SelectField";
import MultiSelectField from "../../commom/form/MultiSelectField";
import { validator } from "../../../utils/validator";
import { useAuth } from "../../../hooks/useAuth";
// import { useProfessions } from "../../../hooks/useProfession";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesById, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfessions } from "../../../store/professions";
const userEditPage = () => {
    const history = useHistory();
    const { currentUser, editUser } = useAuth();
    // const { profession } = useProfessions();
    const professions = useSelector(getProfessions())
    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
    const [user, setUser] = useState({
        name: currentUser.name,
        email: currentUser.email,
        sex: currentUser.sex,
        profession: currentUser.profession,
        qualities: currentUser.qualities
    });
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const [errors, setErrors] = useState({});
    const professionsList = professions.map(p => ({label: p.name, value: p._id}));
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен некорректно" }
        },
        name: {
            isRequired: { message: "Имя не должно быть пустым" }
        }
    };
    const validate = () => {
        const errors = validator(currentUser, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


    useEffect(() => {
        validate();
    }, [currentUser]);
    

    const isValid = Object.keys(errors).length === 0;
    const getQualitiesId = (array) => {
        return array.map(q => (q.value))
    }
    const handleChange = (target) => {
        setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { qualities } = user;
        const isValid = validate();
        if (!isValid) return;
        editUser({
            ...user,
            qualities: getQualitiesId(qualities)
        });
        history.push(`/users/${currentUser._id}`);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="container m-4 ">
                <div className="row">
                    <p className="col col-1">
                        <button
                            onClick={() => history.push(`/users/${currentUser._id}`)}
                            className="btn btn-outline-primary mb-1"
                            style={{ height: "100%", width: "100%" }}
                        >
                            <h2>
                                <i className="bi bi-arrow-bar-left bi-sm"></i>
                            </h2>
                            <p>Назад</p>
                        </button>
                    </p>
                    <div className="col-md-6 offset-md-3 p-4 shadow-lg">
                            <>
                                <p>Редактирование пользователя</p>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    error={errors.email}    
                                />
                                <SelectField
                                    label="Выберите профессию"
                                    name="profession"
                                    dafaultOption="Выбрать..."
                                    options={professionsList}
                                    onChange={handleChange}
                                    value={user.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Мужской", value: "male" },
                                        { name: "Женский", value: "female" },
                                        { name: "Другой", value: "other" }
                                    ]}
                                    value={user.sex}
                                    name="sex"
                                    onChange={handleChange}
                                />
                                <MultiSelectField
                                    label="Выберите качества"
                                    name="qualities"
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    defaulValue={user.qualities}
                                />
                                <button
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Сохранить
                                </button>
                            </>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default userEditPage;
