import { useEffect, useState } from "react";
import profession from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/http.service";
const useMockData = () => {
    const statusConst = {
        idle: "Not Staeted",
        pending: "In process",
        successed: "Ready",
        error: "Error"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = profession.length + qualities.length + users.length;
    const incrementCout = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && status === statusConst.ilde) {
            setStatus(statusConst.pending);
        }
        const newProgress = Math.floor((count / summuryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConst.successed);
        }
    };
    useEffect(() => {
        updateProgress();
    }, [count]);
    async function inicialize () {
        try {
            for (const prof of profession) {
                await httpService.put("profession/" + prof._id, prof);
                incrementCout();
            }
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                incrementCout();
            }
            for (const qual of qualities) {
                await httpService.put("quality/" + qual._id, qual);
                incrementCout();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConst.error);
        }
    };
    return { error, inicialize, progress, status };
};
export default useMockData;
