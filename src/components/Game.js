import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//TODO: get words from API
const words = ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer'];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomWord() {
  const index = getRandomInt(words.length);
  return words[index].split('');
}

const GridCustom = styled(Grid)`
  margin-top: 3em;
`;

function PlaceholderComponent(letters, correctLetters) {
  const WrapperPlaceholder = styled.ul`
    padding: 4em;
    display: flex;
    li {
      flex-direction: row;
      list-style: none;
      margin: 10px;
      font-size: 2em;
      border-bottom: 1px solid #000;
      min-width: 50px;
      height: 50px;
    }
  `;

  return (
    <>
      <WrapperPlaceholder>
        {letters.map(letter => {
          if (correctLetters.includes(letter)) {
            return <li>{letter}</li>;
          }
          return <li />;
        })}
      </WrapperPlaceholder>
    </>
  );
}

function failedAttempt(currentLetter, failedWords, updateAttempts) {
  failedWords.push(currentLetter);
  updateAttempts(attempts => {
    return attempts - 1;
  });
}

function successAttempt(currentLetter, updateCorrectLetters) {
  updateCorrectLetters(correctLetters => {
    return [...correctLetters, currentLetter];
  });
}
function isLetterGuessed(letter, correctLetters) {
  if (correctLetters.includes(letter)) {
    return true;
  }
  return false;
}
// check if input is correct
function checkAttempt(guessWord, updateAttempts, updateCorrectLetters, e) {
  // state of words
  const failedLetters = [];
  const currentLetter = e.target.value;

  if (!currentLetter) return;

  if (guessWord.includes(currentLetter)) {
    successAttempt(currentLetter, updateCorrectLetters);
  } else {
    failedAttempt(currentLetter, failedLetters, updateAttempts);
  }
}

function InputUser(guessWord, updateAttempts, updateCorrectLetters) {
  return (
    <Input
      placeholder="type letter"
      inputProps={{
        'aria-label': 'type letter',
        maxLength: 1,
      }}
      onChange={e => {
        checkAttempt(guessWord, updateAttempts, updateCorrectLetters, e);
      }}
    />
  );
}

function Game() {
  // TODO: get words list from API
  const initialAttempts = 5;
  const [guessWord, getGuessRandomWord] = useState([]);
  const [attempts, updateAttempts] = useState(initialAttempts);
  const [correctLetters, updateCorrectLetters] = useState([]);

  // once initialized get a random word
  useEffect(() => {
    // select random word
    getGuessRandomWord(getRandomWord());
  }, []);

  useEffect(() => {
    if (attempts <= 0) {
      console.log('game over');
      //TODO: disable input
    }
  }, [attempts]);

  useEffect(() => {
    if (correctLetters.length === 0) return;
    const isGameCompleted = guessWord.every(letter =>
      isLetterGuessed(letter, correctLetters),
    );
    if (isGameCompleted) {
      console.log('you Won');
      //TODO: disable input
    }
  }, [correctLetters, guessWord]);

  // generate placeholder based on word
  const Placeholder = PlaceholderComponent(guessWord, correctLetters);
  const InputLetter = InputUser(
    guessWord,
    updateAttempts,
    updateCorrectLetters,
  );
  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Hangman
          </Typography>
        </Toolbar>
      </AppBar>
      <GridCustom container direction="column" alignItems="center">
        <Grid item>attempts {attempts}</Grid>
        <Grid item>{Placeholder}</Grid>
        <Grid item>{InputLetter}</Grid>
      </GridCustom>
    </>
  );
}

export default Game;
