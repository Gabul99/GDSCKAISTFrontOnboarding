import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Colors from '../style/Colors';

const MyButton = styled(Button)`
  && {
    width: fit-content;
    background-color: ${Colors.POINT_DEEP};

    &:hover {
      background-color: ${Colors.POINT_MEDIUM};
    }

    color: ${Colors.WHITE100};
    padding: 4px 8px;
  }
`;

const MUITest = () => {
  return <MyButton>접수하기기기기기기</MyButton>;
};

export default MUITest;
