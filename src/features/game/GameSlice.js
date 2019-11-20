import { createSlice } from '@reduxjs/toolkit';
import { getRandomWord } from '../../api/hangmanApi';
const uuidv4 = require('uuid/v4');

const initialState = {
  gamesAllIds: [],
  gamesById: {},
  currentGameId: null,
};

function startLoading(state) {
  state.isLoading = true;
}

function loadingFailed(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

const GameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    startGameStart: startLoading,
    startGameSuccess: {
      reducer(state, action) {
        const newActiveGame = {
          wordToGuess: action.payload.data.word.split(''),
          id: action.payload.id,
        };
        state.gamesAllIds.push(action.payload.id);
        state.gamesById[action.payload.id] = newActiveGame;
        state.currentGameId = action.payload.id;
        state.isLoading = false;
        state.error = null;
      },

      prepare(data) {
        return { payload: { data, id: uuidv4() } };
      },
    },
    startGameFailure: loadingFailed,
    saveGame(state, action) {
      const ActiveGame = action.payload;
      state.gamesById[ActiveGame.id] = ActiveGame;
    },
  },
});

export const {
  startGameStart,
  startGameSuccess,
  startGameFailure,
  saveGame,
} = GameSlice.actions;

export const fetchWordToGuess = () => async dispatch => {
  try {
    dispatch(startGameStart());
    const wordToGuess = await getRandomWord();
    dispatch(startGameSuccess(wordToGuess));
  } catch (err) {
    dispatch(startGameFailure(err.toString()));
  }
};

export default GameSlice.reducer;
