import supabase from '../supabaseClient';
import { InsertAnimeLikeG, ReadAnimeLikeG } from '../types/likes';

// const query = supabase.from('movies').select(`id, title`)
// const movies: DbResult<typeof query> = await query

export const fetchAnimeLikes = async (): Promise<ReadAnimeLikeG[]> => {
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

export const toggleAnimeLike = async (data: InsertAnimeLikeG) => {
  try {
    const { data: isLike, error: isLikeError } = await supabase
      .from('anime_likes')
      .select('*', { count: 'exact' })
      .eq('anime_id', data.anime_id)
      .eq('user_id', data.user_id);

    if (isLikeError) {
      console.log('Error fetching toggleLike:', isLikeError);
      return;
    }
    console.log(isLike);
    if (isLike.length > 0) {
      const { error: deleteError } = await supabase
        .from('anime_likes')
        .delete()
        .eq('anime_id', data.anime_id)
        .eq('user_id', data.user_id);

      if (deleteError) {
        console.log('Error deleting anime_likes:', deleteError);
        return false;
      }
      return true;
    } else {
      const { error: insertError } = await supabase
        .from('anime_likes')
        .insert([{ anime_id: data.anime_id, user_id: data.user_id }]);

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
