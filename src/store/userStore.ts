import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import supabase from '../supabaseClient';
import * as authApi from '../api/auth';
import { Database } from '../types/supabase';
type Usertype = Database['public']['Tables']['users']['Row'];
export const user = atomWithStorage<Usertype | null>('user', null);
export const accessTokenAtom = atomWithStorage<string | null>(
  'accessToken',
  null,
);
export const logoutUser = atom(null, (__, set) => {
  set(user, null);
  set(accessTokenAtom, null);
});
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
      email: userData?.user_metadata.email,
    };
    set(accessTokenAtom, accessToken);
    set(user, currentUser);
    if ((await authApi.checkUser(userData!.id)) <= 0) {
      //db에 있으면 안넣고 db에있으면 넣는다
      await authApi.addUser(currentUser);
    }
    return true;
  }
  return false;
});
