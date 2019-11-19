import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

function InputUser({
  wordToGuess,
  updateFailedLetters,
  updateCorrectLetters,
  checkGameCompleted,
}) {
  // check if input is correct
  function checkAttempt(e) {
    // state of words
    const currentLetter = e.target.value;

    if (!currentLetter) return;

    if (wordToGuess.includes(currentLetter)) {
      updateCorrectLetters(currentLetter);
    } else {
      updateFailedLetters(currentLetter);
    }

    checkGameCompleted();
  }
  return (
    <Input
      placeholder="type letter"
      inputProps={{
        'aria-label': 'type letter',
        maxLength: 1,
      }}
      onChange={e => {
        checkAttempt(e);
      }}
    />
  );
}

InputUser.defaultProps = {
  wordToGuess: [],
};

InputUser.propTypes = {
  wordToGuess: PropTypes.arrayOf(PropTypes.string),
  updateFailedLetters: PropTypes.func.isRequired,
  updateCorrectLetters: PropTypes.func.isRequired,
  checkGameCompleted: PropTypes.func.isRequired,
};

export default InputUser;
