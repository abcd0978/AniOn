import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useState, useEffect } from 'react';

import PrivateRoute from '../hoc/PrivateRoute';

import Main from '../pages/Main';
import Note from '../pages/Note';
import MyPage from '../pages/MyPage';
import Shop from '../pages/Shop/Shop';
import WorldCup from '../pages/WorldCup';
import Board from '../pages/Board/Board';
import AnimeDetail from '../pages/AnimeDetail';
import WriteBoard from '../pages/Board/WriteBoard';
import BoardDetail from '../pages/Board/BoardDetail';
import WorldCupResult from '../pages/WorldCupResult';
import AnimeRecommend from '../pages/AnimeRecommend';
import AfterSocialLogin from '../pages/AfterSocialLogin';
import NotFoundPage from '../pages/notfound/NotFoundPage';

import { ViewportProvider } from '../components/ViewportContext';
import NewPassword from '../components/Modal/NewPassword';
import ScrollTop from '../components/Scroll/ScrollTop';
import AniWorldCup from '../components/Worldcup/AniWorldCup';

import Layout from '../styles/Layout';
import { GlobalStyle } from '../styles/globalstyle';

const Router = () => {
  // const [viewport, setViewport] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });

  // useEffect(() => {
  //   const handleResize = () => {
  //     setViewport({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <ViewportProvider>
      <BrowserRouter>
        <Layout>
          <ScrollTop />
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="/newPassword/:user_id" element={<NewPassword />} />
            </Route>
            <Route path="/recommend" element={<AnimeRecommend />} />
            <Route path="/board" element={<Board />} />
            <Route path="/recommend/:ani_id" element={<AnimeDetail />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/worldcup" element={<WorldCup />} />
            <Route path="/worldcup/:gender" element={<AniWorldCup />} />
            <Route
              path="/worldcup/result/:gender"
              element={<WorldCupResult />}
            />

            {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
            <Route element={<PrivateRoute authentication={true} />}>
              <Route path="/board/write" element={<WriteBoard />} />

              <Route path="/myPage/:user_id" element={<MyPage />} />
              <Route path="/note/:user_id" element={<Note />} />
            </Route>
            <Route element={<PrivateRoute authentication={false} />}>
              <Route path="/sociallogin" element={<AfterSocialLogin />} />
            </Route>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/board/:post_id" element={<BoardDetail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ViewportProvider>
  );
};

export default Router;
