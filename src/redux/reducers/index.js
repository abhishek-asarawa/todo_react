import { combineReducers } from "redux";

// reducers
import boardsReducer from "./boards";

const reducers = { boardsReducer };

const rootReducer = combineReducers(reducers);

export default rootReducer;
