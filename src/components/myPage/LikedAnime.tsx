import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAnimeList } from '../../api/laftel';
import { fetchAnimeLikes, toggleAnimeLike } from '../../api/likeApi';
import { createClient } from '@supabase/supabase-js';
import { atom, useAtom, useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import type { AnimeG } from '../../types/anime';
import { Database } from '../../types/supabase';
import { ReadAnimeLikeG } from '../../types/likes';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const likedAnimeAtom = atom<AnimeG[]>([]);

const LikedAnime = () => {
  const [likedAnime, setLikedAnime] = useAtom(likedAnimeAtom);
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState<AnimeG[]>([]);
  const likesQueryOptions = {
    queryKey: ['animeLikes'],
    queryFn: () => fetchAnimeLikes(),
    refetchOnWindowFocus: false,
  };

  const { data: likesData } = useQuery(likesQueryOptions);

  useEffect(() => {
    const fetchLikedAnime = async () => {
      try {
        if (!user) {
          return;
        }
        console.log('사용자아이디:', user.id);
        const { data, error } = await supabase
          .from('anime_likes')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('fetchLikedAnime에서 에러', error);
        } else {
          console.log('Liked anime fetched:', data);
          setLikedAnime(data);
          console.log('setLikedAnime:', data);
        }
      } catch (error) {
        console.error('fetchLikedAnime 에러', error);
      }
    };

    fetchLikedAnime();
  }, [user, setLikedAnime]);
  console.log('likedAnime:', animeList);

  const handleAnimeClick = (animeId: string) => {
    navigate(`/recommend/${animeId}`);
  };
  return (
    <div>
      <h2>Liked Anime</h2>
      <ul>
        {likedAnime.map((anime: AnimeG) => (
          <li
            key={anime.id}
            onClick={() => handleAnimeClick(anime.id.toString())}
          >
            {anime.images && anime.images.length !== 0 && (
              <img src={anime.images[0].img_url} alt={`${anime.name} 이미지`} />
            )}
            <h3>{anime.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedAnime;
