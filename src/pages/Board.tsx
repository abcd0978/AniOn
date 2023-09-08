import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as userStore from '../store/userStore';
import * as S from './Board.style';
import { getPosts, searchPost } from '../api/boardapi';
import { Database } from '../types/supabase';
import { useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import Pagination from '../components/Pagenation';
import { toast } from 'react-toastify';
import pencil from '../assets/pencil.svg';
import search from '../assets/search.svg';
import ddabong from '../assets/ddabong.svg';
import ProfileWithBorder, {
  processItem,
} from '../components/ProfileWithBorder';
import type { PostType, InsertPost, UpdatePost } from '../types/post';
import useViewport from '../hooks/useViewPort';

const Board = () => {
  const user = useAtomValue(userStore.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { width } = useViewport();

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

  // console.log('dd', postsAndTotalPages);
  // 검색 결과에 따라 게시물 리스트를 필터링하고 정렬
  const filteredAndSortedPosts: PostType[] | undefined = useMemo(() => {
    if (!postsAndTotalPages?.data) return undefined;

    return postsAndTotalPages.data
      .filter((post: PostType) => {
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

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ppp = await searchPost(searchKeyword);
    // console.log('보드 검색', ppp);
    setSelectedCategory('');
    queryClient.invalidateQueries(['posts', null, searchKeyword]);
  };

  return (
    <S.Container>
      <S.Title>게시판</S.Title>

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
            <img src={pencil} alt="작성" /> 작성하기
          </S.WriteButton>
        </S.Write>
      </S.Search>

      <ul>
        {isFetching ? (
          <div>로딩중...</div>
        ) : filteredAndSortedPosts ? (
          filteredAndSortedPosts.map((post: PostType, index: number) => (
            //포스트
            <S.Post>
              <div
                key={post.id}
                onClick={() => post.id && handlePostClick(post.id.toString())}
              >
                <S.PostTop>
                  <S.PostTopLeft>
                    #{postsAndTotalPages?.count! - (page - 1) * 12 - index}
                    <S.Category>{post.category}게시판</S.Category>
                  </S.PostTopLeft>
                  <S.PostTopRight>
                    <S.Ddabong src={ddabong} alt="추천수" /> 추천수
                    {post.likes?.length}
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
                      <img
                        src={processItem(post.users.inventory).award.img_url!}
                        alt={processItem(post.users.inventory).award.name!}
                        style={{
                          width: '172px',
                          height: '32px',
                          marginRight: '8px',
                        }}
                      />
                    ) : (
                      <S.AwardNo>칭호없음</S.AwardNo>
                    )}
                  </S.PostMiddleLeft>
                  <S.PostMiddleRight>
                    {new Date(post.created_at).toLocaleString()}
                  </S.PostMiddleRight>
                </S.PostMiddle>
              </div>
              <S.PostBottom>
                <div>{post.title}</div>
                {/* <div>{post.content} </div> */}
              </S.PostBottom>
            </S.Post>
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
