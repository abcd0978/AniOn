import { Database } from '../types/supabase';

// likes: {
//     Row: {
//       id: string;
//       post_id: string;
//       user_id: string;
//     };
//     Insert: {
//       id?: string;
//       post_id: string;
//       user_id: string;
//     };
//     Update: {
//       id?: string;
//       post_id?: string;
//       user_id?: string;
//     };
//     Relationships: [
//       {
//         foreignKeyName: 'likes_post_id_fkey';
//         columns: ['post_id'];
//         referencedRelation: 'posts';
//         referencedColumns: ['id'];
//       },
//       {
//         foreignKeyName: 'likes_user_id_fkey';
//         columns: ['user_id'];
//         referencedRelation: 'users';
//         referencedColumns: ['id'];
//       },
//     ];
//   };

export type ReadLike = Database['public']['Tables']['likes']['Row'];
export type InsertLike = Database['public']['Tables']['likes']['Insert'];
