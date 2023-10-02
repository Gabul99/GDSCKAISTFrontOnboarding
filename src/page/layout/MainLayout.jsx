import React, { useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../../style/Colors';
import { Outlet } from 'react-router-dom';
import MainTopBar from '../../template/MainTopBar';
import { getForEntity } from '../../network/HttpRequests';

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
  useEffect(() => {
    getForEntity('/test').then(data => {
      console.log('TEST:', data);
    });

    getForEntity('/test/error')
      .then(data => {
        // 실행 안되어야 함
        console.log('Test/error:', data);
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  }, []);

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
