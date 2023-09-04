import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import AnimeRecommend from '../pages/AnimeRecommend';
import Board from '../pages/Board';
import MyPage from '../pages/MyPage';
import Shop from '../pages/Shop';
import UserInfoModify from '../pages/UserInfoModify';
import WorldCup from '../pages/WorldCup';
import WriteBoard from '../pages/WriteBoard';
import NotFoundPage from '../pages/NotFoundPage';
import WithAuth from '../hoc/WithAuth';
import AnimeDetail from '../pages/AnimeDetail';
import BoardDetail from '../pages/BoardDetail';
import { GlobalStyle } from '../styles/globalstyle';
import ScrollToTop from '../components/ScrollTop';
import AniWorldCup from '../components/worldcup/AniWorldCup';
import WorldCupResult from '../pages/WorldCupResult';
import Layout from '../styles/Layout';
import NewPassword from '../components/myPage/NewPassword';
const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
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
          <Route path="/worldcup/:gender" element={<AniWorldCup />} />
          <Route path="/worldcup/result/:gender" element={<WorldCupResult />} />
          <Route path="/board/write" element={WithAuth(WriteBoard, true)} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/board/:post_id" element={WithAuth(BoardDetail, null)} />
          <Route path="/newPassword/:user_id" element={<NewPassword />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
