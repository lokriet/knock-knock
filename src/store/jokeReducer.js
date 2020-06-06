import { JokeActionTypes } from './jokeActions';

const initialState = {
  jokes: [],
  loading: false,
  error: null,
  initialized: false
};

const jokesReducer = (state = initialState, action) => {
  switch (action.type) {
    case JokeActionTypes.LOAD_JOKES_SUCCESS:
      return loadJokesSuccess(state, action);

    case JokeActionTypes.CREATE_JOKE_SUCCESS:
      return createJokeSuccess(state, action);

    case JokeActionTypes.UPDATE_JOKE_SUCCESS:
      return updateJokeSuccess(state, action);

    case JokeActionTypes.DELETE_JOKE_SUCCESS:
      return deleteJokeSuccess(state, action);

    case JokeActionTypes.OPERATION_STARTED:
      return operationStarted(state, action);

    case JokeActionTypes.OPERATION_FAILED:
      return operationFailed(state, action);

    case JokeActionTypes.OPERATION_RESET:
      return operationReset(state, action);
    default:
      return state;
  }
};

const loadJokesSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    jokes: action.payload.jokes,
    initialized: true
  };
};

const createJokeSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    jokes: state.jokes.concat(action.payload.joke)
  };
};

const updateJokeSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    jokes: state.jokes.map((joke) =>
      joke.id.toString() === action.payload.joke.id.toString() ? action.payload.joke : joke
    )
  };
};

const deleteJokeSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    jokes: state.jokes.filter((joke) => joke.id.toString() !== action.payload.jokeId.toString())
  };
};

const operationStarted = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true
  };
};

const operationFailed = (state, action) => {
  return {
    ...state,
    error: action.payload.error,
    loading: false
  };
};

const operationReset = (state, action) => {
  return {
    ...state,
    error: false,
    loading: false
  };
};

export default jokesReducer;
