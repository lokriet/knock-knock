import { JokeEditActionTypes as actionTypes } from '../actions/jokeEdit';

const initialState = {
  joke: null,
  loading: false,
  saving: false,
  error: null,
  saved: false,
  pageLoaded: false
};

const jokeEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOKE_EDIT_PAGE_LOADED:
      return jokeEditPageLoaded(state, action);

    case actionTypes.LOAD_EDIT_JOKE_STARTED:
      return loadEditJokeStarted(state, action);

    case actionTypes.LOAD_EDIT_JOKE_SUCCESS:
      return loadEditJokeSuccess(state, action);

    case actionTypes.LOAD_EDIT_JOKE_FAILED:
      return loadEditJokeFailed(state, action);

    case actionTypes.SAVE_JOKE_STARTED:
      return saveJokeStarted(state, action);

    case actionTypes.SAVE_JOKE_SUCCESS:
      return saveJokeSuccess(state, action);

    case actionTypes.SAVE_JOKE_FAILED:
      return saveJokeFailed(state, action);

    case actionTypes.JOKE_EDIT_PAGE_UNLOADED:
      return jokeEditPageUnloaded(state, action);
    default:
      return state;
  }
};

const jokeEditPageLoaded = (state, action) => {
  return {
    ...state,
    pageLoaded: true
  }
};

const loadEditJokeStarted = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    pageLoaded: true
  };
};

const loadEditJokeSuccess = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        loading: false,
        error: null,
        joke: action.payload.joke
      }
    : initialState;
};

const loadEditJokeFailed = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        loading: false,
        error: action.payload.error
      }
    : initialState;
};

const saveJokeStarted = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        saving: true,
        error: null
      }
    : initialState;
};

const saveJokeFailed = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        saving: false,
        error: action.payload.error
      }
    : initialState;
};

const saveJokeSuccess = (state, action) => {
  return state.pageLoaded
    ? {
        ...state,
        saving: false,
        error: null,
        saved: true
      }
    : initialState;
};

const jokeEditPageUnloaded = (state, action) => {
  return initialState;
};

export default jokeEditReducer;
