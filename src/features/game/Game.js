import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import Header from '../../components/Header';
import Intro from '../../components/Intro';

import GridCustom from '../../components/game/GridCustom';
import StartButton from '../../components/game/StartButton';
import ReStartButton from '../../components/game/ReStartButton';

import PlaceholderWord from './PlaceholderWord';
import InputUser from './InputUser';
import HighestScore from './HighestScore';
import ScoreGame from './ScoreGame';
import Attempts from './Attempts';

import {
  startActiveGame,
  saveCorrectLetter,
  saveFailedLetter,
  reduceAttempts,
  checkGameCompleted,
  resetActiveGame,
} from './ActiveGameSlice';

import { fetchWordToGuess, saveGame } from './GameSlice';

const mapDispatch = {
  startActiveGame,
  fetchWordToGuess,
  saveCorrectLetter,
  saveFailedLetter,
  reduceAttempts,
  checkGameCompleted,
  resetActiveGame,
  saveGame,
};

function Game() {
  const dispatch = useDispatch();
  const [isGameStarted, setGameStarted] = useState(false);
  const [isStartingNewGame, setStartingNewGame] = useState(false);
  const [isReStartingNewGame, setReStartingNewGame] = useState(false);

  const {
    wordToGuess,
    isLoading,
    attemptsLeft,
    correctLetters,
    failedLetters,
    isGameCompleted,
    score,
  } = useSelector(state => state.activeGame);

  const { currentGameId, gamesById, gamesAllIds } = useSelector(
    state => state.games,
  );

  const activeGameState = useSelector(state => state.activeGame);

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

  const startNewGame = () => {
    setGameStarted(() => !isGameStarted);
    setStartingNewGame(() => !isStartingNewGame);
  };

  const restartNewGame = () => {
    setReStartingNewGame(() => !isReStartingNewGame);
  };

  // once initialized get a random word
  useEffect(() => {
    // fetch random word
    if (isStartingNewGame || isReStartingNewGame) {
      dispatch(resetActiveGame());
      dispatch(fetchWordToGuess());
    }
    if (currentGameId && gamesById[currentGameId]) {
      dispatch(startActiveGame(gamesById[currentGameId]));
    }
    return function cleanup() {
      setStartingNewGame(() => false);
      setReStartingNewGame(() => false);
    };
  }, [
    dispatch,
    currentGameId,
    isReStartingNewGame,
    isStartingNewGame,
    gamesById,
    setStartingNewGame,
  ]);

  useEffect(() => {
    if (isGameCompleted) {
      dispatch(saveGame(activeGameState));
    }
  }, [isGameCompleted, activeGameState, dispatch]);

  return (
    <>
      {isLoading ? (
        <h3>grab some coffee, we are Loading...</h3>
      ) : (
        <>
          <Header />
          <Intro />
          <GridCustom
            container
            direction="column"
            justify="flex-end"
            alignItems="center"
          >
            <HighestScore gamesAllIds={gamesAllIds} gamesById={gamesById} />
          </GridCustom>
          <GridCustom container direction="column" alignItems="center">
            {!isGameStarted && !isGameCompleted ? (
              <StartButton
                variant="contained"
                color="primary"
                size="large"
                onClick={() => startNewGame()}
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
                {!isGameCompleted ? (
                  <Grid item xs={12}>
                    <InputUser
                      wordToGuess={wordToGuess}
                      updateFailedLetters={updateFailedLetters}
                      updateCorrectLetters={updateCorrectLetters}
                      checkGameCompleted={verifyIfGameCompleted}
                      isGameCompleted={isGameCompleted}
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <ReStartButton
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={() => restartNewGame()}
                  >
                    {isGameCompleted
                      ? 'Start Over'
                      : 'Too hard? Try another word?'}
                  </ReStartButton>
                </Grid>
              </>
            )}
            {isGameCompleted ? (
              <>
                <ScoreGame wordToGuess={wordToGuess} score={score} />
              </>
            ) : null}
          </GridCustom>
        </>
      )}
    </>
  );
}

export default connect(null, mapDispatch)(Game);
