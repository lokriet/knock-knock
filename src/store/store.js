import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import jokeEditReducer from './reducers/jokeEdit';
import jokeListReducer from './reducers/jokeList';
import jokeViewReducer from './reducers/jokeView';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const rootReducer = combineReducers({
  jokeList: jokeListReducer,
  jokeView: jokeViewReducer,
  jokeEdit: jokeEditReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
