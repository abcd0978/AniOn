import { Database } from '../types/supabase';

export type PostType = {
  category: string;
  content: string;
  created_at: string;
  deleted_at: string;
  id: string;
  post_id: string;
  likes: {
    id: string;
    post_id: string;
    user_id: string;
  }[];
  title: string;
  updated_at: string;
  user_id: string;
  users: {
    inventory: {
      id: string;
      items: {
        name: string;
        img_url: string;
      };
    }[];
    nickname: string;
    profile_img_url: string;
  };
};

export type InsertPost = Database['public']['Tables']['posts']['Insert'];
export type ReadPosts = Database['public']['Tables']['posts']['Row'];
export type UpdatePost = Database['public']['Tables']['posts']['Update'];
export type InsertLike = Database['public']['Tables']['likes']['Insert'];
