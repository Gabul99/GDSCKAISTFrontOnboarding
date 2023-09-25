import * as React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  variant: "contained",
  fontSize: 13px,
  padding: 6px 12px,
  border: 1px solid,
  lineHeight: 1.5,
  backgroundColor: "#FFA800",
  borderColor: "#FFA800",
  '&:hover': {
    backgroundColor: "#FFA800",
    borderColor: "#FFA800",
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: "#FFA800",
    borderColor: "#FFA800",
  },
`;

const MuiButton = () => {
  return (
    <Button variant="contained" backgroundColor="#FFA800">
      접수하기
    </Button>
  );
};

export default MuiButton;
