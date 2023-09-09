import supabase from '../supabaseClient';
import { Database } from '../types/supabase';
type InsertAniComment = Database['public']['Tables']['ani_comments']['Insert'];
type UpdateAniComment = Database['public']['Tables']['ani_comments']['Update'];

const fetchAllAnimeComments = async () => {
  try {
    const { data, error } = await supabase
      .from('ani_comments')
      .select('ani_id', { count: 'exact' });

    if (error) {
      // console.log('애니 리스트 댓글', error);
    }
    return data;
  } catch (error) {
    // console.log('애니 리스트 댓글', error);
  }
};

const fetchComments = async (ani_id: string, page: number): Promise<any> => {
  const itemsPerPage = 5;

  const startIndex = (page - 1) * itemsPerPage;
  try {
    const { data, count, error } = await supabase
      .from('ani_comments')
      .select(
        '*,users(nickname,profile_img_url,inventory(id,items(name,img_url,category)))',
        { count: 'exact' },
      )
      .eq('ani_id', ani_id)
      .eq('users.inventory.is_equipped', true)
      .range(startIndex, startIndex + itemsPerPage - 1)
      .order('created_at', { ascending: false });

    const totalPages = Math.ceil(count! / itemsPerPage);

    if (error) {
      // console.log('aniComment > fetchComments > ', error);
    }

    return { data, totalPages };
  } catch (error) {
    // console.log('aniComment > fetchComments > ', error);
  }
};

// 작성
const addComment = async (createComment: InsertAniComment) => {
  await supabase.from('ani_comments').insert(createComment);
};

// 삭제
const deleteComment = async (id: string) => {
  await supabase.from('ani_comments').delete().eq('id', id);
};

// 수정
const updateComment = async (editComment: UpdateAniComment) => {
  const { id, comment, user_id, ani_id } = editComment;
  const editData = {
    id,
    comment,
    user_id,
    ani_id,
  };
  await supabase.from('ani_comments').update(editData).eq('id', id);
};

export {
  fetchComments,
  addComment,
  deleteComment,
  updateComment,
  fetchAllAnimeComments,
};
