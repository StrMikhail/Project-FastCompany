import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../../commom/form/TextField";
import RadioField from "../../commom/form/RadioField";
import SelectField from "../../commom/form/SelectField";
import MultiSelectField from "../../commom/form/MultiSelectField";
import { validator } from "../../../utils/validator";
import Loading from "../../ui/Loading";
const userEditPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        name: "",
        email: ""
    });
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен некорректно" }
        },
        name: {
            isRequired: { message: "Слышь, имя ввел!" }
        }
    };
    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        api.users.getById(userId).then((data) =>
            setUser({
                _id: data._id,
                name: data.name,
                email: data.email,
                sex: data.sex,
                profession: data.profession._id,
                qualities: data.qualities.map((qual) => {
                    return { label: qual.name, value: qual._id };
                })
            })
        );
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        validate();
    }, [user]);

    const isValid = Object.keys(errors).length === 0;

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleChange = (target) => {
        setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = user;
        const isValid = validate();
        if (!isValid) return;
        api.users.update(userId, {
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        history.push(`/users/${userId}`);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="container m-4 ">
                <div className="row">
                    <p className="col-1">
                        <button
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
                        {qualities.length ? (
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
                                    options={professions}
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
                                    options={qualities}
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
                        ) : (
                            <Loading radius={3} />
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};
export default userEditPage;
