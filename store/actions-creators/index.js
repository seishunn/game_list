import * as GamesActionsCreators from "./games"
import * as CriteriaActionsCreators from "./criteria"

export default {
    ...GamesActionsCreators,
    ...CriteriaActionsCreators
}