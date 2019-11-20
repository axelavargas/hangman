import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Attempts from './Attempts';

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

const StartButton = styled(Button)`
  && {
    padding: 16px 44px;
    background-color: #af52bf;
    font-size: 1.4rem;
    &:hover {
      background-color: #9c27b0;
    }
  }
`;

function Game() {
  const dispatch = useDispatch();
  const [isGameStarted, setGameStarted] = useState(false);

  const {
    wordToGuess,
    isLoading,
    attemptsLeft,
    correctLetters,
    failedLetters,
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
    if (!failedLetters.includes(letter)) {
      dispatch(saveFailedLetter({ letter }));
      dispatch(reduceAttempts());
    }
    //Todo: dispatch message this letter is already type
  };

  // once initialized get a random word
  useEffect(() => {
    // fetch random word
    dispatch(fetchWordToGuess());
  }, [dispatch, isGameStarted]);

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
            {!isGameStarted ? (
              <StartButton
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setGameStarted(() => true)}
              >
                Let's Play
              </StartButton>
            ) : (
              <>
                <Grid item xs={12}>
                  <Attempts attemptsLeft={attemptsLeft} />
                </Grid>
                <Grid item xs={12}>
                  <PlaceholderWord
                    letters={wordToGuess}
                    correctLetters={correctLetters}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputUser
                    wordToGuess={wordToGuess}
                    updateFailedLetters={updateFailedLetters}
                    updateCorrectLetters={updateCorrectLetters}
                    checkGameCompleted={verifyIfGameCompleted}
                    isGameCompleted={isGameCompleted}
                  />
                </Grid>
              </>
            )}
            {isGameCompleted ? (
              <>
                <Grid item>Score {score}</Grid>
                {score ? (
                  <div>YOU WON</div>
                ) : (
                  <div>YOU LOSE THE WORD WAS {wordToGuess.concat()}</div>
                )}
              </>
            ) : null}
          </GridCustom>
        </>
      )}
    </>
  );
}

export default connect(null, mapDispatch)(Game);
