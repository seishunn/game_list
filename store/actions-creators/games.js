import axios from "axios";

const API_KEY = "9f22c74fe7104c219a08f164e1cb81d3";

const instance = axios.create({
    baseURL: 'https://api.rawg.io/api/'
})

export const setGames = (count, results) => ({type: "SET_GAMES", payload: {count, results}})
export const addGames = (results) => ({type: "ADD_GAMES", payload: {results}})

export const setGamesThunk = (page = 1, pageSize = 10, platform = "", searchQuery = "") => {
    return async (dispatch) => {
        if (!platform) {
            const response = await instance.get(`games?page=${page}&page_size=${pageSize}&key=${API_KEY}&search=${searchQuery}`)
            dispatch(setGames(response.data.count, response.data.results));
        } else {
            const response = await instance.get(`games?page=${page}&page_size=${pageSize}&platforms=${platform}&key=${API_KEY}&search=${searchQuery}`)
            dispatch(setGames(response.data.count, response.data.results));
        }
    }
}

export const addGamesThunk = (page = 1, pageSize = 10, platform = "", searchQuery = "") => {
    return async (dispatch) => {
        if (!platform) {
            const response = await instance.get(`games?page=${page}&page_size=${pageSize}&key=${API_KEY}&search=${searchQuery}`)
            dispatch(addGames(response.data.results));
        } else {
            const response = await instance.get(`games?page=${page}&page_size=${pageSize}&platforms=${platform}&key=${API_KEY}&search=${searchQuery}`)
            dispatch(addGames(response.data.results));
        }
    }
}