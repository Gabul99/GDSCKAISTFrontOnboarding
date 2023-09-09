import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainLayout = () => {
  return <Container>main</Container>;
};

export default MainLayout;
