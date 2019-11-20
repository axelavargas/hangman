import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const ReStartButton = styled(Button)`
  && {
    margin-top: 1em;
    background-color: #1c54b2;
    font-size: 1rem;
    &:hover {
      background-color: #2979ff;
    }
  }
`;
export default ReStartButton;
