import React, { useEffect, useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { deletePost } from '../../api/boardapi';
import { P } from './Styled.MyPage/Wrote.styles';
import { Divider } from './Styled.MyPage/MyPage.styles';
import Pagination from '../Pagenation';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/boardapi';
import { StyledPostCategory } from './Styled.MyPage/Wrote.styles';
import useViewport from '../../hooks/useViewPort';
import { useConfirm } from '../../hooks/useConfirm';
import CheckBox from '../../assets/check_box.png';
import Delete from '../../assets/delete.png';
import ThumbnailIcon from '../../assets/image.png';
import { toast } from 'react-toastify';
import MyPostsSkeleton from './Skeleton.MyPage/MyPostsSkeleton';
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
  const [currentPage, setCurrentPage] = useState(1);

  const { data: postsAndTotalPages, isLoading } = useQuery(
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
      if (selectedPosts.length === 0) {
        toast.info('선택된 게시글이 없습니다.');
        return;
      }
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
  return isLoading ? (
    <MyPostsSkeleton />
  ) : Array.isArray(userPosts) && userPosts.length > 0 ? (
    <P.Container>
      <P.Title>작성한 글</P.Title>
      <P.PostsContainer>
        {userPosts.slice(startIndex, endIndex).map((post) => {
          // const likesForPost = userPostLike.filter(
          //   (like) => like.post_id === post.id,
          // ).length;

          return (
            <div key={post.id}>
              <P.Box>
                <P.Input
                  type="checkbox"
                  checked={selectedPosts.includes(post.id?.toString() ?? '')}
                  onChange={() =>
                    handleCheckboxChange(post.id?.toString() ?? '')
                  }
                />
                <StyledPostCategory category={post.category}>
                  {post.category}
                </StyledPostCategory>
                <P.Content>
                  <P.PostTitle
                    onClick={() => handlePostClick(post.id?.toString() ?? '')}
                  >
                    {post.title}
                    {post.thumbnail !== null && (
                      <img src={ThumbnailIcon} alt="thumbnailIcon" />
                    )}
                    <P.Date>
                      {new Date(post.created_at).toLocaleString()}{' '}
                    </P.Date>
                  </P.PostTitle>

                  {/*<div>받은 추천 수: {likesForPost}</div>*/}
                </P.Content>
              </P.Box>
              <Divider />
            </div>
          );
        })}
      </P.PostsContainer>
      <P.PickButtonBox>
        <P.PickButtonAll onClick={handleSelectAll}>
          <img src={CheckBox} alt="체크박스" />
          {selectedPosts.length === userPosts.length
            ? '전체 선택 해제'
            : '전체 선택'}
        </P.PickButtonAll>
        <P.PickButton onClick={handleDeleteSelectedPosts}>
          <img src={Delete} alt="삭제" />
          선택삭제
        </P.PickButton>
      </P.PickButtonBox>
      <P.WriteP>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onClick={handlePageChange}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage >= totalPages}
        />
      </P.WriteP>
    </P.Container>
  ) : (
    <P.NoContainer>
      <P.NoMessage>작성한 글이 없어요!</P.NoMessage>
      <P.NoButton onClick={() => navigate('/board')}>
        글 작성하러 가기
      </P.NoButton>
    </P.NoContainer>
  );
};

export default WhatIWrote;
