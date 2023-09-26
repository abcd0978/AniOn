import supabase from '../supabaseClient';

import type {
  CommentType,
  InsertPostComment,
  ReplyCommentType,
  UpdatePostComment,
} from '../types/comment';

const fetchComments = async (post_id: string, page: number) => {
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  try {
    const { data, count, error } = await supabase
      .from('post_comments')
      .select(
        '*,users!inner(nickname,profile_img_url,inventory(id,items(name,img_url,category)))',
        {
          count: 'exact',
        },
      )
      .eq('post_id', post_id)
      .eq('users.inventory.is_equipped', true)
      .order('created_at', { ascending: false })
      .range(startIndex, startIndex + itemsPerPage - 1)
      .returns<CommentType[]>();
    const totalPages: number = Math.ceil(count! / itemsPerPage);

    if (error) {
      console.log('commentAPI > fetchComments > error', error);
    }

    return { data, totalPages };
  } catch (error) {
    console.log('commentAPI > fetchComments > error', error);
  }
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
    console.error('Error deleting comment:', error);
    throw error;
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

// 대댓글 조회
const fetchReplyComments = async (postId: string) => {
  try {
    const { data, error } = await supabase
      .from('reply_comments')
      .select(
        '*,users!inner(nickname,profile_img_url,inventory(id,items(name,img_url,category)))',
      )
      .eq('post_id', postId)
      .eq('users.inventory.is_equipped', true)
      .order('created_at', { ascending: true })
      .returns<ReplyCommentType[]>();

    if (error) {
      console.log('commentAPI > fetchReplyComments > error', error);
    }

    return data;
  } catch (error) {
    console.log('commentAPI > fetchReplyComments > error', error);
  }
};

// 작성
const addReplyComment = async (createComment: any) => {
  await supabase.from('reply_comments').insert(createComment);
};

// 삭제
const deleteReplyComment = async (id: string) => {
  try {
    await supabase.from('reply_comments').delete().eq('id', id);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

// 수정
const updateReplyComment = async (parmas: { id: string; comment: string }) => {
  // Update 객체 생성
  const updateData = {
    comment: parmas.comment,
  };

  await supabase.from('reply_comments').update(updateData).eq('id', parmas.id);
};

export {
  fetchComments,
  fetchReplyComments,
  addComment,
  addReplyComment,
  deleteComment,
  deleteReplyComment,
  updateComment,
  updateReplyComment,
};
