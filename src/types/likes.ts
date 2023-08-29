import { Database } from './supabase';

export type ReadAnimeLikeG = Database['public']['Tables']['anime_likes']['Row'];
export type InsertAnimeLikeG =
  Database['public']['Tables']['anime_likes']['Insert'];
