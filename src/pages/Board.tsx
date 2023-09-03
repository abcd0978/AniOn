import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as userStore from '../store/userStore';
import * as S from './Board.style';
import { getPosts } from '../api/boardapi';
import { Database } from '../types/supabase';
import { useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import Pagination from '../components/Pagenation';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import pencil from '../assets/pencil.svg';
import search from '../assets/search.svg';
import ProfileWithBorder from '../components/ProfileWithBorder';
type ReadPosts = Database['public']['Tables']['posts']['Row'];

const Board = () => {
  const user = useAtomValue(userStore.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const handleWriteClick = () => {
    if (!user) {
      toast.warning('로그인 후에 작성할 수 있습니다! 로그인 해주세요😳', {
        autoClose: 1000,
      });
    } else {
      navigate('/board/write');
    }
  };
  const handleAllClick = () => {
    setSelectedCategory('');
  };
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const postQueryOptions = {
    queryKey: ['posts', selectedCategory, searchKeyword, page],
    queryFn: () => getPosts(selectedCategory, page),
    refetchOnWindowFocus: false,
  };

  const { data: postsAndTotalPages, isFetching } = useQuery(postQueryOptions);

  const onClickPage = (selected: number | string) => {
    if (page === selected) return;
    if (typeof selected === 'number') {
      setPage(selected);
      return;
    }
    if (selected === 'prev' && page > 1) {
      setPage((prev: any) => prev - 1);
      return;
    }
    if (selected === 'next' && postsAndTotalPages?.totalPages) {
      setPage((prev: any) => prev + 1);
      return;
    }
  };

  // 검색 결과에 따라 게시물 리스트를 필터링하고 정렬
  const filteredAndSortedPosts: ReadPosts[] | undefined = useMemo(() => {
    if (!postsAndTotalPages?.data) return undefined;

    return postsAndTotalPages.data
      .filter((post: ReadPosts) => {
        const postTitleIncludesKeyword = post.title.includes(searchKeyword);
        const postContentIncludesKeyword = post.content.includes(searchKeyword);
        const postUserNicknameIncludesKeyword =
          post.users?.nickname?.includes(searchKeyword) ?? false;

        return (
          postTitleIncludesKeyword ||
          postContentIncludesKeyword ||
          postUserNicknameIncludesKeyword
        );
      })
      .sort((a, b) => b.created_at.localeCompare(a.created_at)); // 최신 글이 위로 가도록 정렬
  }, [postsAndTotalPages, searchKeyword]);

  const handlePostClick = (postId: string) => {
    navigate(`/board/${postId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSelectedCategory('');
    queryClient.invalidateQueries(['posts', null, searchKeyword]);
  };

  return (
    <S.Container>
      <S.Title>게시판</S.Title>
      <S.Post>
        <S.Search>
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
        </S.Search>
        <S.Write>
          <form onSubmit={handleSearchSubmit}>
            <S.SearchInputContainer>
              <S.SearchInput
                type="text"
                placeholder="검색어를 입력해주세요!"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <S.SearchIcon src={search} alt="Search Icon" />
            </S.SearchInputContainer>
          </form>
          <S.WriteButton onClick={handleWriteClick}>
            <img src={pencil} /> 작성하기
          </S.WriteButton>
        </S.Write>
      </S.Post>

      <ul>
        <S.Header>
          <S.HeaderNo> NO.</S.HeaderNo>
          <S.HeaderTitle> 게시글 제목</S.HeaderTitle>
          <S.HeaderNick>유저 닉네임</S.HeaderNick>
          <S.Headerdate>작성일자</S.Headerdate>
          <S.HeaderLike> 추천수</S.HeaderLike>
        </S.Header>

        {isFetching ? (
          <div>로딩중...</div>
        ) : filteredAndSortedPosts ? (
          filteredAndSortedPosts.map((post: ReadPosts, index: number) => (
            <S.Postbox
              key={post.id}
              onClick={() => post.id && handlePostClick(post.id.toString())}
            >
              <S.BottomNo>
                {postsAndTotalPages?.count! - (page - 1) * 12 - index}
              </S.BottomNo>
              <S.BottomTitle>{post.title}</S.BottomTitle>

              <S.BottomNick>
                <S.Img src={post.users?.profile_img_url} alt="프로필 이미지" />
                {/* <ProfileWithBorder width={30} mediaWidth={1920} /> */}

                <div>{post.users?.nickname}</div>
              </S.BottomNick>
              <S.Bottomdate>
                {new Date(post.created_at).toLocaleString()}
              </S.Bottomdate>
              <S.BottomLike>{post.likes?.length}</S.BottomLike>
            </S.Postbox>
          ))
        ) : (
          <div>검색 결과 없음</div>
        )}
      </ul>

      <S.Page>
        <Pagination
          currentPage={page}
          totalPages={postsAndTotalPages?.totalPages || 1}
          onClick={onClickPage}
          isPreviousDisabled={page === 1}
          isNextDisabled={page >= (postsAndTotalPages?.totalPages || 1)}
        />
      </S.Page>
    </S.Container>
  );
};

export default Board;
