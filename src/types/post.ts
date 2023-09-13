import { Database } from '../types/supabase';

export type PostType = {
  category: string;
  content: string;
  created_at: string;
  deleted_at: string;
  id: string;
  thumbnail?: string;
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
        category: number;
      };
    }[];
    nickname: string;
    profile_img_url: string;
  };
};

export type UserPostType = {
  count: number;
  data?: {
    category: string;
    content: string;
    created_at: string;
    deleted_at: string;
    id: string;
    thumbnail: string | null;
    title: string;
    updated_at: string;
    user_id: string;
  }[];
  totalPages: number;
};

export type InsertPost = Database['public']['Tables']['posts']['Insert'];
export type ReadPosts = Database['public']['Tables']['posts']['Row'];
export type UpdatePost = Database['public']['Tables']['posts']['Update'];
export type InsertLike = Database['public']['Tables']['likes']['Insert'];
export type Like = Database['public']['Tables']['likes']['Row'];
