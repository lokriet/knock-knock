import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as actions from '../../store/jokeActions';
import PageNotFound from '../PageNotFound/PageNotFound';
import Error from '../UI/Error/Error';
import { Spinner } from '../UI/Spinner/Spinner';

const EditJoke = () => {
  const { jokeId } = useParams();
  const isNew = jokeId == null;
  const { loading, error, initialized } = useSelector((state) => state);
  const joke = useSelector((state) =>
    isNew
      ? null
      : state.jokes.find((joke) => joke.id.toString() === jokeId.toString())
  );
  const nextId = useSelector((state) =>
    isNew ? null : state.jokes.length + 1
  );

  const [who, setWho] = useState(isNew ? '' : joke?.who || '');
  const [whoError, setWhoError] = useState(false);

  const [punchline, setPunchline] = useState(
    isNew ? '' : joke?.punchline || ''
  );
  const [punchlineError, setPunchlineError] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isNew) {
      dispatch(actions.loadJokes());
    }
  }, [dispatch, isNew]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = false;

    const updatedWho = who.trim();
    if (updatedWho === '') {
      setWhoError(true);
      errors = true;
    }

    const updatedPunchline = punchline.trim();
    if (updatedPunchline === '') {
      setPunchlineError(true);
      errors = true;
    }

    if (errors) {
      return;
    } else if (isNew) {
      dispatch(
        actions.createJoke({
          id: nextId,
          who: updatedWho,
          punchline: updatedPunchline
        },
        handleSubmitSuccess)
      );
    } else {
      dispatch(
        actions.updateJoke({
          id: Number(jokeId),
          who: updatedWho,
          punchline: updatedPunchline
        },
        handleSubmitSuccess)
      );
    }
  };

  const handleSubmitSuccess = () => {
    history.push('/');
  }

  const handleCancel = () => {
    history.push('/');
  }

  let view;
  if (!isNew && !initialized) {
    view = <Spinner />;
  } else {
    if (!isNew && !joke) {
      view = <PageNotFound />;
    } else {
      view = (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div>Knock-knock!</div>
              <div>Who's there?</div>
              <input
                type="text"
                name="who"
                value={who}
                onChange={(event) => setWho(event.target.value)}
              />
              <Error error={whoError ? 'Say hoo!' : null} />

              <div>{who} who?</div>
              <input
                type="text"
                name="punchline"
                value={punchline}
                onChange={(event) => setPunchline(event.target.value)}
              />
              <Error error={punchlineError ? 'A joke with no punchline is like a morning with no coffee!' : null} />
            </div>
            <div>
              <button type="submit" disabled={loading}>
                Save
              </button>
              <button type="button" onClick={handleCancel} disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
          <Error error={error} />
        </div>
      );
    }
  }
  return view;
};

export default EditJoke;
