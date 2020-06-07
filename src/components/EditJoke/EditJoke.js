import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import * as actions from '../../store/actions';
import Error from '../UI/Error/Error';
import { Spinner } from '../UI/Spinner/Spinner';
import classes from './EditJoke.module.scss';

const EditJoke = ({isNew}) => {
  const { jokeId } = useParams();

  const { joke, loading, saving, error, saved } = useSelector(
    (state) => state.jokeEdit
  );

  const [values, setValues] = useState({
    who: '',
    punchline: ''
  });
  const [errors, setErrors] = useState({ who: false, punchline: false });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.jokeEditPageLoaded(jokeId));
    return () => {
      dispatch(actions.jokeEditPageUnloaded());
    };
  }, [dispatch, jokeId]);

  useEffect(() => {
    if (joke) {
      setValues({
        who: joke.who,
        punchline: joke.punchline
      })
    }
  }, [joke]);

  const validateInput = (inputName, inputValue) => {
    if (inputValue.trim() === '') {
      setErrors((errors) => ({ ...errors, [inputName]: true }));
      return false;
    } else {
      setErrors((errors) => ({ ...errors, [inputName]: false }));
      return true;
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

    if (!(whoValid && punchlineValid)) {
      return;
    } else {
      const updatedWho = values.who.trim();
      const updatedPunchline = values.punchline.trim();

      const id = isNew ? new Date().getTime() : joke.id;
      dispatch(actions.saveJoke({
        id,
        who: updatedWho,
        punchline: updatedPunchline
      }, isNew));

    }
  };

  const handleCancel = () => {
    history.push('/');
  };

  let view;
  if (loading) {
    view = <Spinner />;
  } else if (saved) {
    view = <Redirect to="/" />
  } else {
    view = (
      <div className={classes.Container}>
        <Link to="/" className={classes.PageTitle}>
          - Knock-knock!
        </Link>
        <form onSubmit={handleSubmit}>
          <div>
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
            <button className={classes.Button} type="submit" disabled={saving}>
              Save
            </button>
            <button
              className={classes.Button}
              type="button"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
        <Error error={error} />
      </div>
    );
  }
  return view;
};

EditJoke.propTypes = {
  isNew: PropTypes.bool
};

export default EditJoke;
