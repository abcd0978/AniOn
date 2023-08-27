import supabase from '../supabaseClient';
import { Database } from '../types/supabase';
type InsertPosts = Database['public']['Tables']['posts']['Insert'];
type ReadPosts = Database['public']['Tables']['posts']['Row'];
type UpdatePosts = Database['public']['Tables']['posts']['Update'];

//Post 전체 목록 불러오기
const getPosts = async (category?: string) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*,users(nickname,profile_img_url)')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    if (category) {
      return data.filter((post: ReadPosts) => post.category === category);
    }

    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Post 상세조회
const getPost = async (id: string) => {
  const { data } = await supabase
    .from('posts')
    .select('*,users(nickname,profile_img_url)')
    .eq('id', id)
    .single();
  return data;
};

// Post 추가
const createPost = async (newPost: InsertPosts) => {
  await supabase.from('posts').insert(newPost);
};

// Post 삭제
const deletePost = async (id: string): Promise<void> => {
  await supabase.from('posts').delete().eq('id', id);
};
//post 수정
const updatePost = async (editPost: UpdatePosts): Promise<void> => {
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
export { createPost, deletePost, updatePost, getPost, getPosts };
