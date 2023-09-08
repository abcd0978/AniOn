import React, { useEffect, useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { deletePost } from '../../api/boardapi';
import { Post, Review } from './Wrote.styles';
import { Button, Container, Divider } from './EditProfile';
import Pagination from '../Pagenation';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/boardapi';
import { StyledPostCategory } from './Wrote.styles';
import useViewport from '../../hooks/useViewPort';
import { styled } from 'styled-components';
import { useConfirm } from '../../hooks/useConfirm';
// import { getLikesForPost } from '../../api/boardapi';
type ReadMyBoard = Database['public']['Tables']['posts']['Row'];
type ReadMyBoardLikes = Database['public']['Tables']['likes']['Row'];
const userPostsAtom = atom<ReadMyBoard[]>([]);
const userPostLikeAtom = atom<ReadMyBoardLikes[]>([]);

const WhatIWrote = () => {
  const [userPosts, setUserPosts] = useAtom(userPostsAtom);
  const [userPostLike, setUserPostLike] = useAtom(userPostLikeAtom);
  const { openConfirm } = useConfirm();
  const navigate = useNavigate();
  const user = useAtomValue(userStore.user);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const { width } = useViewport();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: postsAndTotalPages } = useQuery(
    ['posts', selectedCategory, searchKeyword, page],
    () => getPosts(selectedCategory || '', page),
    {
      onError: (error) => {
        console.error('Error fetching posts:', error);
      },
    },
  );

  const fetchUserPosts = async () => {
    try {
      if (!user) {
        return;
      }
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('fetchUserPosts에서 에러', error);
      } else {
        setUserPosts(data);
      }
    } catch (error) {
      console.error('fetchUserPosts 에러', error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [setUserPosts, user]);
  const fetchUserPostLikes = async () => {
    try {
      if (!user) {
        return;
      }
      const { data, error } = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('fetchUserPostLikes에서 에러', error);
      } else {
        const userLikes = data.map((like) => ({
          id: '',
          post_id: like.post_id,
          user_id: user.id,
        }));
        setUserPostLike(userLikes);
      }
    } catch (error) {
      console.error('fetchUserPostLikes 에러', error);
    }
  };
  useEffect(() => {
    fetchUserPosts();
    fetchUserPostLikes();
  }, [setUserPosts, setUserPostLike, user, currentPage]);

  const handlePostClick = (id: string) => {
    navigate(`/board/${id}`);
  };

  const handleCheckboxChange = (postId: string) => {
    setSelectedPosts((prevSelected) => {
      if (prevSelected.includes(postId)) {
        return prevSelected.filter((id) => id !== postId);
      } else {
        return [...prevSelected, postId];
      }
    });
  };
  const handleSelectAll = () => {
    if (selectedPosts.length === userPosts.length) {
      setSelectedPosts([]);
    } else {
      const allPostIds = userPosts.map((post) => post.id?.toString() ?? '');
      setSelectedPosts(allPostIds);
    }
  };
  const handleDeleteSelectedPosts = async () => {
    try {
      const deleteConfirmData = {
        title: '게시글 삭제',
        content: '정말 삭제하실건가요??',
        callback: async () => {
          for (const postId of selectedPosts) {
            await deletePost(postId);
          }
          const updatedUserPost = userPosts.filter(
            (post) => !selectedPosts.includes(post.id?.toString() ?? ''),
          );
          setUserPosts(updatedUserPost);
          setSelectedPosts([]);
        },
      };

      openConfirm(deleteConfirmData);
    } catch (error) {
      console.error('게시글 삭제 중 에러', error);
    }
  };
  const itemsPerPage = 12;

  const totalPages = Math.ceil(userPosts.length / itemsPerPage);
  const handlePageChange = (page: number | 'prev' | 'next') => {
    if (page === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (page === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (typeof page === 'number' && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return Array.isArray(userPosts) && userPosts.length > 0 ? (
    <WriteContainer>
      <WriteTitle>작성한 글</WriteTitle>
      <PostContainer>
        {userPosts.slice(startIndex, endIndex).map((post) => {
          // const likesForPost = userPostLike.filter(
          //   (like) => like.post_id === post.id,
          // ).length;

          return (
            <div key={post.id}>
              <Post.Box>
                <Post.Input
                  type="checkbox"
                  checked={selectedPosts.includes(post.id?.toString() ?? '')}
                  onChange={() =>
                    handleCheckboxChange(post.id?.toString() ?? '')
                  }
                />
                <StyledPostCategory category={post.category}>
                  {post.category}
                </StyledPostCategory>
                <Post.Content>
                  <Post.Title
                    onClick={() => handlePostClick(post.id?.toString() ?? '')}
                  >
                    {post.title}
                    <Post.Date>
                      {new Date(post.created_at).toLocaleString()}{' '}
                    </Post.Date>
                  </Post.Title>

                  {/* <div>받은 추천 수: {likesForPost}</div> */}
                </Post.Content>
              </Post.Box>
              <Divider />
            </div>
          );
        })}
      </PostContainer>
      <PickButtonBox>
        <PickButtonAll onClick={handleSelectAll}>
          {selectedPosts.length === userPosts.length
            ? '전체 선택 해제'
            : '전체 선택'}
        </PickButtonAll>
        <PickButton onClick={handleDeleteSelectedPosts}>선택삭제</PickButton>
      </PickButtonBox>
      <WriteP>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onClick={handlePageChange}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage >= totalPages}
        />
      </WriteP>
    </WriteContainer>
  ) : (
    <NoPostsContainer>
      <NoPostsMessage>작성한 글이 없어요!</NoPostsMessage>
      <NoPostsButton onClick={() => navigate('/board')}>
        글 작성하러 가기
      </NoPostsButton>
    </NoPostsContainer>
  );
};

export default WhatIWrote;
export const WriteContainer = styled.div`
  position: relative;
  top: -73%;
  left: 15%;
`;
const WriteTitle = styled.div`
  position: absolute;
  top: -50px;
  left: 0px;
  width: 200px;
  height: 32px;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.36px;
  display: block;
`;
export const PostContainer = styled.div`
  margin-bottom: 28px;
`;

export const WriteP = styled.div`
  position: relative;
  top: 550px;
  left: 350px;
`;
const NoPostsContainer = styled.div`
  display: grid;
  align-items: center;

  justify-content: center;
  margin-left: 250%;
  margin-top: -20%;
`;
const NoPostsButton = styled.button`
  background-color: #8200ff;
  border-color: transparent;

  color: #fff;
  width: 226.5px;
  height: 48px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
`;
const NoPostsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const PickButton = styled.button`
  padding: 8px;
  margin: 2px;
  border: 1px solid #c88fff;
  border-radius: 12px;
  background-color: white;
  width: 112px;
  height: 32px;
  text-align: center;
  cursor: pointer;
`;
const PickButtonAll = styled.button`
  padding: 8px;
  border: 1px solid #c88fff;
  border-radius: 12px;
  background-color: #8200ff;
  color: white;
  width: 112px;
  height: 32px;
  text-align: center;
  float: right;
  cursor: pointer;
`;
const PickButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 5px);
  margin-top: 12px;
`;
