import React from 'react';
import styled from 'styled-components';
import Colors from '../style/Colors';

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  padding: 16px;
  background-color: ${Colors.WHITE100};
  border-radius: 8px;
  align-items: center;

  .title {
    font-family: 'Noto Sans KR Bold';
    font-size: 24px;
  }
`;

const MainTopBar = () => {
  return (
    <Container>
      <h1 className="title">MedicalBook</h1>
    </Container>
  );
};

export default MainTopBar;
