import games, { startGameSuccess, saveGame } from './GameSlice';

const initialState = {
  gamesAllIds: [],
  gamesById: {},
  currentGameId: null,
};
describe('games reducer', () => {
  it('should handle initial state', () => {
    expect(games(undefined, {})).toEqual(initialState);
  });

  it('should handle StartGameSuccess when word is passed', () => {
    expect(
      games(initialState, {
        type: startGameSuccess.type,
        payload: {
          data: { word: '3dHubs' },
          id: 'uuid-uiid',
        },
      }),
    ).toEqual({
      gamesAllIds: ['uuid-uiid'],
      gamesById: {
        'uuid-uiid': {
          wordToGuess: ['3', 'd', 'H', 'u', 'b', 's'],
          id: 'uuid-uiid',
        },
      },
      currentGameId: 'uuid-uiid',
      isLoading: false,
      error: null,
    });
  });
  it('should handle saveGame when game is completed', () => {
    const expectedGame = {
      id: 'uuid-uiid',
      wordToGuess: ['3', 'd', 'H', 'u', 'b', 's'],
      attemptsLeft: 5,
      isLoading: false,
      isGameCompleted: true,
      correctLetters: [],
      failedLetters: [],
      error: null,
      score: 20,
    };
    const stateWithOneElement = {
      gamesAllIds: ['uuid-uiid'],
      gamesById: {
        'uuid-uiid': {
          wordToGuess: ['3', 'd', 'H', 'u', 'b', 's'],
          id: 'uuid-uiid',
        },
      },
      currentGameId: 'uuid-uiid',
      isLoading: false,
      error: null,
    };
    expect(
      games(stateWithOneElement, {
        type: saveGame.type,
        payload: expectedGame,
      }),
    ).toEqual({
      gamesAllIds: ['uuid-uiid'],
      gamesById: {
        'uuid-uiid': expectedGame,
      },
      currentGameId: 'uuid-uiid',
      isLoading: false,
      error: null,
    });
  });
});
