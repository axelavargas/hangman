import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Intro() {
  return (
    <Paper>
      <Typography variant="h5" component="h3">
        Welcome
      </Typography>
      <Typography component="p">
        Just guess the word by typing a letter
        <ul>
          <li> if you guess the word with 5 attempts left, you get 100</li>
          <li>For every missed attempt rest 20 points. </li>
        </ul>
      </Typography>
      <Typography component="h2" variant="h2">
        Are you ready?
      </Typography>
    </Paper>
  );
}

export default Intro;
