import React, { useEffect, useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient'; // Import supabase client
import { deletePost } from '../../api/boardapi';
import { Post, Review } from './Wrote.styles';
import { Button, Divider, EditTitle } from './EditProfile';
import Pagination from '../Pagenation';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/boardapi';

type ReadMyBoard = Database['public']['Tables']['posts']['Row'];

const userPostsAtom = atom<ReadMyBoard[]>([]);

const WhatIWrote = () => {
  const [userPosts, setUserPosts] = useAtom(userPostsAtom);
  const navigate = useNavigate();
  const user = useAtomValue(userStore.user);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const {
    data: postsAndTotalPages,
    isLoading,
    isFetching,
  } = useQuery<{ data: ReadMyBoard[]; totalPages: number }>(
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
      setPage((prev: any) => prev - 1);
      return;
    }
    if (selected === 'next' && postsAndTotalPages?.totalPages) {
      setPage((prev: any) => prev + 1);
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
      for (const postId of selectedPosts) {
        await deletePost(postId); // Call the deletePost function
      }

      // 선택 상태 초기화 및 게시물 다시 불러오기
      setSelectedPosts([]);
      fetchUserPosts(); // Corrected function name
    } catch (error) {
      console.error('Error deleting selected posts:', error);
    }
  };

  return (
    <Review.Container>
      <EditTitle>작성한 글</EditTitle>
      <Divider />

      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <input
              type="checkbox"
              checked={selectedPosts.includes(post.id?.toString() ?? '')}
              onChange={() => handleCheckboxChange(post.id?.toString() ?? '')}
            />
            <Post.Category>{post.category}</Post.Category>
            <h3 onClick={() => handlePostClick(post.id?.toString() ?? '')}>
              {' '}
              {post.title}
            </h3>
            <div>{new Date(post.created_at).toLocaleString()}</div>
            <Divider />
          </li>
        ))}
      </ul>
      <Button onClick={handleDeleteSelectedPosts}>선택한 게시물 삭제</Button>
      <Button onClick={handleSelectAll}>
        {selectedPosts.length === userPosts.length
          ? '전체 선택 해제'
          : '전체 선택'}
      </Button>
      <Pagination
        currentPage={page}
        totalPages={postsAndTotalPages?.totalPages || 1}
        onClick={onClickPage}
      />
    </Review.Container>
  );
};

export default WhatIWrote;
