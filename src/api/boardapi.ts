import supabase from '../supabaseClient';
import type {
  InsertPost,
  UpdatePost,
  InsertLike,
  UserPostType,
} from '../types/post';
import { toast } from 'react-toastify';

//전체 post 불러오기 + 페이지네이션
const fetchPosts = async (
  category?: string,
  page: number = 1,
  searchKeyword?: string,
  itemsPerPage: number = 12,
) => {
  try {
    const startIndex = (page - 1) * itemsPerPage;
    let query = supabase
      .from('posts')
      .select(
        '*,users!inner(nickname,profile_img_url,inventory(id,items(name,img_url,category))),likes(*)',
        {
          count: 'exact',
        },
      )
      .eq('users.inventory.is_equipped', true);

    if (category === '') {
      if (searchKeyword === '') {
        query = query
          .order('created_at', { ascending: false })
          .range(startIndex, startIndex + itemsPerPage - 1);
      } else {
        query = query
          .or(
            `content.ilike.%${searchKeyword}%, title.ilike.%${searchKeyword}%`,
          )
          .order('created_at', { ascending: false })
          .range(startIndex, startIndex + itemsPerPage - 1);
      }
    } else {
      if (searchKeyword === '') {
        query = query
          .eq('category', category)
          .order('created_at', { ascending: false })
          .range(startIndex, startIndex + itemsPerPage - 1);
      } else {
        query = query
          .eq('category', category)
          .or(
            `content.ilike.%${searchKeyword}%, title.ilike.%${searchKeyword}%`,
          )
          .order('created_at', { ascending: false })
          .range(startIndex, startIndex + itemsPerPage - 1);
      }
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    // 댓글 수 가져오기
    const commentsData = await fetchAllPostsComments();

    // 게시물 데이터에 댓글 수 추가
    const postsWithComments = data.map((post) => ({
      ...post,
      commentsCount: commentsData.filter(
        (comment) => comment.post_id === post.id,
      ).length,
    }));

    const totalPages = Math.ceil(count! / itemsPerPage);

    return { data: postsWithComments, totalPages, count };
  } catch (error) {
    throw error;
  }
};

// Post 상세조회
const fetchPost = async (id: string) => {
  const { data } = await supabase
    .from('posts')
    .select(
      '*,users!inner(nickname,profile_img_url,inventory(id,items(name,img_url,category)))',
    )
    .eq('id', id)
    .eq('users.inventory.is_equipped', true)
    .single();
  return data;
};

const fetchUserPosts = async (
  id: string,
  page: number = 1,
  itemsPerPage: number = 12,
): Promise<UserPostType> => {
  try {
    const startIndex = (page - 1) * itemsPerPage;
    const { data, error, count } = await supabase
      .from('posts')
      .select('*', {
        count: 'exact',
      })
      .eq('user_id', id)
      .order('created_at', { ascending: false })
      .range(startIndex, startIndex + itemsPerPage - 1);
    if (error) {
      return {
        data: [],
        totalPages: 0,
        count: 0,
      };
    }
    const totalPages = Math.ceil(count! / itemsPerPage);
    return { data, totalPages, count } as UserPostType;
  } catch (error) {
    return {
      data: [],
      totalPages: 0,
      count: 0,
    };
  }
};

// Post 추가
const createPost = async (newPost: InsertPost) => {
  await supabase.from('posts').insert(newPost);
};

// Post 삭제
const deletePost = async (id: string): Promise<void> => {
  await supabase.from('posts').delete().eq('id', id);
};

//post 수정
const updatePost = async (editPost: UpdatePost): Promise<void> => {
  try {
    const updatedFields = {
      title: editPost.title,
      content: editPost.content,
      category: editPost.category,
      thumbnail: editPost.thumbnail,
    };

    await supabase.from('posts').update(updatedFields).eq('id', editPost.id);
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// post 상세 조회에서 join으로 가져오도록 수정해보자.
// 좋아요 목록을 가져오는 함수
const fetchLikesForPost = async (postId: string) => {
  const { data } = await supabase
    .from('likes')
    .select('*')
    .eq('post_id', postId);
  return data;
};

const fetchLikeForPost = async (params: {
  post_id: string | undefined;
  user_id: string | undefined;
}) => {
  try {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', params.post_id)
      .eq('user_id', params.user_id);
    if (error) {
      console.log('api / boardApi / getLikesForPost Error > ', error);
    }
    return data;
  } catch (error) {
    console.log('api / boardApi / getLikesForPost Error > ', error);
    return [];
  }
};

// 좋아요 추가 함수
const createLike = async (params: { post_id: string; user_id: string }) => {
  // 함수 매개변수 이름 수정
  const newLike: InsertLike = {
    post_id: params.post_id,
    user_id: params.user_id,
  };
  await supabase.from('likes').insert(newLike);
  toast.success(`좋아요💜`, {
    autoClose: 800,
  });
};

// 좋아요 삭제 함수
const deleteLike = async (likeId: string) => {
  await supabase.from('likes').delete().eq('id', likeId);
  toast.success(`좋아요 취소😭`, {
    autoClose: 800,
  });
};

//댓글 보여주기
const fetchAllPostsComments = async () => {
  try {
    const { data, error } = await supabase
      .from('post_comments')
      .select('post_id');
    if (error) {
      return [];
    }
    return data;
  } catch (error) {
    return [];
  }
};

export {
  createPost,
  deletePost,
  updatePost,
  fetchPost,
  fetchPosts,
  fetchLikesForPost,
  fetchUserPosts,
  createLike,
  deleteLike,
  fetchLikeForPost,
  fetchAllPostsComments,
};
