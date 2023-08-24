import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { atom, useAtom } from 'jotai';
import type { AnimeG } from '../../types/anime';
import LikeSvg from '../anime-recommend/LikeSvg';
import { useParams } from 'react-router-dom';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type clickedHeartAnime = {
  id: string;
  title: string;
  content: string | null;
  category: string | null;
  comment: string | null;
  image: string | null;
};

const clickedHeartAnimeAtom = atom<clickedHeartAnime[]>([]);

const LikedAnime = () => {
  const [clickedHeartAnime, setClickedHeartAnime] = useAtom(
    clickedHeartAnimeAtom,
  );

  const { ani_id } = useParams() as { ani_id: string };
  const user_id = '5be67933-6e49-44ba-9a01-e9e04d9d20d7';

  useEffect(() => {
    const fetchClickedHeartAnime = async () => {
      try {
        console.log(
          'Fetching liked anime for user ID:',
          user_id,
          'anime ID:',
          ani_id,
        );
        const { data, error } = await supabase
          .from('anime_likes')
          .select('*')
          .eq('user_id', user_id)
          .eq('anime_id', ani_id);

        if (error) {
          console.error('fetchClickedHeartAnime에서 에러', error);
        } else {
          console.log('Liked anime fetched:', data);
          setClickedHeartAnime(data);
        }
      } catch (error) {
        console.error('fetchClickedHeartAnime 에러', error);
      }
    };

    fetchClickedHeartAnime();
  }, [user_id, ani_id, setClickedHeartAnime]);

  return (
    <div>
      <h2>Liked Anime</h2>
      <ul>
        {clickedHeartAnime.map((anime) => (
          <li key={anime.id}>
            <h3>{anime.title}</h3>
            {anime.image && (
              <img src={anime.image} alt={`${anime.title} 이미지`} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedAnime;
