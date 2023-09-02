import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <LayoutWrapper>
      <Header />
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
