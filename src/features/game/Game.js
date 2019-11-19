import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Header from '../../components/Header';
import Intro from '../../components/Intro';

import PlaceholderWord from './PlaceholderWord';
import InputUser from './InputUser';

import {
  fetchWordToGuess,
  saveCorrectLetter,
  saveFailedLetter,
  reduceAttempts,
  checkGameCompleted,
  saveGame,
} from './GameSlice';

const mapDispatch = {
  fetchWordToGuess,
  saveCorrectLetter,
  saveFailedLetter,
  reduceAttempts,
  checkGameCompleted,
  saveGame,
};

const GridCustom = styled(Grid)`
  margin-top: 3em;
`;

function Game() {
  const dispatch = useDispatch();

  const {
    wordToGuess,
    isLoading,
    attemptsLeft,
    correctLetters,
    isGameCompleted,
    score,
  } = useSelector(state => state.activeGame);

  const updateCorrectLetters = letter => {
    dispatch(saveCorrectLetter({ letter }));
  };

  const verifyIfGameCompleted = () => {
    dispatch(checkGameCompleted());
  };

  const updateFailedLetters = letter => {
    dispatch(saveFailedLetter({ letter }));
    dispatch(reduceAttempts());
  };

  // once initialized get a random word
  useEffect(() => {
    // fetch random word
    dispatch(fetchWordToGuess());
  }, [dispatch]);

  useEffect(() => {
    if (isGameCompleted) {
      dispatch(saveGame());
    }
  }, [isGameCompleted, dispatch]);

  return (
    <>
      {isLoading ? (
        <h3>is Loading</h3>
      ) : (
        <>
          <Header />
          <Intro />
          <GridCustom container direction="column" alignItems="center">
            <Grid item>attempts {attemptsLeft}</Grid>
            <Grid item>Score {score}</Grid>

            <Grid item>
              <PlaceholderWord
                letters={wordToGuess}
                correctLetters={correctLetters}
              />
            </Grid>
            <Grid item>
              <InputUser
                wordToGuess={wordToGuess}
                updateFailedLetters={updateFailedLetters}
                updateCorrectLetters={updateCorrectLetters}
                checkGameCompleted={verifyIfGameCompleted}
              />
            </Grid>
          </GridCustom>{' '}
        </>
      )}
    </>
  );
}

export default connect(null, mapDispatch)(Game);
