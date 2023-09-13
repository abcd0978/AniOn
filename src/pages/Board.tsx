import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as userStore from '../store/userStore';
import * as S from './Board.style';
import { fetchPosts } from '../api/boardapi';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import Pagination from '../components/Pagenation';
import { toast } from 'react-toastify';
import pencil from '../assets/pencil.svg';
import search from '../assets/search.svg';
import ddabong from '../assets/ddabong.svg';
import ScrollToTop from '../components/scroll/ScrollToTop';
import ProfileWithBorder, {
  processItem,
} from '../components/ProfileWithBorder';
import type { PostType } from '../types/post';
import useViewport from '../hooks/useViewPort';

const Board = () => {
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { isMobile } = useViewport();

  const handleWriteClick = () => {
    if (!user) {
      toast.warning('로그인 후에 작성할 수 있습니다! 로그인 해주세요😳', {
        autoClose: 800,
      });
    } else {
      navigate('/board/write');
    }
  };
  const handleAllClick = () => {
    setSelectedCategory('');
    setPage(1);
  };
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const postQueryOptions = {
    queryKey: ['posts', selectedCategory, page],
    queryFn: () => fetchPosts(selectedCategory, page, searchKeyword),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60 * 1000,
    cacheTime: 60 * 6000,
    enabled: !!user,
  };

  const {
    data: postsAndTotalPages,
    isFetching,
    refetch,
  } = useQuery(postQueryOptions);

  const onClickPage = (selected: number | string) => {
    if (page === selected) return;
    if (typeof selected === 'number') {
      setPage(selected);
      return;
    }
    if (selected === 'prev' && page > 1) {
      setPage((prev: number) => prev - 1);
      return;
    }
    if (selected === 'next' && postsAndTotalPages?.totalPages) {
      setPage((prev: number) => prev + 1);
      return;
    }
  };

  const processBody = (bodyStr: string) => {
    let result = '';
    result = bodyStr
      .replace(/\n/g, '')
      .replace(/<[^>]*>?/g, '')
      .replace(/&nbsp;/gi, '');
    return result;
  };

  const handlePostClick = (postId: string) => {
    navigate(`/board/${postId}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    refetch();
    setSelectedCategory('');
  };

  return (
    <S.Container>
      <S.Title>게시판</S.Title>
      <S.Search>
        <S.ButtonBox>
          <S.Button
            onClick={() => handleAllClick()}
            style={{
              backgroundColor: selectedCategory === '' ? '#FF96DB' : '#FFEBF7',
              color: selectedCategory === '' ? '#ffffff' : 'black',
            }}
          >
            전체
          </S.Button>
          <S.Button
            onClick={() => handleCategoryClick('애니')}
            style={{
              backgroundColor:
                selectedCategory === '애니' ? '#FF96DB' : '#FFEBF7',
              color: selectedCategory === '애니' ? '#ffffff' : 'black',
            }}
          >
            애니
          </S.Button>
          <S.Button
            onClick={() => handleCategoryClick('자유')}
            style={{
              backgroundColor:
                selectedCategory === '자유' ? '#FF96DB' : '#FFEBF7',
              color: selectedCategory === '자유' ? '#ffffff' : 'black',
            }}
          >
            자유
          </S.Button>

          <S.Button
            onClick={() => handleCategoryClick('오류 신고')}
            style={{
              backgroundColor:
                selectedCategory === '오류 신고' ? '#FF96DB' : '#FFEBF7',
              color: selectedCategory === '오류 신고' ? '#ffffff' : 'black',
            }}
          >
            오류 신고
          </S.Button>
          {isMobile && ( // 모바일일 때 작성 버튼
            <S.MobileWrite onClick={handleWriteClick}>
              <img src={pencil} alt="작성" />
            </S.MobileWrite>
          )}
        </S.ButtonBox>
        {!isMobile && (
          <S.SearchInputContainer>
            <S.SearchInput
              type="text"
              placeholder="검색어를 입력해주세요!"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <S.SearchIcon
              src={search}
              alt="Search Icon"
              onClick={handleSearch}
            />

            <S.WriteButton onClick={handleWriteClick}>
              <img src={pencil} alt="작성" /> 작성하기
            </S.WriteButton>
          </S.SearchInputContainer>
        )}
      </S.Search>

      <S.PostWrapper>
        {isFetching ? (
          <div>로딩중...</div>
        ) : postsAndTotalPages?.data.length !== 0 ? (
          postsAndTotalPages?.data?.map((post: PostType, index: number) => (
            <S.Post
              key={post.id}
              onClick={() => post.id && handlePostClick(post.id.toString())}
              className={post.thumbnail ? 'tall' : 'small'}
            >
              <S.PostTop>
                <S.PostTopLeft>
                  #{postsAndTotalPages?.count! - (page - 1) * 12 - index}
                  <S.Category>{post.category} 게시판</S.Category>
                </S.PostTopLeft>
                <S.PostTopRight>
                  <S.Ddabong src={ddabong} alt="추천수" />
                  <div style={{ marginTop: '3px', marginRight: '5px' }}>
                    추천수 {post.likes?.length}
                  </div>
                </S.PostTopRight>
              </S.PostTop>
              <S.PostMiddle>
                <S.PostMiddleLeft>
                  <ProfileWithBorder
                    width={40}
                    $mediawidth={1920}
                    border_img_url={
                      post.users.inventory.length > 0
                        ? processItem(post.users.inventory).border
                        : undefined
                    }
                    profile_img_url={post.users?.profile_img_url}
                    key={post.id!}
                  />
                  <S.Ninkname>{post.users?.nickname}</S.Ninkname>
                  {post.users.inventory.length > 0 &&
                  processItem(post.users.inventory).award.img_url ? (
                    <S.StAwardImg
                      src={processItem(post.users.inventory).award.img_url!}
                      alt={processItem(post.users.inventory).award.name!}
                    />
                  ) : (
                    <S.AwardNo>칭호없음</S.AwardNo>
                  )}
                </S.PostMiddleLeft>
                <S.PostMiddleRight>
                  {new Date(post.created_at).toLocaleDateString()}
                </S.PostMiddleRight>
              </S.PostMiddle>
              <S.PostBottom>
                <S.PostBottomLeft $isFull={post.thumbnail ? false : true}>
                  <S.PostTitle>{post.title}</S.PostTitle>
                  <S.PostContent
                    id="post-content"
                    hasImage={post.thumbnail ? true : false}
                  >
                    {processBody(post.content)}
                  </S.PostContent>
                </S.PostBottomLeft>
                {post.thumbnail ? (
                  <S.PostBottomRight>
                    <S.Thumbnail src={post?.thumbnail} />
                  </S.PostBottomRight>
                ) : (
                  ''
                )}
              </S.PostBottom>
            </S.Post>
          ))
        ) : (
          <div>검색 결과 없음</div>
        )}
      </S.PostWrapper>
      <S.Page>
        <Pagination
          currentPage={page}
          totalPages={postsAndTotalPages?.totalPages || 1}
          onClick={onClickPage}
          isPreviousDisabled={page === 1}
          isNextDisabled={page >= (postsAndTotalPages?.totalPages || 1)}
        />
      </S.Page>
      <ScrollToTop />
    </S.Container>
  );
};

export default Board;
