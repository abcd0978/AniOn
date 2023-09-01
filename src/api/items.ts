import supabase from '../supabaseClient';
import type { Database } from '../types/supabase';
type ItemRow = Database['public']['Tables']['items']['Row'] | null;
// type PointRow = Database['public']['Tables']['point']['Row'];
// type InventoryInsert = Database['public']['Tables']['inventory']['Insert'];

export type AwardsRow = {
  id: string;
  item_id: string;
  user_id: string;
  is_equipped: boolean;
  items: {
    name: string;
  };
};

export type purchaseRes = {
  success: boolean;
  msg: string | null;
};

// 가격 비교 등 간단한 검사는 supabase(items.ts), 컴포넌트 양쪽에서
// ------------------------------- 인벤토리 관련 ----------------------------
// 장착
export const equipItem = async (params: {
  user_id: string;
  item_id?: string;
  category: number;
}): Promise<purchaseRes> => {
  try {
    const equipped = await fetchEquippedItem({
      user_id: params.user_id,
      category: params.category,
    });
    if (equipped && equipped.item_id !== params.item_id) {
      await supabase
        .from('inventory')
        .update({ is_equipped: false })
        .eq('item_id', equipped.item_id)
        .eq('user_id', params.user_id);
    }
    await supabase
      .from('inventory')
      .update({ is_equipped: true })
      .eq('item_id', params.item_id)
      .eq('user_id', params.user_id);

    return {
      success: true,
      msg: '칭호를 장착하였습니다.',
    };
  } catch (error) {
    return {
      success: false,
      msg: `장착중 오류가 발생했습니다. error : ${error} `,
    };
  }
};

// 전체
export const fetchMyItems = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*,items(*)')
      .eq('user_id', user_id);
    if (error) {
      console.log('items.ts fetchMyItems error > ', error);
      return [];
    }
    const item: ItemRow[] = data;
    return item;
  } catch (error) {
    console.log('items.ts fetchMyItems error > ', error);
    return [];
  }
};

// 인벤토리 칭호 불러오기
export const fetchMyAwards = async (user_id: string) => {
  try {
    let { data, error } = await supabase
      .from('inventory')
      .select(`*,items!inner(name)`)
      .eq('user_id', user_id)
      .eq('items.category', 1);

    if (error) {
      console.log('items.ts fetchMyAwards error > ', error);
      return [];
    }

    if (!data) {
      return [];
    }
    const item: AwardsRow[] = data;
    return item;
  } catch (error) {
    console.log('items.ts fetchMyAwards error > ', error);
    return [];
  }
};

// 인벤토리 보더 불러오기
export const fetchMyBorders = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*, items!inner(*)')
      .eq('items.category', 0)
      .eq('user_id', user_id);
    if (error) {
      console.log('items.ts fetchMyBorders error > ', error);
      return [];
    }
    const item: ItemRow[] = data;
    // console.log(item);
    return data;
  } catch (error) {
    console.log('items.ts fetchMyBorders error > ', error);
    return [];
  }
};

// 착용중인 칭호 불러오기
export const fetchEquippedItem = async (params: {
  user_id: string;
  category: number;
}) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*, items!inner(name)')
      .eq('items.category', params.category)
      .eq('user_id', params.user_id)
      .eq('is_equipped', true)
      .single();
    if (error) {
      console.log('items.ts fetchEquippedTitle error > ', error);
      return '';
    }
    const item: AwardsRow = data;
    return item;
  } catch (error) {
    console.log('items.ts fetchEquippedTitle error > ', error);
    return '';
  }
};

// 착용중인 아이템 전부
export const fetchEquippedItems = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('user_id,item_id, items!inner(name,img_url)')
      .eq('user_id', user_id)
      .eq('is_equipped', true)
      .returns<
        {
          user_id: any;
          item_id: any;
          items: {
            name: any;
            img_url: any;
          };
        }[]
      >();

    if (error) {
      console.log('items.ts fetchEquippedTitle error > ', error);
      return [];
    }
    console.log('이큅드 아이템', data);
    return data;
  } catch (error) {
    console.log('items.ts fetchEquippedTitle error > ', error);
    return [];
  }
};

// 착용중인 보더 불러오기
export const fetchEquippedBorder = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*, items!inner(*)')
      .eq('items.category', 0)
      .eq('user_id', user_id)
      .eq('is_equipped', true);
    if (error) {
      console.log('items.ts fetchEquippedBorder error > ', error);
      return {
        id: '',
        name: 'Not Found',
        img_url: '',
        category: 3,
        is_on_sale: false,
        price: 0,
      };
    }
    const item: ItemRow = data[0].items;
    // console.log(item);
    return item;
  } catch (error) {
    console.log('items.ts fetchEquippedBorder error > ', error);
    return {
      id: '',
      name: 'Not Found',
      img_url: '',
      category: 3,
      is_on_sale: false,
      price: 0,
    };
  }
};

// 칭호 착용하기
// ------------------------- 상점 -----------------------

// 판매중인 칭호 목록 불러오기
export const fetchAwards = async () => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('category', 1)
      .eq('is_on_sale', true);
    if (error) {
      console.log('items.ts fetchAwards error > ', error);
      return;
    }
    // console.log(data);
    // const items:ItemRow[] = data[0];
    return data;
  } catch (error) {
    console.log('items.ts fetchTitles error > ', error);
    return [];
  }
};

// 판매중인 보더 목록 불러오기
export const fetchBorders = async () => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('category', 0)
      .eq('is_on_sale', true);
    if (error) {
      console.log('items.ts fetchTitles error > ', error);
      return [];
    }
    // console.log(data);
    // const items:ItemRow[] = data[0];
    return data;
  } catch (error) {
    console.log('items.ts fetchTitles error > ', error);
    return [];
  }
};

// 아이템 한개 가져오기
export const fetchItem = async (itemId: string): Promise<ItemRow> => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('id', itemId);
    if (!data || data.length < 0 || error) {
      throw new Error('아이템이 존재하지 않음');
    }
    console.log(data);
    const item: ItemRow = data[0];
    return item;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 구매 ( 포인트 차감 )
export const purchase = async (params: {
  user_id: string;
  item_id: string;
}): Promise<purchaseRes> => {
  try {
    //아이템받아오기
    const item: ItemRow = await fetchItem(params.item_id);
    if (!item) {
      return { success: false, msg: '아이템이 존재하지 않습니다.' };
    }

    //포인트차감
    const myPoint = await fetchMyPoint(params.user_id);
    if (!myPoint || myPoint < 0) {
      return { success: false, msg: '서버에러 입니다.' };
    }
    if (myPoint! < item.price) {
      return { success: false, msg: '포인트가 부족합니다.' };
    }

    const { error: rpcError } = await supabase.rpc('updatePoint', {
      price: item.price * -1,
      userid: params.user_id,
    });

    if (rpcError) {
      return {
        success: false,
        msg: '구매한 아이템을 인벤토리에 추가하는 도중 오류가 발생했습니다.',
      };
    }

    //인벤토리 추가
    const { error: inventoryError } = await supabase.from('inventory').insert({
      is_equipped: false,
      item_id: item.id,
      user_id: params.user_id,
    });

    if (inventoryError) {
      return {
        success: false,
        msg: '구매한 아이템을 인벤토리에 추가하는 도중 오류가 발생했습니다.',
      };
    }

    return {
      success: true,
      msg: '남은돈:' + (myPoint - item.price),
    };
  } catch (e) {
    console.log(e);
    return { success: false, msg: '서버 에러입니다.' };
  }
};

// 포인트

// 내 포인트 가져오기
export const fetchMyPoint = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from('point')
      .select('point')
      .eq('user_id', user_id);

    if (error) {
      console.log('items.ts fetchMyPoint error > ', error);
      return -1;
    }
    const myPoint: number = data![0].point;
    return myPoint;
  } catch (error) {
    console.log('items.ts fetchMyPoint error > ', error);
  }
};
