import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { deleteComment } from '../../api/aniComment';
import { Review } from './Wrote.styles';
import { Button, Divider, EditTitle } from './EditProfile';
import goReview from '../../assets/next (1).png';
import Pagination from '../Pagenation';
import { AnimeG } from '../../types/anime';
import { useQuery } from '@tanstack/react-query';
import { getAnimeById } from '../../api/laftel';
import { useParams } from 'react-router-dom';
import AnimeDetail from '../../pages/AnimeDetail';
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type ReadAniComment = Database['public']['Tables']['ani_comments']['Row'];

const userReviewAtom = atom<ReadAniComment[]>([]);
interface Props {
  anime: AnimeG;
}

const MyReviews = () => {
  const { ani_id } = useParams() as { ani_id: string };
  const [userReview, setUserReview] = useAtom(userReviewAtom);
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isLoading: isDetailLoading,
    isError: isDetailError,
    data: animeDetail,
  } = useQuery({
    queryKey: ['animeDetail'],
    queryFn: () => {
      return getAnimeById(ani_id);
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        if (!user) {
          return;
        }

        console.log('사용자 아이디에 따른 리뷰', user.id);
        const { data, error } = await supabase
          .from('ani_comments')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('fetchUserPosts에서 에러', error);
        } else {
          console.log('User reviews fetched:', data);
          setUserReview(data);
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
      await deleteComment(reviewId);
      const updatedUserReview = userReview.filter(
        (review) => review.id !== reviewId,
      );
      setUserReview(updatedUserReview);
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
    <Review.Container>
      <EditTitle>리뷰 이력</EditTitle>
      <Divider />
      <ul>
        {userReview.slice(startIndex, endIndex).map((review) => (
          <li key={review.id}>
            {/* <div>{animeDetail.name}</div> */}
            <Review.ReviewComments>{review.comment}</Review.ReviewComments>
            <Review.ButtonContainer>
              <Review.Date>
                {new Date(review.created_at).toLocaleString()}
              </Review.Date>
              <Review.ButtonArray>
                <Review.Button onClick={() => handleRemoveReview(review.id)}>
                  삭제
                </Review.Button>
                <Review.Button onClick={() => handleReviewClick(review.ani_id)}>
                  보러가기
                  <Review.ButtonIcon src={goReview} />
                </Review.Button>
              </Review.ButtonArray>
            </Review.ButtonContainer>
            <Divider />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onClick={handlePageChange}
      />
    </Review.Container>
  );
};

export default MyReviews;
