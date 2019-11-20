import { combineReducers } from '@reduxjs/toolkit';

import activeGameReducer from '../features/game/ActiveGameSlice';
import gameReducer from '../features/game/GameSlice';

const rootReducer = combineReducers({
  games: gameReducer,
  activeGame: activeGameReducer,
});

export const rootState = rootReducer;

export default rootReducer;
