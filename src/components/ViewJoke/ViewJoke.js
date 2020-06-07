import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import * as actions from '../../store/jokeActions';
import PageNotFound from '../PageNotFound/PageNotFound';
import Error from '../UI/Error/Error';
import { Spinner } from '../UI/Spinner/Spinner';
import classes from './ViewJoke.module.scss';

const ViewJoke = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { jokeId } = useParams();
  const { loading, error, initialized } = useSelector((state) => state);
  const joke = useSelector((state) =>
    state.jokes.find((joke) => joke.id.toString() === jokeId.toString())
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.loadJokes());
  }, [dispatch]);

  const handleEdit = () => {
    history.push(`/editJoke/${jokeId}`);
  };

  const handleDelete = () => {
    dispatch(actions.deleteJoke(jokeId, handleDeleteSuccess));
  };

  const handleDeleteSuccess = () => {
    history.push('/');
  };

  let view;
  if (!initialized) {
    view = <Spinner />;
  } else {
    if (!joke) {
      view = <PageNotFound />;
    } else {
      view = (
        <>
          {showConfirmDialog ? (
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
          ) : null}
          <div className={classes.Container}>
            <Link to="/" className={classes.PageTitle}>
              - Knock-knock!
            </Link>
            <div className={classes.Joke}>
              <p>- Who's there?</p>
              <p>- {joke.who}</p>
              <p>- {joke.who} who?</p>
              <p>- {joke.punchline}</p>
            </div>
            <div className={classes.Buttons}>
              <button
                className={classes.Button}
                onClick={() => {
                  setShowConfirmDialog(true);
                }}
                disabled={loading}
              >
                Delete
              </button>
              <button
                className={classes.Button}
                onClick={handleEdit}
                disabled={loading}
              >
                Edit
              </button>
              <Link to="/" className={classes.Button}>
                Home
              </Link>
            </div>
            <Error error={error} />
          </div>
        </>
      );
    }
  }

  return view;
};

export default ViewJoke;
