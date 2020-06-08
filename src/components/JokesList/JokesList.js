import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import * as actions from '../../store/actions';
import Error from '../UI/Error/Error';
import { Spinner } from '../UI/Spinner/Spinner';
import JokeCard from './JokeCard/JokeCard';
import classes from './JokesList.module.scss';

const JokesList = () => {
  const { jokes, pageNo, maxPageNo, loading, error } = useSelector(
    (state) => state.jokeList
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.jokeListPageLoaded());

    return () => {
      dispatch(actions.jokeListPageUnloaded());
    };
  }, [dispatch]);

  const handleViewJoke = (joke) => {
    history.push(`/viewJoke/${joke.id}`);
  };

  const handleLoadJokes = (pageNo) => {
    dispatch(actions.loadJokes(pageNo));
  }

  return (
    <div className={classes.Container}>
      <h1 className={classes.PageTitle}>Knock-Knock!</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          <div className={classes.JokesContainer}>
            <div className={classes.Jokes}>
              {jokes.map((joke) => (
                <JokeCard
                  key={joke.id}
                  joke={joke}
                  onClicked={() => handleViewJoke(joke)}
                />
              ))}
            </div>
          </div>

          <div className={classes.Buttons}>
            {jokes && maxPageNo > 1 ? (
              <button
                className={classes.Button}
                disabled={loading || pageNo === 1}
                onClick={() => handleLoadJokes(pageNo - 1)}
              >
                Prev
              </button>
            ) : null}
            <Link to="/newJoke" className={`${classes.Button} ${classes.NewJokeButton}`}>
              I know a better one!
            </Link>
            {jokes && maxPageNo > 1 ? (
              <button
                className={classes.Button}
                disabled={loading || pageNo === maxPageNo}
                onClick={() => handleLoadJokes(pageNo + 1)}
              >
                Next
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default JokesList;
