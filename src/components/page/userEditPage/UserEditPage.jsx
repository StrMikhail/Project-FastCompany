import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../commom/form/TextField";
import RadioField from "../../commom/form/RadioField";
import SelectField from "../../commom/form/SelectField";
import MultiSelectField from "../../commom/form/MultiSelectField";
import { validator } from "../../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesById, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";
const userEditPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState()

    const professions = useSelector(getProfessions())
    const professionLoading = useSelector(getProfessionsLoadingStatus());

    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

    const currentUser = useSelector(getCurrentUserData());
    const [qualitiesList, setQualitiesList] = useState();
    const [professionsList, setProfessionsList] = useState();

      useEffect(() => {
        if (professions !==null && qualities !== null && currentUser) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
            setQualitiesList(qualities.map((q) => ({
                label: q.name,
                value: q._id
            })))
            setProfessionsList(professions.map(p => ({
                label: p.name, 
                value: p._id
            })))
        }
    }, [professionLoading, qualitiesLoading, currentUser]);
    
    const [errors, setErrors] = useState({});
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
 
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    const transformData = (data) => {
        const result = getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
        return result;
    };

    const isValid = Object.keys(errors).length === 0;
    const getQualitiesId = (array) => {
        return array.map(q => (q.value))
    }
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { qualities } = data;
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUser({ ...data,
            qualities: getQualitiesId(qualities)
        }))
    };
    return (
        <>
        {!isLoading && Object.keys(professions).length > 0 && Object.keys(qualities).length > 0 ? (
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
                                <SelectField
                                    label="Выберите профессию"
                                    name="profession"
                                    dafaultOption="Выбрать..."
                                    options={professionsList}
                                    onChange={handleChange}
                                    value={data.profession}
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
                                    defaulValue={data.qualities}
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
        </form>) : "Loading..."}
        </>
    );
};
export default userEditPage;
