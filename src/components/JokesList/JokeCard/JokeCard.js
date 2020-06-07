import PropTypes from 'prop-types';
import React from 'react';

import classes from './JokeCard.module.scss';

const JokeCard = ({ joke, onClicked }) => {
  return (
    <div className={classes.JokeCard} onClick={onClicked}>
      <p>- Knock-knock!</p>
      <p>- Who's there?</p>
      <p>- {joke.who}</p>
      <p>- {joke.who} who?</p>
      <p>- {joke.punchline}</p>
    </div>
  );
};

JokeCard.propTypes = {
  joke: PropTypes.shape({
    id: PropTypes.number,
    who: PropTypes.string,
    punchline: PropTypes.string
  })
};

export default JokeCard;
