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
import { GlobalStyle } from '../styles/globalstyle';
const Router = () => {
  return (
    <BrowserRouter>
      <Header />

      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/recommend" element={WithAuth(AnimeRecommend, true)} />
        <Route path="/board" element={WithAuth(Board, null)} />
        <Route path="/myPage/:user_id" element={WithAuth(MyPage, true)} />
        <Route path="/shop/:category" element={WithAuth(Shop, true)} />
        <Route
          path="/userinfomodify"
          element={WithAuth(UserInfoModify, true)}
        />
        <Route path="/worldcup" element={WithAuth(WorldCup, true)} />
        <Route path="/board/write" element={WithAuth(WriteBoard, true)} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
