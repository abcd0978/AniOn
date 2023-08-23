import supabase from "../supabaseClient";
import type { Database } from "../types/supabase";
type userTypeInsert = Database["public"]["Tables"]["users"]["Insert"];
enum AuthProvider {
  Google = "google",
  Kakao = "kakao",
  GitHub = "github",
  Discord = "discord",
}
export type FormData = {
  email: string;
  password: string;
};
export const logout = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};
export const addUser = async (user: userTypeInsert) => {
  const result = await supabase.from("users").insert(user);
  console.log(result);
};
export const checkUser = async (user_id: string) => {
  const result = await supabase
    .from("users")
    .select("count")
    .eq("id", user_id!);
  return result.data![0].count;
};
export const nicknameValidate = async (nickname: string) => {
  const result = await supabase
    .from("users")
    .select("count")
    .eq("nickname", nickname);
  console.log(result);
  return true;
};
export const loginHandler = async (
  Logindata?: FormData,
  isOAuth?: boolean,
  provider?: AuthProvider
) => {
  if (!isOAuth) {
    //email login
    try {
      const { data, error } = await supabase.auth.signInWithPassword(
        Logindata!
      );
      if (data.user) {
        alert("성공");
        return true;
      }
      if (error) {
        console.error((error as any).message);
        alert("로그인 정보를 다시 확인해주세요");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    //Provider Login
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider!,
    });

    if (error) {
      console.error(`${provider} 로그인 에러 발생:`, error);
      return;
    }
  }
};
