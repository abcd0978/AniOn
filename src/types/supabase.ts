export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      ani_comments: {
        Row: {
          ani_id: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          user_id: string;
          comment: string;
          users: {
            nickname: string;
            profile_img_url: string;
          };
        };
        Insert: {
          ani_id: string;
          created_at?: string;
          deleted_at?: string | null;
          user_id: string;
          comment: string;
        };
        Update: {
          ani_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          user_id?: string;
          comment: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ani_comments_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };

      characters: {
        Row: {
          character_name: string;
          id: string;
          img_url: string;
        };
        Insert: {
          character_name: string;
          id?: string;
          img_url: string;
        };
        Update: {
          character_name?: string;
          id?: string;
          img_url?: string;
        };
        Relationships: [];
      };
      inventory: {
        Row: {
          category: number;
          deleted_at: string | null;
          id: string;
          is_equipped: boolean;
          item_id: string;
          user_id: string;
        };
        Insert: {
          category: number;
          deleted_at?: string | null;
          id?: string;
          is_equipped: boolean;
          item_id: string;
          user_id: string;
        };
        Update: {
          category?: number;
          deleted_at?: string | null;
          id?: string;
          is_equipped?: boolean;
          item_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'inventory_item_id_fkey';
            columns: ['item_id'];
            referencedRelation: 'items';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'inventory_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      items: {
        Row: {
          category: number;
          id: string;
          img_url: string;
          is_on_sale: boolean;
          name: string;
          price: number;
        };
        Insert: {
          category: number;
          id?: string;
          img_url: string;
          is_on_sale?: boolean;
          name: string;
          price: number;
        };
        Update: {
          category?: number;
          id?: string;
          img_url?: string;
          is_on_sale?: boolean;
          name?: string;
          price?: number;
        };
        Relationships: [];
      };
      likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_post_id_fkey';
            columns: ['post_id'];
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      one_pick: {
        Row: {
          ani_list: Json;
          id: string;
          is_pick: boolean;
          pick_name: string;
        };
        Insert: {
          ani_list: Json;
          id?: string;
          is_pick?: boolean;
          pick_name: string;
        };
        Update: {
          ani_list?: Json;
          id?: string;
          is_pick?: boolean;
          pick_name?: string;
        };
        Relationships: [];
      };
      point: {
        Row: {
          id: number;
          point: number;
          user_id: string;
        };
        Insert: {
          id?: number;
          point?: number;
          user_id: string;
        };
        Update: {
          id?: number;
          point?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'point_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      post_comments: {
        Row: {
          comment: string;
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
          users: {
            nickname: string;
            profile_img_url: string;
          };
        };
        Insert: {
          comment: string;
          created_at?: string;
          post_id: string;
          user_id: string;
        };

        Update: {
          comment: string;
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'post_comments_post_id_fkey';
            columns: ['post_id'];
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_comments_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };

      posts: {
        Row: {
          category: string;
          content: string;
          created_at: string;
          deleted_at: string | null;
          id?: string;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          category?: string;
          content?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          category: string;
          content: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Relationships: [
          {
            foreignKeyName: 'posts_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      tags: {
        Row: {
          animals: number | null;
          battle: number | null;
          brains_fight: number | null;
          celebrity: number | null;
          exocism: number | null;
          family: number;
          games: number | null;
          growing_up: number | null;
          heavy: number | null;
          id: string;
          inspiration: number | null;
          love_triangle: number | null;
          magical_girl: number | null;
          monsters: number | null;
          munchkin: number | null;
          oriental: number | null;
          otaku: number | null;
          parenting: number | null;
          passion: number | null;
          philosophy: number | null;
          politics: number | null;
          power_women: number | null;
          revenge: number | null;
          reverse_harem: number | null;
          robot: number | null;
          sad: number | null;
          school: number | null;
          sololove: number | null;
          teacher: number | null;
          time_travel: number | null;
          timeloop: number | null;
          ts: number | null;
          vampire: number | null;
          western: number | null;
          zombies: number | null;
        };
        Insert: {
          animals?: number | null;
          battle?: number | null;
          brains_fight?: number | null;
          celebrity?: number | null;
          exocism?: number | null;
          family?: number;
          games?: number | null;
          growing_up?: number | null;
          heavy?: number | null;
          id?: string;
          inspiration?: number | null;
          love_triangle?: number | null;
          magical_girl?: number | null;
          monsters?: number | null;
          munchkin?: number | null;
          oriental?: number | null;
          otaku?: number | null;
          parenting?: number | null;
          passion?: number | null;
          philosophy?: number | null;
          politics?: number | null;
          power_women?: number | null;
          revenge?: number | null;
          reverse_harem?: number | null;
          robot?: number | null;
          sad?: number | null;
          school?: number | null;
          sololove?: number | null;
          teacher?: number | null;
          time_travel?: number | null;
          timeloop?: number | null;
          ts?: number | null;
          vampire?: number | null;
          western?: number | null;
          zombies?: number | null;
        };
        Update: {
          animals?: number | null;
          battle?: number | null;
          brains_fight?: number | null;
          celebrity?: number | null;
          exocism?: number | null;
          family?: number;
          games?: number | null;
          growing_up?: number | null;
          heavy?: number | null;
          id?: string;
          inspiration?: number | null;
          love_triangle?: number | null;
          magical_girl?: number | null;
          monsters?: number | null;
          munchkin?: number | null;
          oriental?: number | null;
          otaku?: number | null;
          parenting?: number | null;
          passion?: number | null;
          philosophy?: number | null;
          politics?: number | null;
          power_women?: number | null;
          revenge?: number | null;
          reverse_harem?: number | null;
          robot?: number | null;
          sad?: number | null;
          school?: number | null;
          sololove?: number | null;
          teacher?: number | null;
          time_travel?: number | null;
          timeloop?: number | null;
          ts?: number | null;
          vampire?: number | null;
          western?: number | null;
          zombies?: number | null;
        };
        Relationships: [];
      };
      user_tags: {
        Row: {
          id: string;
          tag_name: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          tag_name: string;
          user_id: string;
        };
        Update: {
          id?: string;
          tag_name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_tags_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          id: string;
          nickname: string;
          profile_img_url: string | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          nickname: string;
          profile_img_url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;

          nickname?: string;
          profile_img_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      worldcup: {
        Row: {
          character_id: string;
          id: number;
          num_of_win: number;
        };
        Insert: {
          character_id: string;
          id?: number;
          num_of_win?: number;
        };
        Update: {
          character_id?: string;
          id?: number;
          num_of_win?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'worldcup_character_id_fkey';
            columns: ['character_id'];
            referencedRelation: 'characters';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
