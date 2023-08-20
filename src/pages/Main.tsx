import React, { ReactNode } from "react";
import Banner from "../components/Banner";
import styled from "styled-components";
import MainCard from "../components/MainCard";
const testNodes: ReactNode[] = ["슬라이드1", "슬라이드2", "슬라이드3"];
const Main = () => {
  return (
    <>
      <Banner options={{ loop: true, duration: 20 }} slides={testNodes} />
      <StMainCardContainer>
        <MainCard />
      </StMainCardContainer>
    </>
  );
};
const StMainCardContainer = styled.div``;
export default Main;
