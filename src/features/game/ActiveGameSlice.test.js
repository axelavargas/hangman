import activeGame, {
  startActiveGame,
  reduceAttempts,
  checkGameCompleted,
  saveCorrectLetter,
} from './ActiveGameSlice';

const initialState = {
  id: null,
  wordToGuess: [],
  attemptsLeft: 5,
  isLoading: false,
  isGameCompleted: false,
  correctLetters: [],
  failedLetters: [],
  error: null,
  score: 0,
};

const activeGameState = {
  ...initialState,
  wordToGuess: ['3', 'd', 'H', 'u', 'b', 's'],
  id: 'uuid-uiid',
};

const activeGameStateCompleted = {
  ...initialState,
  attemptsLeft: 4,
  wordToGuess: ['3', 'd', 'H', 'u', 'b', 's'],
  correctLetters: ['3', 'd', 'H', 'u', 'b', 's'],
  id: 'uuid-uiid',
};

describe('active game reducer', () => {
  it('should handle initial state', () => {
    expect(activeGame(undefined, {})).toEqual(initialState);
  });

  it('should handle startActiveGame when word is passed', () => {
    expect(
      activeGame(initialState, {
        type: startActiveGame.type,
        payload: {
          wordToGuess: ['3', 'd', 'H', 'u', 'b', 's'],
          id: 'uuid-uiid',
        },
      }),
    ).toEqual(activeGameState);
  });

  it('should handle reduceAttempts', () => {
    expect(
      activeGame(activeGameState, {
        type: reduceAttempts.type,
        payload: {},
      }),
    ).toEqual({
      ...activeGameState,
      attemptsLeft: 4,
    });
  });

  it('should handle saveCorrectLetter when word is passed', () => {
    expect(
      activeGame(activeGameState, {
        type: saveCorrectLetter.type,
        payload: {
          letter: '3',
        },
      }),
    ).toEqual({
      ...activeGameState,
      correctLetters: ['3'],
    });
  });

  it('should handle checkGameCompleted when correct letters match', () => {
    expect(
      activeGame(activeGameStateCompleted, {
        type: checkGameCompleted.type,
        payload: {},
      }),
    ).toEqual({
      ...activeGameStateCompleted,
      attemptsLeft: 4,
      isGameCompleted: true,
      score: 80,
    });
  });
  it('should handle checkGameCompleted when correct letters don not match', () => {
    expect(
      activeGame(activeGameState, {
        type: checkGameCompleted.type,
        payload: {},
      }),
    ).toEqual({
      ...activeGameState,
      isGameCompleted: false,
      score: 100,
    });
  });
});
