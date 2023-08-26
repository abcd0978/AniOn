import React, { useEffect, useState } from 'react';
import { fetchAllAnimeMyLikes } from '../../api/likeApi';
import { getAnimePreview, getAnimeById } from '../../api/laftel';
import { atom, useAtom, useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { Database } from '../../types/supabase';
import { useNavigate } from 'react-router-dom';
type ReadMyLike = Database['public']['Tables']['anime_likes']['Row'];

const userLikesAtom = atom<ReadMyLike[]>([]);

const LikedAnime = () => {
  const [likedAnime, setLikedAnime] = useState<
    { animeId: string; preview: any; anime: any }[]
  >([]);

  const user = useAtomValue(userStore.user);
  const userLikes = useAtomValue(userLikesAtom);
  const navigate = useNavigate(); // Move useNavigate here

  useEffect(() => {
    const fetchLikedAnime = async () => {
      try {
        if (!user) {
          return;
        }

        const likes = await fetchAllAnimeMyLikes({
          user_id: user.id,
          id: '',
          anime_id: '',
        });

        const animeDataPromises = likes.map(async (like) => {
          const animeId = like.anime_id;
          const preview = await getAnimePreview(animeId);
          const anime = await getAnimeById(animeId);
          return { animeId, preview, anime };
        });

        const animeData = await Promise.all(animeDataPromises);
        setLikedAnime(animeData);
      } catch (error) {
        console.error('Error fetching liked anime:', error);
      }
    };

    fetchLikedAnime();
  }, [user]);

  return (
    <div className="liked-anime-container">
      <h2>Liked Anime</h2>
      <div className="anime-list">
        {likedAnime.map((anime) => (
          <div
            key={anime.animeId}
            onClick={() => navigate(`/recommend/${anime.animeId}`)}
            className="anime-card"
          >
            <img src={anime.preview} />
            <p>{anime.anime.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedAnime;
