import { combineReducers } from 'redux';

// reducers
import boardsReducer from './boards';
import snackReducer from './snack';

const reducers = { boardsReducer, snackReducer };

const rootReducer = combineReducers(reducers);

export default rootReducer;
