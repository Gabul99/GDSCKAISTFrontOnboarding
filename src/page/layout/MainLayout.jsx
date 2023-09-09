import React from 'react';
import styled from 'styled-components';
import Colors from '../../style/Colors';
import { Outlet } from 'react-router-dom';
import MainTopBar from '../../template/MainTopBar';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.GREY00};
  align-items: center;
  padding: 32px;
`;

const Contents = styled.div`
  width: 720px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MainLayout = () => {
  return (
    <Container>
      <Contents>
        <MainTopBar />
        <Outlet />
      </Contents>
    </Container>
  );
};

export default MainLayout;
