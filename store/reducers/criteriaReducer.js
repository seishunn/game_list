const initialState = {
    platforms: []
}

export const criteriaReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PLATFORMS":
            return {
                ...state,
                platforms: action.payload
            }
        default:
            return state
    }
}