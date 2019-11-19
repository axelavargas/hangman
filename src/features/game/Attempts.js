import React from 'react';
import PropTypes from 'prop-types';

import Rating from '@material-ui/lab/Rating';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';

function Attempts({ attemptsLeft }) {
  const WrappingRating = styled(Rating)`
  && {
        color: #af52bf;
    },
  `;
  return (
    <>
      <Typography component="h6" variant="h6">
        Attempts Left:
      </Typography>

      <WrappingRating
        name="read-only"
        value={attemptsLeft}
        readOnly
        size="large"
        emptyIcon={<MoodBadIcon fontSize="inherit" />}
        icon={<EmojiEmotionsIcon fontSize="inherit" />}
      />
    </>
  );
}

Attempts.defaultProps = {
  attemptsLeft: 0,
};

Attempts.propTypes = {
  attemptsLeft: PropTypes.number,
};

export default Attempts;
