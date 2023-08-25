import supabase from '../supabaseClient';
import { Database } from '../types/supabase';
type InsertPosts = Database['public']['Tables']['posts']['Insert'];
type ReadPosts = Database['public']['Tables']['posts']['Row'];
type UpdatePosts = Database['public']['Tables']['posts']['Update'];

//Post 전체 목록 불러오기
const getPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/// Post 상세조회
const getPost = async (id: string) => {
  const { data } = await supabase
    .from('posts')
    .select('*')
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

// Post 수정
const updatePost = async (editPost: UpdatePosts): Promise<void> => {
  await supabase.from('posts').update(editPost).eq('id', editPost.id);
};

export { createPost, deletePost, updatePost, getPost, getPosts };
