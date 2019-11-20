import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

function Intro() {
  const WrapPaper = styled(Paper)`
    && {
      padding: 2em;
      li {
        list-style: none;
        margin: 10px;
      }
    }
  `;

  return (
    <WrapPaper>
      <Typography component="p">
        Guess the word by typing a letter
        <ul>
          <li>
            If you guess the word with 5 attempts left, you get 100 points.
          </li>
          <li>For every missed attempt it will rest 20 points. </li>
        </ul>
      </Typography>
      <Typography component="h5" variant="h5">
        Are you ready?
      </Typography>
    </WrapPaper>
  );
}

export default Intro;
