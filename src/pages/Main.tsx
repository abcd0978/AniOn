import React, { ReactNode } from "react";
import Banner from "../components/Banner";
import styled from "styled-components";
import MainCard from "../components/MainCard";
import Modal from "../components/Modal/Modal";
import { useAtom } from "jotai";
import * as modalStore from "../store/modalStore";
import LoginModalContents from "../components/Modal/LoginModalContents";
import RegisterModalContents from "../components/Modal/RegisterModalContents";
const testNodes: ReactNode[] = ["슬라이드1", "슬라이드2", "슬라이드3"];
const Main = () => {
  const [modal, setModal] = useAtom(modalStore.isModalOpened);
  const [modalContents, setModalContents] = useAtom(modalStore.modalContents);
  const modalContentsFunc = (name: string) => {
    switch (name) {
      case "login": {
        return <LoginModalContents />;
      }
      case "register": {
        return <RegisterModalContents />;
      }
    }
  };
  return (
    <>
      <Banner options={{ loop: true, duration: 20 }} slides={testNodes} />
      <StMainCardContainer>
        <MainCard />
      </StMainCardContainer>
      {modal && <Modal>{modalContentsFunc(modalContents)}</Modal>}
    </>
  );
};
const StMainCardContainer = styled.div``;
export default Main;
