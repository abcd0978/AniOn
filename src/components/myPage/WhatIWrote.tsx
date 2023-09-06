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
import { toast } from 'react-toastify';
import { getLikesForPost } from '../../api/boardapi';
type ReadMyBoard = Database['public']['Tables']['posts']['Row'];
type ReadMyBoardLikes = Database['public']['Tables']['likes']['Row'];
const userPostsAtom = atom<ReadMyBoard[]>([]);
const userPostLikeAtom = atom<ReadMyBoardLikes[]>([]);

const WhatIWrote = () => {
  const [userPosts, setUserPosts] = useAtom(userPostsAtom);
  const [userPostLike, setUserPostLike] = useAtom(userPostLikeAtom);

  const navigate = useNavigate();
  const user = useAtomValue(userStore.user);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const { width, height, isMobile, isLoaded } = useViewport();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const {
    data: postsAndTotalPages,
    isLoading,
    isFetching,
  } = useQuery(
    ['posts', selectedCategory, searchKeyword, page],
    () => getPosts(selectedCategory || '', page),
    {
      onError: (error) => {
        console.error('Error fetching posts:', error);
      },
    },
  );
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
        console.log('User posts fetched:', data);
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
        console.log('User post likes fetched:', userLikes);
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
    if (selectedPosts.length === 0) {
      toast.warning('선택된 항목이 없습니다.!', {
        autoClose: 800,
      });
      return;
    }

    const shouldDelete = window.confirm('삭제하시겠습니까?');
    if (shouldDelete) {
      try {
        for (const postId of selectedPosts) {
          await deletePost(postId);
        }

        setSelectedPosts([]);
        fetchUserPosts();
      } catch (error) {
        console.error('Error deleting selected posts:', error);
      }
    }
  };
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
  return (
    <Container>
      <ul>
        {userPosts
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((post) => {
            const likesForPost = userPostLike.filter(
              (like) => like.post_id === post.id,
            ).length;

            return (
              <li key={post.id}>
                <Post.Box>
                  <Post.input
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
                    <Post.title
                      onClick={() => handlePostClick(post.id?.toString() ?? '')}
                    >
                      {post.title}
                      <Post.Date>
                        {' '}
                        {new Date(post.created_at).toLocaleString()}{' '}
                      </Post.Date>
                    </Post.title>

                    {/* <div>받은 추천 수: {likesForPost}</div> */}
                  </Post.Content>
                </Post.Box>
                <Divider />
              </li>
            );
          })}
      </ul>
      <Post.ButtonBox>
        <Post.Button onClick={handleDeleteSelectedPosts}>선택삭제</Post.Button>
        <Post.ButtonAll onClick={handleSelectAll}>
          {selectedPosts.length === userPosts.length
            ? '전체 선택 해제'
            : '전체 선택'}
        </Post.ButtonAll>
      </Post.ButtonBox>
      <WriteP $mediawidth={width}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onClick={handlePageChange}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage >= totalPages}
        />
      </WriteP>
    </Container>
  );
};

export default WhatIWrote;
export const WriteP = styled.div<{ $mediawidth: number }>`
  height: 10vh;
  ${(props) => `width:${250 * (props.$mediawidth / 1920)}px;`}
  margin-bottom: -330px;
  justify-contents: center;
  margin-left: 400px;
`;
