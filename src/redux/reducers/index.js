import { combineReducers } from 'redux';

// reducers
import boardsReducer from './boards';
import snackReducer from './snack';
import tasksReducer from './tasks';
import loaderReducer from './loaders';

const reducers = { boardsReducer, snackReducer, tasksReducer, loaderReducer };

const rootReducer = combineReducers(reducers);

export default rootReducer;
