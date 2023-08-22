import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import AnimeRecommend from "../pages/AnimeRecommend";
import Board from "../pages/Board";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import Register from "../pages/Register";
import Shop from "../pages/Shop";
import UserInfoModify from "../pages/UserInfoModify";
import WorldCup from "../pages/WorldCup";
import WriteBoard from "../pages/WriteBoard";
import Header from "../components/Header";
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/recommend" element={<AnimeRecommend />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board/" element={<Board />} />
        <Route path="/myPage/:user_id" element={<MyPage />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/userinfomodify" element={<UserInfoModify />} />
        <Route path="/worldcup" element={<WorldCup />} />
        <Route path="/board/write" element={<WriteBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
