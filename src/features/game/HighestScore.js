import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

function HighestScore({ gamesAllIds, gamesById }) {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    function calcHighScore() {
      let highScore = 0;
      gamesAllIds.map(gameId => {
        const game = gamesById[gameId];
        if (game.score > highScore) {
          highScore = game.score;
        }
        return highScore;
      });
      return highScore;
    }

    setHighScore(calcHighScore());
  }, [gamesById, gamesAllIds]);

  return (
    <Grid item xs={12}>
      Highest Score : <Chip color="primary" label={highScore} />
    </Grid>
  );
}

HighestScore.defaultProps = {
  gamesAllIds: [],
  gamesById: {},
};

HighestScore.propTypes = {
  gamesAllIds: PropTypes.array,
  gamesById: PropTypes.object,
};

export default HighestScore;
