import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { deleteComment } from '../../api/aniComment';
import { Review } from './Wrote.styles';
import { Button, Divider, EditTitle } from './EditProfile';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type ReadAniComment = Database['public']['Tables']['ani_comments']['Row'];

const userReviewAtom = atom<ReadAniComment[]>([]);

const MyReviews = () => {
  const [userReview, setUserReview] = useAtom(userReviewAtom);
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        if (!user) {
          return; // 사용자가 로그인하지 않은 경우 아무것도 하지 않음
        }

        console.log('사용자 아이디에 따른 리뷰', user.id); // user.id를 사용하여 사용자 ID를 가져옴
        const { data, error } = await supabase
          .from('ani_comments')
          .select('*')
          .eq('user_id', user.id) // user.id를 사용하여 사용자 ID에 해당하는 리뷰를 가져옴
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
      await deleteComment(reviewId); // 주어진 함수를 사용하여 리뷰 삭제
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
            <div>{review.comment}</div>
            <Button onClick={() => handleReviewClick(review.ani_id)}>
              이동
            </Button>
            <Button onClick={() => handleRemoveReview(review.id)}>제거</Button>
            <Divider />
          </li>
        ))}
      </ul>
    </Review.Container>
  );
};

export default MyReviews;
