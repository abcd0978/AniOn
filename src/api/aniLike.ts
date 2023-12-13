import { toast } from 'react-toastify';
import supabase from '../supabaseClient';
import { InsertAnimeLikeG, ReadAnimeLikeG } from '../types/likes';
// import type { Database } from '../types/supabase';
// import { laftelParamsM } from '../types/anime';
// type userGenresRow = Database['public']['Tables']['user_genres']['Row'];

export const fetchAllAnimeLikes = async (): Promise<ReadAnimeLikeG[]> => {
  try {
    const { data, error } = await supabase.from('anime_likes').select('*');
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
export const fetchAllAnimeMyLikes = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('anime_likes')
      .select('*')
      .eq('user_id', userId);
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
export const fetchAnimeLikes = async (animeId: string) => {
  try {
    const { data, error } = await supabase
      .from('anime_likes')
      .select('*')
      .eq('anime_id', animeId);
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

export const getPreferedGenres = async (
  userId: string,
): Promise<any | null> => {
  const { data, error } = await supabase
    .from('user_genres')
    .select('*')
    .eq('user_id', userId)
    .single();

  let result: any[] = [];
  delete data?.id;
  delete data?.user_id;
  const sortedObj = Object.entries(data!).sort((a: any[], b: any[]) => {
    return b[1] - a[1];
  });
  for (let i = 0; i < sortedObj.length; i++) {
    result.push(sortedObj[i][0]);
  }

  if (error) {
    console.log(error);
    return null;
  }
  return result as any[];
};

// 좋아요 클릭
export const toggleAnimeLike = async (params: {
  insertLike: InsertAnimeLikeG;
  tags?: string[];
  genres?: string[];
}) => {
  try {
    const data = await fetchAnimeMyLiked(params.insertLike);

    // 이미 좋아요 일 때
    if (data.length > 0) {
      const { error: deleteError } = await supabase
        .from('anime_likes')
        .delete()
        .eq('anime_id', params.insertLike.anime_id)
        .eq('user_id', params.insertLike.user_id);

      if (deleteError) {
        console.log('Error deleting anime_likes:', deleteError);
        return false;
      }

      if (params.genres) {
        interface genreType {
          [key: string]: number;
        }
        let functionParam: genreType = {
          gl백합p: 0,
          blp: 0,
          sfp: 0,
          개그p: 0,
          공포p: 0,
          드라마p: 0,
          로맨스p: 0,
          모험p: 0,
          무협p: 0,
          미스터리p: 0,
          범죄p: 0,
          성인p: 0,
          스릴러p: 0,
          스포츠p: 0,
          시대물p: 0,
          아동p: 0,
          아이돌p: 0,
          액션p: 0,
          음식p: 0,
          음악p: 0,
          이세계p: 0,
          일상p: 0,
          재난p: 0,
          추리p: 0,
          치유p: 0,
          특촬p: 0,
          판타지p: 0,
          하렘p: 0,
        };
        for (let i = 0; i < params.genres.length; i++) {
          const paramName = params.genres[i] + 'p';
          functionParam[paramName]++; // set 장르 = 장르-장르p 로 해버려서 양수를주면 마이너스가됨
        }
        const finalFunctionParam = {
          ...functionParam,
          userid: params.insertLike.user_id,
        };
        // console.log(finalFunctionParam);
        let { error } = await supabase.rpc(
          'updateusergenres',
          finalFunctionParam,
        );

        if (error) console.error(error);
      }

      toast.success(`좋아요 취소🤔`, {
        autoClose: 800,
      });

      return true;
    } else {
      // 좋아요 상태가 아닐 때
      const { error: insertError } = await supabase.from('anime_likes').insert([
        {
          anime_id: params.insertLike.anime_id,
          user_id: params.insertLike.user_id,
        },
      ]);

      if (insertError) {
        console.log('Error inserting anime_likes:', insertError);
        return false;
      }

      toast.success(`좋아요💜`, {
        autoClose: 800,
      });

      if (params.genres) {
        interface genreType {
          [key: string]: number;
        }
        let functionParam: genreType = {
          gl백합p: 0,
          blp: 0,
          sfp: 0,
          개그p: 0,
          공포p: 0,
          드라마p: 0,
          로맨스p: 0,
          모험p: 0,
          무협p: 0,
          미스터리p: 0,
          범죄p: 0,
          성인p: 0,
          스릴러p: 0,
          스포츠p: 0,
          시대물p: 0,
          아동p: 0,
          아이돌p: 0,
          액션p: 0,
          음식p: 0,
          음악p: 0,
          이세계p: 0,
          일상p: 0,
          재난p: 0,
          추리p: 0,
          치유p: 0,
          특촬p: 0,
          판타지p: 0,
          하렘p: 0,
        };
        for (let i = 0; i < params.genres.length; i++) {
          const paramName = params.genres[i] + 'p';
          functionParam[paramName]--;
        }
        const finalFunctionParam = {
          ...functionParam,
          userid: params.insertLike.user_id,
        };
        // console.log(finalFunctionParam);
        let { error } = await supabase.rpc(
          'updateusergenres',
          finalFunctionParam,
        );

        if (error) console.error(error);
      }

      return true;
    }
  } catch (error) {
    console.log('Error toggle_anime_likes', error);
  }
};
