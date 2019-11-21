import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

function InputUser({
  wordToGuess,
  updateFailedLetters,
  updateCorrectLetters,
  checkGameCompleted,
  isGameCompleted,
}) {
  const [letter, updateLetter] = useState('');

  // check if input is correct
  function checkAttempt(e, updateLetter) {
    // state of words
    let currentLetter = e.target.value;

    updateLetter(() => currentLetter);
    if (!currentLetter) return;

    currentLetter = currentLetter.toLowerCase();

    if (wordToGuess.includes(currentLetter)) {
      updateCorrectLetters(currentLetter);
    } else {
      updateFailedLetters(currentLetter);
    }
    checkGameCompleted();
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLetter(() => '');
    }, 200);
    return () => clearTimeout(timer);
  }, [letter]);

  return (
    <Input
      placeholder="type letter"
      value={letter}
      inputProps={{
        'aria-label': 'type letter',
        maxLength: 1,
        readOnly: isGameCompleted,
        autoFocus: true,
      }}
      onChange={e => {
        checkAttempt(e, updateLetter);
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
  isGameCompleted: PropTypes.bool.isRequired,
};

export default InputUser;
