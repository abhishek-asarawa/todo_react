import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';

const loggerMiddleware = createLogger();

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunk, loggerMiddleware];
} else {
  middleware = [...middleware, thunk];
}

// Create a store which will be passed to persist store
const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(...middleware))
);

export default store;
