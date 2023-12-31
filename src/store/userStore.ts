import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import supabase from '../supabaseClient';
import * as authApi from '../api/auth';
import { Database } from '../types/supabase';

type Usertype = Database['public']['Tables']['users']['Row'];
export const user = atomWithStorage<Usertype | null>('user', null);
export const accessTokenS = atomWithStorage<string | null>('accessToken', null);

export const logoutUser = atom(null, (__, set) => {
  set(accessTokenS, null);
  set(user, null);
});

// export const setBorder = atom(null, (get, set) => {});

export const writeUser = atom(null, async (get, set) => {
  const session = await supabase.auth.getSession();
  if (session.data.session) {
    const accessToken = session?.data?.session?.access_token;
    const userData = session?.data?.session?.user;
    const currentUser: Usertype = {
      id: userData!.id,
      created_at: userData!.created_at,
      profile_img_url: userData?.user_metadata.profile_img_url
        ? userData?.user_metadata.profile_img_url
        : userData?.user_metadata.avatar_url,
      nickname: userData?.user_metadata.nickname
        ? userData?.user_metadata.nickname
        : userData?.user_metadata.name,
      email: userData?.email!,
    };
    set(accessTokenS, accessToken);
    set(user, currentUser);
    if ((await authApi.checkUser(userData!.id)) <= 0) {
      //db에 있으면 안넣고 db에있으면 넣는다
      await authApi.addUser(currentUser);
      await supabase
        .from('point')
        .insert({ user_id: userData.id!, point: 100 }); //포인트 넣어주기
      await supabase.from('user_genres').insert([{ user_id: userData.id! }]); //장르 선호 넣어주기
    }
    return true;
  }
  return false;
});
