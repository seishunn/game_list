const initialState = {
    games: [],
    currentGame: {},
    currentPage: 1,
    perPage: 20,
    totalCount: 0
}

export const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_GAMES":
            return {
                ...state,
                totalCount: action.payload.count,
                games: action.payload.results
            }
        case "ADD_GAMES":
            return {
                ...state,
                games: [...state.games, ...action.payload.results]
            }
        case "SET_CURRENT_GAME":
            return {
                ...state,
                currentGame: action.payload
            }
        case "INC_CURRENT_PAGE":
            return {
                ...state,
                currentPage: state.currentPage + 1
            }
        default:
            return state
    }
}