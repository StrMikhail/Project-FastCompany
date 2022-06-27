import httpService from "./http.service";

const profEndpoint = "profession/";

const profService = {
    get: async () => {
        const { data } = await httpService.get(profEndpoint);
        return data;
    }
};

export default profService;
