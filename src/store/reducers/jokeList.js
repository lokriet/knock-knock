import { JokeListActionTypes as actionTypes } from '../actions/jokeList';

const initialState = {
  jokes: [],
  pageNo: 1,
  maxPageNo: 1,
  loading: false,
  error: null,
  pageLoaded: false
};

const jokeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOKE_LIST_PAGE_LOADED:
      return jokeListPageLoaded(state, action);

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

const jokeListPageLoaded = (state, action) => {
  return {
    ...state,
    pageLoaded: true
  }
}

const loadJokesStarted = (state, action) => {
  return state.pageLoaded ? {
    ...state,
    loading: true,
    error: null
  } : initialState;
};

const loadJokesSuccess = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        loading: false,
        error: null,
        jokes: action.payload.jokes,
        pageNo: action.payload.pageNo,
        maxPageNo: action.payload.maxPageNo
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
