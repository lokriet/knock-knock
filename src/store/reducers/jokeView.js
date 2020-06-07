import { JokeViewActionTypes as actionTypes } from '../actions/jokeView';

const initialState = {
  joke: null,
  loading: false,
  deleting: false,
  error: null,
  deleted: false,
  pageLoaded: false
};

const jokeViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_VIEW_JOKE_STARTED:
      return loadJokeStarted(state, action);

    case actionTypes.LOAD_VIEW_JOKE_SUCCESS:
      return loadJokeSuccess(state, action);

    case actionTypes.LOAD_VIEW_JOKE_FAILED:
      return loadJokeFailed(state, action);

    case actionTypes.DELETE_JOKE_STARTED:
      return deleteJokeStarted(state, action);

    case actionTypes.DELETE_JOKE_SUCCESS:
      return deleteJokeSuccess(state, action);

    case actionTypes.DELETE_JOKE_FAILED:
      return deleteJokeFailed(state, action);

    case actionTypes.JOKE_VIEW_PAGE_UNLOADED:
      return jokeViewPageUnloaded(state, action);
    default:
      return state;
  }
};

const loadJokeStarted = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    pageLoaded: true
  };
};

const loadJokeSuccess = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        joke: action.payload.joke,
        loading: false,
        error: null
      }
    : initialState;
};

const loadJokeFailed = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        loading: false,
        error: action.payload.error
      }
    : initialState;
};

const deleteJokeStarted = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        deleting: true,
        error: null
      }
    : initialState;
};

const deleteJokeSuccess = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        deleting: false,
        error: null,
        deleted: true
      }
    : initialState;
};

const deleteJokeFailed = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        deleting: false,
        error: action.payload.error
      }
    : initialState;
};

const jokeViewPageUnloaded = (state, action) => {
  return initialState;
};

export default jokeViewReducer;
