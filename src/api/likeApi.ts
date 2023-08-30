import supabase from '../supabaseClient';
import { InsertAnimeLikeG, ReadAnimeLikeG } from '../types/likes';
import { getAnimeById } from './laftel';

// const query = supabase.from('movies').select(`id, title`)
// const movies: DbResult<typeof query> = await query

export const fetchAllAnimeLikes = async (): Promise<ReadAnimeLikeG[]> => {
  try {
    const { data, error } = await supabase.from('anime_likes').select(' * ');
    if (error) {
      console.log('error fetching anime_likes > ', error);
      return [];
    }
    return data;
  } catch (error) {
    console.log('error fetching anime_likes > ', error);
    return [];
  }
};

// 내가 좋아요한 데이터들 가져오기
export const fetchAllAnimeMyLikes = async (params: ReadAnimeLikeG) => {
  try {
    const { data, error } = await supabase
      .from('anime_likes')
      .select('*')
      .eq('user_id', params.user_id);
    if (error) {
      console.log('error fetching AnimeMyLikes > ', error);
      return [];
    }
    return data;
  } catch (error) {
    console.log('error fetching AnimeMyLikes > ', error);
    return [];
  }
};

// 애니 한개 좋아요 가져오기
export const fetchAnimeLikes = async (anime_id: string) => {
  try {
    const { data, error } = await supabase
      .from('anime_likes')
      .select('*')
      .eq('anime_id', anime_id);
    if (error) {
      console.log('error fetching AnimeMyLikes > ', error);
      return [];
    }
    return data;
  } catch (error) {
    console.log('error fetching AnimeMyLikes > ', error);
    return [];
  }
};

// 내가 좋아요한 데이터 하나! 가져오기
export const fetchAnimeMyLiked = async (params: Omit<ReadAnimeLikeG, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('anime_likes')
      .select('*')
      .eq('anime_id', params.anime_id)
      .eq('user_id', params.user_id);
    if (error) {
      console.log('error fetching AnimeMyLikes > ', error);
      return [];
    }
    return data;
  } catch (error) {
    console.log('error fetching AnimeMyLikes > ', error);
    return [];
  }
};

// 좋아요 클릭
export const toggleAnimeLike = async (params: InsertAnimeLikeG) => {
  if (!params.isDetailPage) {
    const ani = await getAnimeById(params.anime_id);
    console.log('애니 추천 페이지 좋아요 fetch', ani);
  }

  try {
    const data = await fetchAnimeMyLiked(params);

    if (data.length > 0) {
      const { error: deleteError } = await supabase
        .from('anime_likes')
        .delete()
        .eq('anime_id', params.anime_id)
        .eq('user_id', params.user_id);

      if (deleteError) {
        console.log('Error deleting anime_likes:', deleteError);
        return false;
      }
      return true;
    } else {
      const { error: insertError } = await supabase
        .from('anime_likes')
        .insert([{ anime_id: params.anime_id, user_id: params.user_id }]);

      if (insertError) {
        console.log('Error inserting anime_likes:', insertError);
        return false;
      }
      return true;
    }
  } catch (error) {
    console.log('Error toggle_anime_likes', error);
  }
};
