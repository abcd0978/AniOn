import React from 'react';
import Header from '../components/Layout/Header';
import SideBar from '../components/Layout/SideBar';
import Footer from '../components/Layout/Footer';
import { styled } from 'styled-components';
import { Confirm } from '../components/Modal/confirm/Confirm';
import DownBar from '../components/Layout/DownBar';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <LayoutWrapper>
      <Header />
      <SideBar />
      <DownBar />
      <Confirm />
      <div className="wrapper">{props.children}</div>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
