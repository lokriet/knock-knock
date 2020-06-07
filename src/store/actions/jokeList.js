export const JokeListActionTypes = {
  LOAD_JOKES_STARTED: 'LOAD_JOKES_STARTED',
  LOAD_JOKES_SUCCESS: 'LOAD_JOKES_SUCCESS',
  LOAD_JOKES_FAILED: 'LOAD_JOKES_FAILED',
  JOKE_LIST_PAGE_UNLOADED: 'JOKE_LIST_PAGE_UNLOADED'
};

export const jokeListPageLoaded = () => {
  return async (dispatch) => {
    try {
      dispatch(loadJokesStarted());
      const response = await fetch('/jokes');
      if (response.ok) {
        const jokes = await response.json();
        dispatch(loadJokesSuccess(jokes));
      } else {
        dispatch(loadJokesFailed('Loading jokes failed :('));
      }
    } catch (error) {
      dispatch(loadJokesFailed('Loading jokes failed :('));
    }
  };
};

export const jokeListPageUnloaded = () => {
  return {
    type: JokeListActionTypes.JOKE_LIST_PAGE_UNLOADED
  };
};

const loadJokesStarted = () => {
  return {
    type: JokeListActionTypes.LOAD_JOKES_STARTED
  };
};

const loadJokesSuccess = (jokes) => {
  return {
    type: JokeListActionTypes.LOAD_JOKES_SUCCESS,
    payload: { jokes }
  };
};

const loadJokesFailed = (error) => {
  return {
    type: JokeListActionTypes.LOAD_JOKES_FAILED,
    payload: { error }
  };
};

