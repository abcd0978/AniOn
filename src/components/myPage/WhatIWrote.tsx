import React, { useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import * as userStore from '../../store/userStore';
import * as myPageStore from '../../store/myPageStore';
import { useNavigate } from 'react-router-dom';
import { P, R } from './Styled.MyPage/Wrote.styles';
import { Divider } from './Styled.MyPage/MyPage.styles';
import Pagination from '../Pagenation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserPosts, deletePost } from '../../api/boardapi';
import { StyledPostCategory } from './Styled.MyPage/Wrote.styles';
import { useConfirm } from '../../hooks/useConfirm';
import { toast } from 'react-toastify';
import MyPostsSkeleton from './Skeleton.MyPage/MyPostsSkeleton';
import { UserPostType, ReadPosts } from '../../types/post';
import { InfoMenu } from './Styled.MyPage/MyPage.styles';
import { D } from './Styled.MyPage/Deco.styles';
const WhatIWrote = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openConfirm } = useConfirm();

  const [page, setPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const user = useAtomValue(userStore.user);
  const setSelectedComponent = useSetAtom(myPageStore.selectedComponent);

  const userPostsQueryOption = {
    queryKey: ['userPosts', page],
    queryFn: () => fetchUserPosts(user!.id, page),
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    cacheTime: 60 * 6000,
    enabled: !!user,
  };

  const { data: userPosts, isLoading } =
    useQuery<UserPostType>(userPostsQueryOption);

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
    if (!userPosts) {
      return;
    }

    if (selectedPosts.length === userPosts.data?.length) {
      setSelectedPosts([]);
    } else {
      const allPostIds = userPosts.data?.map(
        (post) => post.id?.toString() ?? '',
      );
      setSelectedPosts(allPostIds!);
    }
  };

  // Post 삭제
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['userPosts']);
    },
  });

  const handleDeleteSelectedPosts = async () => {
    if (selectedPosts.length === 0) {
      toast.info('선택된 게시글이 없습니다.');
      return;
    }
    const deleteConfirmData = {
      title: '게시글 삭제',
      content: '정말 삭제하실건가요??',
      callback: () => {
        for (const postId of selectedPosts) {
          deleteMutation.mutate(postId);
        }
        toast.success('삭제되었습니다!', {
          autoClose: 800,
        });
      },
    };

    openConfirm(deleteConfirmData);
  };

  const handlePageChange = (selected: number | string) => {
    if (page === selected) return;
    if (typeof selected === 'number') {
      setPage(selected);
      return;
    }
    if (selected === 'prev' && page > 1) {
      setPage((prev: number) => prev - 1);
      return;
    }
    if (selected === 'next' && userPosts?.totalPages) {
      setPage((prev: number) => prev + 1);
      return;
    }
  };

  return isLoading ? (
    <MyPostsSkeleton />
  ) : userPosts && userPosts.data && userPosts.data.length > 0 ? (
    <P.Container>
      <div style={{ display: 'flex', width: '100%' }}>
        <InfoMenu.BackButton onClick={() => setSelectedComponent(null)}>
          ←
        </InfoMenu.BackButton>
        <D.Title>작성한 글</D.Title>
      </div>
      <P.PostsContainer>
        {userPosts.data.map((post: ReadPosts) => {
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
                    <P.TitleAndThumbnail>
                      <P.TitleText>{post.title}</P.TitleText>
                      {post.thumbnail !== null && (
                        <img src="/images/image.png" alt="thumbnailIcon" />
                      )}
                    </P.TitleAndThumbnail>
                    <P.Date>
                      {new Date(post.created_at).toLocaleDateString()}
                    </P.Date>
                  </P.PostTitle>
                </P.Content>
              </P.Box>
              <Divider />
            </div>
          );
        })}
      </P.PostsContainer>
      {userPosts && userPosts.data && userPosts.data.length > 0 && (
        <>
          <P.PickButtonBox>
            <P.PickButtonAll onClick={handleSelectAll}>
              <img src="/images/checkbox.png" alt="체크박스" />
              {selectedPosts.length === userPosts?.data?.length
                ? '전체 선택 해제'
                : '전체 선택'}
            </P.PickButtonAll>
            <P.PickButton onClick={handleDeleteSelectedPosts}>
              <img src="images/delete.png" alt="삭제" />
              선택삭제
            </P.PickButton>
          </P.PickButtonBox>
          <P.WriteP>
            <Pagination
              currentPage={page}
              totalPages={userPosts!.totalPages || 1}
              onClick={handlePageChange}
              isPreviousDisabled={page === 1}
              isNextDisabled={page >= (userPosts?.totalPages || 1)}
            />
          </P.WriteP>
        </>
      )}
    </P.Container>
  ) : (
    <P.NoContainer>
      <div style={{ display: 'flex', width: '100%' }}>
        <InfoMenu.BackButton onClick={() => setSelectedComponent(null)}>
          ←
        </InfoMenu.BackButton>
        <D.Title>작성한 글</D.Title>
      </div>
      <P.NoMessageContainer>
        <P.NoMessage>작성한 글이 없어요!</P.NoMessage>
        <P.NoButton onClick={() => navigate('/board')}>
          글 작성하러 가기
        </P.NoButton>
      </P.NoMessageContainer>
    </P.NoContainer>
  );
};

export default WhatIWrote;
