import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { deleteComment } from '../../api/aniComment';
import { Review } from './Wrote.styles';
import { Button, Divider, EditTitle } from './EditProfile';
import goReview from '../../assets/next (1).png';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type ReadAniComment = Database['public']['Tables']['ani_comments']['Row'];
const itemsPerPage = 4;

const userReviewAtom = atom<ReadAniComment[]>([]);

const MyReviews = () => {
  const [userReview, setUserReview] = useAtom(userReviewAtom);
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();

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
  }, [setUserReview, user]);
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
  return (
    <Review.Container>
      <EditTitle>리뷰 이력</EditTitle>
      <Divider />
      <ul>
        {userReview.map((review) => (
          <li key={review.id}>
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
    </Review.Container>
  );
};

export default MyReviews;
