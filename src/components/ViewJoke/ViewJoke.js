import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import * as actions from '../../store/actions';
import Error from '../UI/Error/Error';
import { Spinner } from '../UI/Spinner/Spinner';
import classes from './ViewJoke.module.scss';

const ViewJoke = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { jokeId } = useParams();
  const { joke, loading, deleting, error, deleted } = useSelector(
    (state) => state.jokeView
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.jokeViewPageLoaded(jokeId));
    return () => {
      dispatch(actions.jokeViewPageUnloaded());
    };
  }, [dispatch, jokeId]);

  const handleEdit = () => {
    history.push(`/editJoke/${jokeId}`);
  };

  const handleDelete = () => {
    setShowConfirmDialog(false);
    dispatch(actions.deleteJoke());
  };

  let view;
  if (loading) {
    view = <Spinner />;
  } else if (deleted) {
    view = <Redirect to="/" />;
  } else {
    const confirmDeleteDialog = showConfirmDialog ? (
      <>
        <div
          className={classes.Backdrop}
          onClick={() => setShowConfirmDialog(false)}
        ></div>
        <div className={classes.ConfirmDeleteDialog}>
          <p>Delete the joke?</p>
          <div className={classes.Buttons}>
            <button
              className={classes.Button}
              onClick={() => setShowConfirmDialog(false)}
            >
              Noooo!
            </button>
            <button className={classes.Button} onClick={handleDelete}>
              Yes!
            </button>
          </div>
        </div>
      </>
    ) : null;

    const jokeLines = joke ? (
      <>
        <div className={classes.Joke}>
          <p>- Who's there?</p>
          <p>- {joke.who}</p>
          <p>- {joke.who} who?</p>
          <p>- {joke.punchline}</p>
        </div>
      </>
    ) : null;

    const actionButtons = (
      <div className={classes.Buttons}>
        {joke ? (
          <>
            <button
              className={classes.Button}
              onClick={() => {
                setShowConfirmDialog(true);
              }}
              disabled={deleting}
            >
              Delete
            </button>
            <button
              className={classes.Button}
              onClick={handleEdit}
              disabled={deleting}
            >
              Edit
            </button>
          </>
        ) : null}
        
        <Link to="/" className={classes.Button} disabled={deleting}>
          Home
        </Link>
      </div>
    );

    view = (
      <>
        {confirmDeleteDialog}

        <div className={classes.Container}>
          <Link to="/" className={classes.PageTitle}>
            - Knock-knock!
          </Link>

          {jokeLines}

          <Error error={error} />
          {actionButtons}
        </div>
      </>
    );
  }

  return view;
};

export default ViewJoke;
