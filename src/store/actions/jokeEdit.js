export const JokeEditActionTypes = {
  JOKE_EDIT_PAGE_LOADED: 'JOKE_EDIT_PAGE_LOADED',

  LOAD_EDIT_JOKE_STARTED: 'LOAD_EDIT_JOKE_STARTED',
  LOAD_EDIT_JOKE_SUCCESS: 'LOAD_EDIT_JOKE_SUCCESS',
  LOAD_EDIT_JOKE_FAILED: 'LOAD_EDIT_JOKE_FAILED',

  SAVE_JOKE_STARTED: 'SAVE_JOKE_STARTED',
  SAVE_JOKE_SUCCESS: 'SAVE_JOKE_SUCCESS',
  SAVE_JOKE_FAILED: 'SAVE_JOKE_FAILED',

  JOKE_EDIT_PAGE_UNLOADED: 'JOKE_EDIT_PAGE_UNLOADED'
};

export const jokeEditPageLoaded = (jokeId) => {
  return async (dispatch) => {
    try {
      if (jokeId && jokeId !== '') {
        dispatch(loadEditJokeStarted());
        const response = await fetch(`/jokes/${jokeId}`);
        if (response.ok) {
          const joke = await response.json();
          dispatch(loadEditJokeSuccess(joke));
        } else {
          dispatch(loadEditJokeFailed('Loading joke failed :('));
        }
      } else {
        dispatch(setJokeEditPageLoaded());
      }
    } catch (error) {
      dispatch(loadEditJokeFailed('Loading joke failed :('));
    }
  };
};

export const setJokeEditPageLoaded = () => {
  return {
    type: JokeEditActionTypes.JOKE_EDIT_PAGE_LOADED
  };
};

export const jokeEditPageUnloaded = () => {
  return {
    type: JokeEditActionTypes.JOKE_EDIT_PAGE_UNLOADED
  };
};

export const saveJoke = (joke, isCreate) => {
  return async (dispatch) => {
    try {
      dispatch(saveJokeStarted());
      const url = isCreate ? '/jokes' : `/jokes/${joke.id}`
      const method = isCreate ? 'POST' : 'PUT';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(joke)
      });
      if (response.ok) {
        dispatch(saveJokeSuccess());
      } else {
        dispatch(saveJokeFailed('Failed to create a joke :('));
      }
    } catch (error) {
      dispatch(saveJokeFailed('Failed to create a joke :('));
    }
  };
};

const loadEditJokeStarted = () => {
  return {
    type: JokeEditActionTypes.LOAD_EDIT_JOKE_STARTED
  };
};

const loadEditJokeSuccess = (joke) => {
  return {
    type: JokeEditActionTypes.LOAD_EDIT_JOKE_SUCCESS,
    payload: { joke }
  };
};

const loadEditJokeFailed = (error) => {
  return {
    type: JokeEditActionTypes.LOAD_EDIT_JOKE_FAILED,
    payload: { error }
  };
};

const saveJokeStarted = () => {
  return {
    type: JokeEditActionTypes.SAVE_JOKE_STARTED
  };
};

const saveJokeSuccess = () => {
  return {
    type: JokeEditActionTypes.SAVE_JOKE_SUCCESS
  };
};

const saveJokeFailed = (error) => {
  return {
    type: JokeEditActionTypes.SAVE_JOKE_FAILED,
    payload: { error }
  };
};
