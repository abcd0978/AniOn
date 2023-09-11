import { Database } from './supabase';

export type ItemRow = Database['public']['Tables']['items']['Row'] | null;

export type AwardsRow = {
  id: string;
  item_id: string;
  user_id: string;
  is_equipped: boolean;
  items: {
    name: string;
    img_url?: string;
  };
};

export type purchaseRes = {
  success: boolean;
  msg: string | null;
};

export type equipParam = {
  user_id: string;
  item_id?: string;
  category: number;
};
