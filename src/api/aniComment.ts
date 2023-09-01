import supabase from '../supabaseClient';
import { Database } from '../types/supabase';
type ReadAniComment = Database['public']['Tables']['ani_comments']['Row'];
type InsertAniComment = Database['public']['Tables']['ani_comments']['Insert'];
type UpdateAniComment = Database['public']['Tables']['ani_comments']['Update'];

const fetchComments = async (ani_id: string, page: number): Promise<any> => {
  const itemsPerPage = 5;

  const startIndex = (page - 1) * itemsPerPage;

  const { data } = await supabase
    .from('ani_comments')
    .select('*,users(nickname,profile_img_url)')
    .eq('ani_id', ani_id)
    .range(startIndex, startIndex + itemsPerPage - 1)
    .order('created_at', { ascending: false });

  const { count } = await supabase
    .from('ani_comments')
    .select('count', { count: 'exact' })
    .eq('ani_id', ani_id);

  const totalPages = Math.ceil(count! / itemsPerPage);

  return { data, totalPages };
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

export { fetchComments, addComment, deleteComment, updateComment };
