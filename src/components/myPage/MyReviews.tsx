import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { deleteComment } from '../../api/aniComment';
import { Review } from './Wrote.styles';
import { Button, Container, Divider, EditTitle } from './EditProfile';
import goReview from '../../assets/next (1).png';
import Pagination from '../Pagenation';
import { useQuery } from '@tanstack/react-query';
import { getAnimeById } from '../../api/laftel';
import { useParams } from 'react-router-dom';
import ReviewSkeleton from './MyReviewSkeleton';
import { Page } from './MyInvenAward';
import { styled } from 'styled-components';

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
          console.log('User reviews fetched:', reviewData);
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
      const shouldDelete = window.confirm('삭제하시겠습니까?');

      if (shouldDelete) {
        await deleteComment(reviewId);
        const updatedUserReview = userReview.filter(
          (review) => review.id !== reviewId,
        );
        setUserReview(updatedUserReview);
      }
    } catch (error) {
      console.error('리뷰 삭제 중 에러', error);
    }
  };

  const reviewsPerPage = 4;

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

  return (
    <Container>
      <EditTitle>리뷰 이력</EditTitle>
      <Divider />
      <Review.Outer>
        {userReview.length === 0 ? (
          <ReviewSkeleton count={reviewsPerPage} />
        ) : (
          userReview.slice(startIndex, endIndex).map((review) => (
            <li key={review.id}>
              <Review.Top>
                <Review.Title>{animeTitles[review.ani_id]}</Review.Title>
                <Review.Date>
                  {new Date(review.created_at).toLocaleString()}
                </Review.Date>
              </Review.Top>

              <Review.ReviewComments>{review.comment}</Review.ReviewComments>

              <Review.ButtonArray>
                <Review.GoButton
                  onClick={() => handleReviewClick(review.ani_id)}
                >
                  보러가기
                  <Review.ButtonIcon src={goReview} />
                </Review.GoButton>
                <Review.Button onClick={() => handleRemoveReview(review.id)}>
                  삭제
                </Review.Button>
              </Review.ButtonArray>

              <Divider />
            </li>
          ))
        )}
        <ReviewPage>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={handlePageChange}
            isPreviousDisabled={currentPage === 1}
            isNextDisabled={currentPage >= totalPages}
          />
        </ReviewPage>
      </Review.Outer>
    </Container>
  );
};

export default MyReviews;
export const ReviewPage = styled.div`
  display: flex;
  justify-content: center;
`;
