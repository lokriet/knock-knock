import PropTypes from 'prop-types';
import React from 'react';

const JokeCard = ({ joke, onClicked }) => {
  return (
    <div onClick={onClicked}>
      <div>Knock-knock!</div>
      <div>Who's there?</div>
      <div>{joke.who}</div>
      <div>{joke.who} who?</div>
      <div>{joke.punchline}</div>
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
