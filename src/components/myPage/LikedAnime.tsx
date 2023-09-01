import { useAtomValue } from 'jotai';
import { fetchAllAnimeMyLikes } from '../../api/likeApi';
import { getAnimeById } from '../../api/laftel';
import * as userStore from '../../store/userStore';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { AnimeG } from '../../types/anime';

const LikedAnime = () => {
  const [animeTitles, setAnimeTitles] = useState<Record<string, AnimeG>>({});
  const user = useAtomValue(userStore.user);

  const {
    isLoading,
    isError,
    data: liked,
  } = useQuery(
    ['likedAnime', user?.id],
    async () => {
      if (!user?.id) return [];
      const result = await fetchAllAnimeMyLikes(user.id);
      return result;
    },
    { enabled: !!user?.id },
  );

  useEffect(() => {
    if (liked && liked.length > 0) {
      const fetchAnimeDetails = async () => {
        const animePromises = liked.map((like) => getAnimeById(like.anime_id));

        try {
          const animeDataList = await Promise.all(animePromises);

          const newAnimeTitles: Record<string, AnimeG> = {};
          for (let i = 0; i < liked.length; i++) {
            newAnimeTitles[liked[i].anime_id] = animeDataList[i];
          }

          setAnimeTitles(newAnimeTitles);
        } catch (error) {
          console.error('Error fetching anime details:', error);
        }
      };

      fetchAnimeDetails();
    }
  }, [liked]);

  if (isLoading) {
    return <div>좋아요한 애니를 불러오는 중</div>;
  }

  if (isError) {
    return <div>좋아요 목록을 불러오지 못했어요</div>;
  }

  const likedList = Array.isArray(liked) ? (
    <ul>
      {liked.map((like, index) => (
        <li key={index}>
          <img src={animeTitles[like.anime_id]?.img} />
          {animeTitles[like.anime_id]?.name}
        </li>
      ))}
    </ul>
  ) : null;

  return <div>{likedList}</div>;
};

export default LikedAnime;
