import { combineReducers } from 'redux';

// reducers
import boardsReducer from './boards';
import snackReducer from './snack';
import tasksReducer from './tasks';

const reducers = { boardsReducer, snackReducer, tasksReducer };

const rootReducer = combineReducers(reducers);

export default rootReducer;
