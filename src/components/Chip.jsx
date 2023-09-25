import React from 'react';
import styled from 'styled-components';
import Colors from '../style/Colors';

const StyledButton = styled.button`
  padding: 4px 8px 4px 8px;
  font-size: 12px;

  background-color: ${Colors.WHITE100};
  color: ${Colors.POINT_DEEP};
  border: 1px solid ${Colors.POINT_MEDIUM};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  width: fit-content; /* 텍스트에 맞게 너비 설정 */
  margin-right: 8px;

  &:hover {
    background-color: ${Colors.POINT_DEEP};
    color: ${Colors.WHITE100};
    border: 1px solid ${Colors.POINT_DEEP};
  }
`;

export default StyledButton;
