import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

function ScoreGame({ score, wordToGuess }) {
  const GridScore = styled(Grid)`
    .result {
      padding-top: 0.5em;
    }
    .won {
      color: #357a38;
    }
    .lost {
      color: #f50057;
    }

    .score {
      color: #af52bf;
    }
  `;
  return (
    <GridScore
      container
      direction="column"
      justify="flex-end"
      alignItems="center"
    >
      <Grid item>
        <Typography className="score" component="h4" variant="h4">
          Score {score}
        </Typography>
      </Grid>
      {score ? (
        <Typography className="result won" component="h5" variant="h5">
          Congratulations! YOU WON :D
        </Typography>
      ) : (
        <Typography className="result lost" component="h5" variant="h5">
          Upps! YOU LOST :(, the word was: {wordToGuess.concat()}
        </Typography>
      )}
    </GridScore>
  );
}

export default ScoreGame;
