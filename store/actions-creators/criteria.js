import axios from "axios";

const API_KEY = "9f22c74fe7104c219a08f164e1cb81d3";
const instance = axios.create({
    baseURL: 'https://api.rawg.io/api/'
})
export const setPlatforms = (payload) => ({type: "SET_PLATFORMS", payload})

export const getPlatformsThunk = () => {
    return async (dispatch) => {
        const response = await instance.get(`platforms?key=${API_KEY}`);
        dispatch(setPlatforms(response.data.results));
    }
}