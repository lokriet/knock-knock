import { JokeListActionTypes as actionTypes } from '../actions/jokeList';

const initialState = {
  jokes: [],
  loading: false,
  error: null,
  pageLoaded: false
};

const jokeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_JOKES_STARTED:
      return loadJokesStarted(state, action);

    case actionTypes.LOAD_JOKES_SUCCESS:
      return loadJokesSuccess(state, action);

    case actionTypes.LOAD_JOKES_FAILED:
      return loadJokesFailed(state, action);

    case actionTypes.JOKE_LIST_PAGE_UNLOADED:
      return jokeListPageUnloaded(state, action);

    default:
      return state;
  }
};

const loadJokesStarted = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    pageLoaded: true
  };
};

const loadJokesSuccess = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        loading: false,
        error: null,
        jokes: [...action.payload.jokes]
      }
    : initialState;
};

const loadJokesFailed = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        loading: false,
        error: action.payload.error
      }
    : initialState;
};

const jokeListPageUnloaded = (state, action) => {
  return initialState;
};

export default jokeListReducer;
