import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import * as actions from '../../store/jokeActions';
import PageNotFound from '../PageNotFound/PageNotFound';
import Error from '../UI/Error/Error';
import { Spinner } from '../UI/Spinner/Spinner';

const ViewJoke = () => {
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
  }

  let view;
  if (!initialized) {
    view = <Spinner />;
  } else {
    if (!joke) {
      view = <PageNotFound />;
    } else {
      view = (
        <div>
          <div>
            <div>Knock-knock!</div>
            <div>Who's there?</div>
            <div>{joke.who}</div>
            <div>{joke.who} who?</div>
            <div>{joke.punchline}</div>
          </div>
          <div>
            <button onClick={handleEdit} disabled={loading}>
              Edit
            </button>
            <button onClick={handleDelete} disabled={loading}>
              Delete
            </button>
            <Link to="/">Home</Link>
          </div>
          <Error error={error} />
        </div>
      );
    }
  }

  return view;
};

export default ViewJoke;
