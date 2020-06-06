export const JokeActionTypes = {
  LOAD_JOKES_SUCCESS: 'LOAD_JOKES_SUCCESS',
  CREATE_JOKE_SUCCESS: 'CREATE_JOKE_SUCCESS',
  UPDATE_JOKE_SUCCESS: 'UPDATE_JOKE_SUCCESS',
  DELETE_JOKE_SUCCESS: 'DELETE_JOKE_SUCCESS',

  OPERATION_STARTED: 'OPERATION_STARTED',
  OPERATION_FAILED: 'OPERATION_FAILED',
  OPERATION_RESET: 'OPERATION_RESET'
};

export const loadJokes = () => {
  return async (dispatch, getState) => {
    try {
      if (getState().initialized) {
        return;
      }

      dispatch(operationStarted());
      const response = await fetch('/jokes');
      if (response.ok) {
        const jokes = await response.json();
        dispatch(loadJokesSuccess(jokes));
      } else {
        dispatch(operationFailed('Loading jokes failed :('));
      }
    } catch (error) {
      dispatch(operationFailed('Loading jokes failed :('));
    }
  };
};

export const createJoke = (joke) => {
  return async (dispatch) => {
    try {
      dispatch(operationStarted());
      const response = await fetch('/jokes', {
        method: 'POST',
        body: JSON.stringify(joke)
      });
      if (response.ok) {
        dispatch(createJokeSuccess(joke));
      } else {
        dispatch(operationFailed('Failed to create a joke :('));
      }
    } catch (error) {
      dispatch(operationFailed('Failed to create a joke :('));
    }
  };
};

export const updateJoke = (joke) => {
  return async (dispatch) => {
    try {
      dispatch(operationStarted());
      const response = await fetch(`/jokes/${joke.id}`, {
        method: 'PUT',
        body: JSON.stringify(joke)
      });
      if (response.ok) {
        dispatch(updateJokeSuccess(joke));
      } else {
        dispatch(operationFailed('Failed to update the joke :('));
      }
    } catch (error) {
      dispatch(operationFailed('Failed to update the joke :('));
    }
  };
};

export const deleteJoke = (jokeId, onSuccess) => {
  return async (dispatch) => {
    try {
      dispatch(operationStarted());
      const response = await fetch(`/jokes/${jokeId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteJokeSuccess(jokeId));
        onSuccess();
      } else {
        dispatch(operationFailed('Failed to delete the joke :('));
      }
    } catch (error) {
      dispatch(operationFailed('Failed to delete the joke :('));
    }
  };
};

export const operationReset = () => {
  return {
    type: JokeActionTypes.OPERATION_RESET
  };
};

const loadJokesSuccess = (jokes) => {
  return {
    type: JokeActionTypes.LOAD_JOKES_SUCCESS,
    payload: { jokes }
  };
};

const createJokeSuccess = (joke) => {
  return {
    type: JokeActionTypes.CREATE_JOKE_SUCCESS,
    payload: { joke }
  };
};

const updateJokeSuccess = (joke) => {
  return {
    type: JokeActionTypes.UPDATE_JOKE_SUCCESS,
    payload: { joke }
  };
};

const deleteJokeSuccess = (jokeId) => {
  return {
    type: JokeActionTypes.DELETE_JOKE_SUCCESS,
    payload: { jokeId }
  };
};

const operationStarted = () => {
  return {
    type: JokeActionTypes.OPERATION_STARTED
  };
};

const operationFailed = (error) => {
  return {
    type: JokeActionTypes.OPERATION_FAILED,
    payload: { error }
  };
};

