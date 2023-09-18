import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import * as myPageStore from '../../store/myPageStore';
import { useNavigate } from 'react-router-dom';
import { deleteComment } from '../../api/aniComment';
import { R } from './Styled.MyPage/Wrote.styles';
import { Divider } from './Styled.MyPage/MyPage.styles';
import Pagination from '../Pagenation';
import { getAnimeById } from '../../api/laftel';
import ReviewSkeleton from './Skeleton.MyPage/MyReviewSkeleton';
import { styled } from 'styled-components';
import { useConfirm } from '../../hooks/useConfirm';
import { InfoMenu } from './Styled.MyPage/MyPage.styles';
import { D } from './Styled.MyPage/Deco.styles';
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type ReadAniComment = Database['public']['Tables']['ani_comments']['Row'];

const userReviewAtom = atom<ReadAniComment[]>([]);
type AnimeG = JSX.Element;

const MyReviews = () => {
  const [userReview, setUserReview] = useAtom(userReviewAtom);
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [animeTitles, setAnimeTitles] = useState<Record<string, AnimeG>>({});
  const [isLoadingTitles, setIsLoadingTitles] = useState(true);
  const setSelectedComponent = useSetAtom(myPageStore.selectedComponent);
  const { openConfirm } = useConfirm();
  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        if (!user) {
          return;
        }

        const { data: reviewData, error: reviewError } = await supabase
          .from('ani_comments')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (reviewError) {
          console.error('fetchUserPosts에서 에러', reviewError);
        } else {
          // console.log('User reviews fetched:', reviewData);
          setUserReview(reviewData);

          const animeIds = reviewData.map((review) => review.ani_id);
          const animeDetails: Record<string, JSX.Element> = {};
          for (const animeId of animeIds) {
            try {
              const animeDetail = await getAnimeById(animeId);
              animeDetails[animeId] = <span>{animeDetail.name}</span>;
            } catch (animeError) {
              console.error('getAnimeById 에러', animeError);
            }
          }

          setAnimeTitles(animeDetails);
          setIsLoadingTitles(false);
        }
      } catch (error) {
        console.error('fetchUserPosts 에러', error);
      }
    };

    fetchUserReview();
  }, [setUserReview, user, currentPage]);

  const handleReviewClick = async (animeId: string) => {
    navigate(`/recommend/${animeId}`);
  };

  const handleRemoveReview = async (reviewId: string) => {
    try {
      const deleteConfirmData = {
        title: '리뷰 삭제',
        content: '정말 삭제하실건가요??',
        callback: async () => {
          await deleteComment(reviewId);
          const updatedUserReview = userReview.filter(
            (review) => review.id !== reviewId,
          );
          setUserReview(updatedUserReview);
        },
      };

      openConfirm(deleteConfirmData);
    } catch (error) {
      console.error('리뷰 삭제 중 에러', error);
    }
  };

  const reviewsPerPage = 5;

  const totalPages = Math.ceil(userReview.length / reviewsPerPage);

  const handlePageChange = (page: number | 'prev' | 'next') => {
    if (page === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (page === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (typeof page === 'number' && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;

  return Array.isArray(userReview) && userReview.length > 0 ? (
    <R.Container>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <InfoMenu.BackButton onClick={() => setSelectedComponent(null)}>
          ←
        </InfoMenu.BackButton>
        <R.Title>리뷰관리</R.Title>
      </div>
      <Divider />
      <R.Outer>
        {isLoadingTitles ? (
          <ReviewSkeleton count={reviewsPerPage} />
        ) : (
          userReview.slice(startIndex, endIndex).map((review) => (
            <li key={review.id}>
              <R.Top>
                <R.Content>
                  <R.TitleAndDate>
                    <R.ReviewTitle>{animeTitles[review.ani_id]}</R.ReviewTitle>
                    <R.Date>
                      {new Date(review.created_at).toLocaleDateString()}
                    </R.Date>
                  </R.TitleAndDate>
                  <R.Comments>{review.comment}</R.Comments>
                </R.Content>
              </R.Top>

              <R.ButtonArray>
                <R.GoButton onClick={() => handleReviewClick(review.ani_id)}>
                  보러가기
                  <R.ButtonIcon src="/images/nextblack.png" alt="보러가기" />
                </R.GoButton>
                <R.Button onClick={() => handleRemoveReview(review.id)}>
                  삭제
                </R.Button>
              </R.ButtonArray>
              <Divider />
            </li>
          ))
        )}
        <R.Page>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={handlePageChange}
            isPreviousDisabled={currentPage === 1}
            isNextDisabled={currentPage >= totalPages}
          />
        </R.Page>
      </R.Outer>
    </R.Container>
  ) : (
    <R.NoContainer>
      <div style={{ display: 'flex', width: '100%' }}>
        <InfoMenu.BackButton onClick={() => setSelectedComponent(null)}>
          ←
        </InfoMenu.BackButton>
        <R.Title>리뷰관리</R.Title>
      </div>
      <R.NoMessageContainer>
        <R.NoMessage>작성한 리뷰가 없어요 !</R.NoMessage>
        <R.GoWriteReview
          onClick={() => {
            navigate('/recommend');
          }}
        >
          리뷰 쓰러 가기
        </R.GoWriteReview>
        <img src="/images/goShop.png" alt="리뷰쓰기" />
      </R.NoMessageContainer>
    </R.NoContainer>
  );
};

export default MyReviews;
