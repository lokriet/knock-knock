export const JokeListActionTypes = {
  JOKE_LIST_PAGE_LOADED: 'JOKE_LIST_PAGE_LOADED',
  LOAD_JOKES_STARTED: 'LOAD_JOKES_STARTED',
  LOAD_JOKES_SUCCESS: 'LOAD_JOKES_SUCCESS',
  LOAD_JOKES_FAILED: 'LOAD_JOKES_FAILED',
  JOKE_LIST_PAGE_UNLOADED: 'JOKE_LIST_PAGE_UNLOADED'
};

const JOKES_PER_PAGE = 6;

export const jokeListPageLoaded = () => {
  return async (dispatch) => {
    try {
      dispatch(setJokeListPageLoaded());
      dispatch(loadJokes(1));
    } catch (error) {
      dispatch(loadJokesFailed('Loading jokes failed :('));
    }
  };
};

export const loadJokes = (pageNo) => {
  return async (dispatch) => {
    try {
      dispatch(loadJokesStarted());
      const response = await fetch(`/jokes?_sort=id&_order=desc&_page=${pageNo}&_limit=${JOKES_PER_PAGE}`);
      if (response.ok) {
        const jokes = await response.json();
        const totalJokesNo = Number(response.headers.get('x-total-count'));
        const maxPageNo = Math.ceil(totalJokesNo / JOKES_PER_PAGE);
        dispatch(loadJokesSuccess(jokes, pageNo, maxPageNo));
      } else {
        dispatch(loadJokesFailed('Loading jokes failed :('));
      }
    } catch (error) {
      dispatch(loadJokesFailed('Loading jokes failed :('));
    }
  };
}

const setJokeListPageLoaded = () => {
  return {
    type: JokeListActionTypes.JOKE_LIST_PAGE_LOADED
  };
};

export const jokeListPageUnloaded = () => {
  return {
    type: JokeListActionTypes.JOKE_LIST_PAGE_UNLOADED
  };
};

const loadJokesStarted = (pageNo) => {
  return {
    type: JokeListActionTypes.LOAD_JOKES_STARTED
  };
};

const loadJokesSuccess = (jokes, pageNo, maxPageNo) => {
  return {
    type: JokeListActionTypes.LOAD_JOKES_SUCCESS,
    payload: { jokes, pageNo, maxPageNo }
  };
};

const loadJokesFailed = (error) => {
  return {
    type: JokeListActionTypes.LOAD_JOKES_FAILED,
    payload: { error }
  };
};

