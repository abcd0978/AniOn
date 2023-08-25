import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
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
  const handleReviewClick = (animeId: string) => {
    navigate(`/recommend/${animeId}`);
  };

  return (
    <div>
      <h2>작성한 리뷰들</h2>

      <ul>
        {userReview.map((review) => (
          <li key={review.id} onClick={() => handleReviewClick(review.ani_id)}>
            <div>{review.comment}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviews;
