import { createSlice } from '@reduxjs/toolkit';
import { getRandomWord } from '../../api/hangmanApi';

const initialAttempts = 5;

const initialState = {
  wordToGuess: [],
  attemptsLeft: initialAttempts,
  isLoading: false,
  isGameCompleted: false,
  correctLetters: [],
  failedLetters: [],
  error: null,
  score: 0,
};

function startLoading(state) {
  state.isLoading = true;
}

function calcScore(state) {
  return state.attemptsLeft > 0 ? state.attemptsLeft * 20 : 0;
}

function loadingFailed(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

const GameSlice = createSlice({
  name: 'activeGame',
  initialState,
  reducers: {
    getWordToGuessStart: startLoading,
    getWordToGuessSuccess(state, action) {
      if (action.payload.word) {
        state.wordToGuess = action.payload.word.split('');
      }
      state.isLoading = false;
      state.error = null;
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
    },

    saveGame(state, action) {
      if (state.isGameCompleted) {
        //calc score
        state.score = calcScore(state);
      }
    },
    restartGame() {},
    getWordFailure: loadingFailed,
  },
});

export const {
  getWordToGuessStart,
  getWordToGuessSuccess,
  getWordToGuessFailed,
  saveCorrectLetter,
  saveFailedLetter,
  reduceAttempts,
  saveGame,
  restartGame,
  getWordFailure,
  checkGameCompleted,
} = GameSlice.actions;

export const fetchWordToGuess = () => async dispatch => {
  try {
    dispatch(getWordToGuessStart());
    const wordToGuess = await getRandomWord();
    dispatch(getWordToGuessSuccess(wordToGuess));
  } catch (err) {
    dispatch(getWordFailure(err.toString()));
  }
};

export default GameSlice.reducer;
