import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { atom, useAtom } from 'jotai';
import { Database } from '../../types/supabase';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Review = {
  id: string;
  title: string;
  content: string | null;
  category: string | null;
  comment: string | null;
};

const userReviewAtom = atom<Review[]>([]);

const LikedAnime = () => {
  const [userReview, setUserReview] = useAtom(userReviewAtom); //1. 빈배열로 초기화 되어 있음

  const id = '5be67933-6e49-44ba-9a01-e9e04d9d20d7';

  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        console.log('Fetching user posts for user ID:', id);
        const { data, error } = await supabase
          .from('ani_comments')
          .select('*')
          .eq('user_id', id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('fetchUserPosts에서 에러', error);
        } else {
          console.log('User posts fetched:', data); //이건 받아옴
          setUserReview(data); // 데이터를 받아온 후에 상태 업데이트
          console.log('데이터가 업데이트 된 후에 로그 출력.', data); // data로 변경
        }
      } catch (error) {
        console.error('fetchUserPosts 에러', error);
      }
    };

    fetchUserReview().then(() => {
      console.log('검사합니다.', userReview); // data로 변경
    });
  }, [setUserReview]);

  return (
    <div>
      <h2>작성한 리뷰들</h2>

      <ul>
        {userReview.map(
          (
            review, // review로 변경
          ) => (
            <li key={review.id}>
              <div>{review.comment}</div>
              {/* <h3>{review.title}</h3> */}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default LikedAnime;
