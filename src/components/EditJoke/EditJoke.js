import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/jokeActions';

const EditJoke = () => {
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
  
  return <div></div>;
};

export default EditJoke;