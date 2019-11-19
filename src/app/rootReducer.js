import { combineReducers } from '@reduxjs/toolkit';

import gameReducer from '../features/game/GameSlice';

const rootReducer = combineReducers({
  activeGame: gameReducer,
});

export const rootState = rootReducer;

export default rootReducer;
