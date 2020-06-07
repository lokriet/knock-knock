import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import * as actions from '../../store/jokeActions';
import PageNotFound from '../PageNotFound/PageNotFound';
import Error from '../UI/Error/Error';
import { Spinner } from '../UI/Spinner/Spinner';
import classes from './EditJoke.module.scss';

const EditJoke = () => {
  const { jokeId } = useParams();
  const isNew = jokeId == null;
  const { loading, error, initialized } = useSelector((state) => state);
  const joke = useSelector((state) =>
    isNew
      ? null
      : state.jokes.find((joke) => joke.id.toString() === jokeId.toString())
  );
  const nextAvailableId = useSelector((state) =>
    isNew ? null : state.jokes.length + 1
  );

  const [values, setValues] = useState({
    who: isNew ? '' : joke?.who || '',
    punchline: isNew ? '' : joke?.punchline || ''
  });
  const [errors, setErrors] = useState({ who: false, punchline: false });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isNew) {
      dispatch(actions.loadJokes());
    }
  }, [dispatch, isNew]);

  const validateInput = (inputName, inputValue) => {
    if (inputValue.trim() === '') {
      setErrors((errors) => ({ ...errors, [inputName]: true }));
      return true;
    } else {
      setErrors((errors) => ({ ...errors, [inputName]: false }));
      return false;
    }
  };

  const handleInputChanged = (event, inputName) => {
    const newValue = event.target.value;
    setValues((values) => ({ ...values, [inputName]: newValue }));
    validateInput(inputName, newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const whoValid = validateInput('who', values.who);
    const punchlineValid = validateInput('punchline', values.punchline);

    if (!whoValid || !punchlineValid) {
      return;
    } else {
      const updatedWho = values.who.trim();
      const updatedPunchline = values.punchline.trim();

      if (isNew) {
        dispatch(
          actions.createJoke(
            {
              id: nextAvailableId,
              who: updatedWho,
              punchline: updatedPunchline
            },
            handleSubmitSuccess
          )
        );
      } else {
        dispatch(
          actions.updateJoke(
            {
              id: Number(jokeId),
              who: updatedWho,
              punchline: updatedPunchline
            },
            handleSubmitSuccess
          )
        );
      }
    }
  };

  const handleSubmitSuccess = () => {
    history.push('/');
  };

  const handleCancel = () => {
    history.push('/');
  };

  let view;
  if (!isNew && !initialized) {
    view = <Spinner />;
  } else {
    if (!isNew && !joke) {
      view = <PageNotFound />;
    } else {
      view = (
        <div className={classes.Container}>
          <form onSubmit={handleSubmit}>
            <div>
              <Link to="/" className={classes.PageTitle}>
                - Knock-knock!
              </Link>
              <p>- Who's there?</p>
              <span>- </span>
              <input
                type="text"
                name="who"
                value={values.who}
                maxLength={200}
                onChange={(event) => handleInputChanged(event, 'who')}
              />
              <Error
                className={classes.InputError}
                error={errors.who ? 'Say hoo!' : null}
              />

              <p>- {values.who} who?</p>
              <span>- </span>
              <input
                type="text"
                name="punchline"
                value={values.punchline}
                maxLength={500}
                onChange={(event) => handleInputChanged(event, 'punchline')}
              />
              <Error
                className={classes.InputError}
                error={
                  errors.punchline
                    ? 'A joke without a punchline is like a morning without a coffee!'
                    : null
                }
              />
            </div>
            <div className={classes.Buttons}>
              <button
                className={classes.Button}
                type="submit"
                disabled={loading}
              >
                Save
              </button>
              <button
                className={classes.Button}
                type="button"
                onClick={handleCancel}
                disabled={loading}
              >
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
