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
type Post = Database['public']['Tables']['ani_comments']['Row'];

// // type Post = {
//   id: string;
//   title: string;
//   content: string | null;
// };

const userPostsAtom = atom<Database['public']['Tables']['users']['Row'] | null>(
  null,
);

const WhatIWrote = () => {
  const [userPosts, setUserPosts] = useAtom(userPostsAtom);

  const userId = '2fb03ff7-9993-458b-8740-317a04b36c65';

  useEffect(() => {
    const fetchUserPosts = async () => {
      console.log('Fetching user posts for user ID:', userId);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('fetshUserPosts에서 에러', error);
      } else {
        console.log('User posts fetched:', data);
        setUserPosts(data);
        console.log(
          'User posts fetched2(여기까지 콘솔에 잘 나온다.그런데 빈배열이 나옴):',
          data,
        );
      }
    };

    fetchUserPosts().then(() => {
      console.log('검사합니다.');
    });
  }, [setUserPosts]);

  return (
    <div>
      <h2>작성한 글 제목</h2>

      <ul>
        <h2>작성한 글 카테고리</h2>
        {userPosts.map((posts) => (
          <li key={posts.id}>
            <h3>{posts.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatIWrote;
