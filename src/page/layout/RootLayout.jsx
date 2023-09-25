import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';

const RootContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 1440px;
  background-color: white;
`;

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/main');
  }, []);

  return (
    <RootContainer>
      <GlobalStyle />
      <Outlet />
    </RootContainer>
  );
};

export default RootLayout;
