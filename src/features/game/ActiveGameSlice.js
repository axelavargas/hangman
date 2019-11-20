import { createSlice } from '@reduxjs/toolkit';
// import { getRandomWord } from '../../api/hangmanApi';

const initialAttempts = 5;

const initialState = {
  id: null,
  wordToGuess: [],
  attemptsLeft: initialAttempts,
  isLoading: false,
  isGameCompleted: false,
  correctLetters: [],
  failedLetters: [],
  error: null,
  score: 0,
};

function calcScore(state) {
  return state.attemptsLeft > 0 ? state.attemptsLeft * 20 : 0;
}

const ActiveGameSlice = createSlice({
  name: 'activeGame',
  initialState,
  reducers: {
    startActiveGame(state, action) {
      const { wordToGuess, id } = action.payload;
      state.wordToGuess = wordToGuess;
      state.id = id;
    },
    saveCorrectLetter(state, action) {
      state.correctLetters.push(action.payload.letter);
    },
    saveFailedLetter(state, action) {
      state.failedLetters.push(action.payload.letter);
    },

    reduceAttempts(state) {
      state.attemptsLeft = state.attemptsLeft - 1;
    },

    checkGameCompleted(state, action) {
      if (state.attemptsLeft <= 0) {
        state.isGameCompleted = true;
      } else {
        state.isGameCompleted = state.wordToGuess.every(letter => {
          if (state.correctLetters.includes(letter)) {
            return true;
          }
          return false;
        });
      }
      state.score = calcScore(state);
    },

    resetActiveGame(state) {
      state.id = initialState.id;
      state.wordToGuess = initialState.wordToGuess;
      state.attemptsLeft = initialState.attemptsLeft;
      state.isLoading = initialState.isLoading;
      state.isGameCompleted = initialState.isGameCompleted;
      state.correctLetters = initialState.correctLetters;
      state.failedLetters = initialState.failedLetters;
      state.error = initialState.error;
      state.score = initialState.score;
    },
  },
});

export const {
  startActiveGame,
  saveCorrectLetter,
  saveFailedLetter,
  reduceAttempts,
  saveActiveGame,
  resetActiveGame,
  getWordFailure,
  checkGameCompleted,
} = ActiveGameSlice.actions;

export default ActiveGameSlice.reducer;
