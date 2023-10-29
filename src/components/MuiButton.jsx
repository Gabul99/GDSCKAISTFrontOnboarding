import * as React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Colors from '../style/Colors';

const StyledButton = styled(Button)`
  /* variant: "contained",
  fontSize: 13px,
  padding: 6px 12px,
  border: 1px solid,
  lineHeight: 1.5, */

  /* borderColor: "#FFA800",
  '&:hover': {
    backgroundColor: "#FFA800",
    borderColor: "#FFA800",
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: "#FFA800",
    borderColor: "#FFA800",
  },*/
  && {
    background-color: ${Colors.GREY00};
    color: ${Colors.GREY60};
    font-size: 13px;
    font-weight: bold;
  }
`;

const MuiButton = () => {
  return <StyledButton>접수하기</StyledButton>;
};

export default MuiButton;
