export const JokeViewActionTypes = {
  LOAD_VIEW_JOKE_STARTED: 'LOAD_VIEW_JOKE_STARTED',
  LOAD_VIEW_JOKE_SUCCESS: 'LOAD_VIEW_JOKE_SUCCESS',
  LOAD_VIEW_JOKE_FAILED: 'LOAD_VIEW_JOKE_FAILED',

  DELETE_JOKE_STARTED: 'DELETE_JOKE_STARTED',
  DELETE_JOKE_SUCCESS: 'DELETE_JOKE_SUCCESS',
  DELETE_JOKE_FAILED: 'DELETE_JOKE_FAILED',

  JOKE_VIEW_PAGE_UNLOADED: 'JOKE_VIEW_PAGE_UNLOADED'
};

export const jokeViewPageLoaded = (jokeId) => {
  return async (dispatch) => {
    try {
      dispatch(loadViewJokeStarted());
      const response = await fetch(`/jokes/${jokeId}`);
      if (response.ok) {
        const joke = await response.json();
        dispatch(loadViewJokeSuccess(joke));
      } else {
        dispatch(loadViewJokeFailed('Loading joke failed :('));
      }
    } catch (error) {
      dispatch(loadViewJokeFailed('Loading joke failed :('));
    }
  };
};

export const jokeViewPageUnloaded = () => {
  return {
    type: JokeViewActionTypes.JOKE_VIEW_PAGE_UNLOADED
  };
};

export const deleteJoke = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(deleteJokeStarted());
      let activeJoke = getState().jokeView.joke;
      if (!activeJoke) {
        dispatch(deleteJokeFailed('Internal error occured. Please try again'));
      } else {
        const response = await fetch(`/jokes/${activeJoke.id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          dispatch(deleteJokeSuccess());
        } else {
          dispatch(deleteJokeFailed('Failed to delete the joke :('));
        }
      }
    } catch (error) {
      dispatch(deleteJokeFailed('Failed to delete the joke :('));
    }
  };
};

const loadViewJokeStarted = () => {
  return {
    type: JokeViewActionTypes.LOAD_VIEW_JOKE_STARTED
  };
};

const loadViewJokeSuccess = (joke) => {
  return {
    type: JokeViewActionTypes.LOAD_VIEW_JOKE_SUCCESS,
    payload: { joke }
  };
};

const loadViewJokeFailed = (error) => {
  return {
    type: JokeViewActionTypes.LOAD_VIEW_JOKE_FAILED,
    payload: { error }
  };
};

const deleteJokeStarted = () => {
  return {
    type: JokeViewActionTypes.DELETE_JOKE_STARTED
  };
};

const deleteJokeSuccess = () => {
  return {
    type: JokeViewActionTypes.DELETE_JOKE_SUCCESS
  };
};

const deleteJokeFailed = (error) => {
  return {
    type: JokeViewActionTypes.DELETE_JOKE_FAILED,
    payload: { error }
  };
};
