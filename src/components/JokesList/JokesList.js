import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import * as actions from '../../store/jokeActions';
import Error from '../UI/Error/Error';
import { Spinner } from '../UI/Spinner/Spinner';
import JokeCard from './JokeCard/JokeCard';

const JokesList = () => {
  const { jokes, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.loadJokes());
  }, [dispatch]);

  const handleViewJoke = (joke) => {
    history.push(`/viewJoke/${joke.id}`);
  }

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Link to="/newJoke">New</Link>
      <div>
        {jokes.map((joke) => (
          <JokeCard key={joke.id} joke={joke} onClicked={() => handleViewJoke(joke)} />
        ))}
      </div>

      <Error error={error} />
    </div>
  );
};

export default JokesList;
