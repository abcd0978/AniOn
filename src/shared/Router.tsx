import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import AnimeRecommend from '../pages/AnimeRecommend';
import Board from '../pages/Board';
import MyPage from '../pages/MyPage';
import Shop from '../pages/Shop';
import UserInfoModify from '../pages/UserInfoModify';
import WorldCup from '../pages/WorldCup';
import WriteBoard from '../pages/WriteBoard';
import Header from '../components/Header';
import NotFoundPage from '../pages/NotFoundPage';
import WithAuth from '../hoc/WithAuth';
import AnimeDetail from '../pages/AnimeDetail';
import BoardDetail from '../pages/BoardDetail';
import BoardAni from '../pages/BoardAni';
import BoardFree from '../pages/BoardFree';
import { GlobalStyle } from '../styles/globalstyle';
import ScrollToTop from '../components/ScrollTop';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <GlobalStyle />
      <Routes>
        <Route path="/" element={WithAuth(Main, null)} />
        <Route path="/recommend" element={WithAuth(AnimeRecommend, null)} />
        <Route path="/board" element={WithAuth(Board, null)} />
        <Route
          path="/recommend/:ani_id"
          element={WithAuth(AnimeDetail, null)}
        />
        <Route path="/myPage/:user_id" element={WithAuth(MyPage, true)} />
        <Route path="/shop/:category" element={WithAuth(Shop, true)} />
        <Route
          path="/userinfomodify"
          element={WithAuth(UserInfoModify, true)}
        />
        <Route path="/worldcup" element={WithAuth(WorldCup, true)} />
        <Route path="/board/write" element={WithAuth(WriteBoard, true)} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/board/:post_id" element={WithAuth(BoardDetail, null)} />
        <Route path="/ani" element={WithAuth(BoardAni, null)} />
        <Route path="/free" element={WithAuth(BoardFree, null)} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
