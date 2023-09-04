import supabase from '../supabaseClient';
import type { InsertPost, UpdatePost, InsertLike } from '../types/post';

// 아래처럼 필터링 조건부로 처리하기
// let query = supabase
//   .from('cities')
//   .select('name, country_id')

// if (filterByName)  { query = query.eq('name', filterByName) }
// if (filterPopLow)  { query = query.gte('population', filterPopLow) }
// if (filterPopHigh) { query = query.lt('population', filterPopHigh) }

//전체 post 불러오기 + 페이지네이션
const getPosts = async (
  category?: string,
  page: number = 1,
  itemsPerPage: number = 12,
) => {
  try {
    const startIndex = (page - 1) * itemsPerPage;
    if (category === '') {
      let { data, error, count } = await supabase
        .from('posts')
        .select(
          '*,users!inner(nickname,profile_img_url,inventory(id,items(name,img_url))),likes(*)',
          {
            count: 'exact',
          },
        )
        .eq('users.inventory.is_equipped', true)
        .order('created_at', { ascending: false })
        .range(startIndex, startIndex + itemsPerPage - 1);

      if (error) {
        throw error;
      }

      const totalPages = Math.ceil(count! / itemsPerPage);

      return { data, totalPages, count };
    } else {
      const { data, error, count } = await supabase
        .from('posts')
        .select(
          '*,users!inner(nickname,profile_img_url,inventory(id,items(name,img_url))),likes(*)',
          {
            count: 'exact',
          },
        )
        .eq('category', category)
        .eq('users.inventory.is_equipped', true)
        .order('created_at', { ascending: false })
        .range(startIndex, startIndex + itemsPerPage - 1);

      if (error) {
        throw error;
      }
      const totalPages = Math.ceil(count! / itemsPerPage);

      return { data, totalPages, count };
    }
  } catch (error) {
    console.error('게시물을 불러오는 중 에러 발생:', error);
    throw error;
  }
};

// Post 상세조회
const getPost = async (id: string) => {
  const { data } = await supabase
    .from('posts')
    .select(
      '*,users!inner(nickname,profile_img_url,inventory(id,items(name,img_url)))',
    )
    .eq('id', id)
    .eq('users.inventory.is_equipped', true)
    .single();
  return data;
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
    };

    await supabase.from('posts').update(updatedFields).eq('id', editPost.id);
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// post 상세 조회에서 join으로 가져오도록 수정해보자.
// 좋아요 목록을 가져오는 함수
const getLikesForPost = async (postId: string) => {
  const { data } = await supabase
    .from('likes')
    .select('*')
    .eq('post_id', postId);
  return data;
};

const getLikeForPost = async (params: {
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
};

// 좋아요 삭제 함수
const deleteLike = async (likeId: string) => {
  await supabase.from('likes').delete().eq('id', likeId);
};

// 검색
const searchPost = async (keyword: string) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(
        '*,users!inner(nickname,profile_img_url,inventory(id,items(name,img_url))),likes(*)',
      )
      .or(
        `content.ilike.%${keyword}%, title.ilike.%${keyword}%, users.nickname.ilike.%${keyword}`,
      )
      .eq('users.inventory.is_equipped', true)
      .order('created_at', { ascending: false });
    if (error) {
      console.log('검색 에러', error);
    }
    return posts;
  } catch (error) {
    console.log('검색 에러', error);
  }
};
// .ilike('users.nickname', `%${keyword}%`)
// .or(`users.nickname.ilike.%${keyword}%`)
export {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getPosts,
  getLikesForPost,
  createLike,
  deleteLike,
  getLikeForPost,
  searchPost,
};
