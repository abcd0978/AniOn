import supabase from '../supabaseClient';
import { Database } from '../types/supabase';

type InsertPostComment =
  Database['public']['Tables']['post_comments']['Insert'];
type UpdatePostComment =
  Database['public']['Tables']['post_comments']['Update'];

const fetchComments = async (post_id: string, page: number): Promise<any> => {
  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;

  const { data } = await supabase
    .from('post_comments')
    .select('*,users(nickname,profile_img_url)')
    .eq('post_id', post_id)
    .range(startIndex, startIndex + itemsPerPage - 1)
    .order('created_at', { ascending: false });
  // console.log('----', data);

  const { count } = await supabase
    .from('post_comments')
    .select('count', { count: 'exact' })
    .eq('post_id', post_id);

  const totalPages = Math.ceil(count! / itemsPerPage);

  return { data, totalPages };
};

// 작성
const addComment = async (createComment: InsertPostComment) => {
  await supabase.from('post_comments').insert(createComment);
};

// 삭제
const deleteComment = async (id: string) => {
  try {
    await supabase.from('post_comments').delete().eq('id', id);
  } catch (error) {
    // 삭제 실패 시 오류 처리 로직 추가
    console.error('Error deleting comment:', error);
    throw error; // 오류 재전파
  }
};

// 수정
const updateComment = async (editComment: UpdatePostComment) => {
  const { id, comment, post_id, user_id } = editComment;

  // Update 객체 생성
  const updateData = {
    id,
    comment,
    post_id,
    user_id,
  };

  await supabase.from('post_comments').update(updateData).eq('id', id);
};

export { fetchComments, addComment, deleteComment, updateComment };
