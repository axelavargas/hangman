import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';

function Header() {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <NaturePeopleIcon fontSize="large" />
        <Typography variant="h6" color="inherit">
          The Minimalist Hangman
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
