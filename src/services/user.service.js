import httpService from "./http.service";
import localStorageservice from "./localStorage.service";
const userEndpoint = "user/";

const useService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    }, 
    create: async (payload) => {
        console.log(payload)
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
};

export default useService;
