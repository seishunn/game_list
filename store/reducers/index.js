import {criteriaReducer} from "@/store/reducers/criteriaReducer";
import {HYDRATE} from "next-redux-wrapper";
import {combineReducers} from "redux";
import {gamesReducer} from "@/store/reducers/gamesReducer";

export const rootReducer = combineReducers({
    criteria: criteriaReducer,
    games: gamesReducer
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }
        if (state.count) nextState.count = state.count
        return nextState
    } else {
        return rootReducer(state, action)
    }
}