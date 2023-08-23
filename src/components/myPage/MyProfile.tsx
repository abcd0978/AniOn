import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";
import myAnonymousImg from "../../assets/anonymous_img.jpg";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { atom, useAtom } from "jotai"; // Import from jotai
import { Profile } from "./MyPage.styles";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabase의 환경변수가 없습니다.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const getUser = async (userId: string): Promise<Users | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

export type Users = Database["public"]["Tables"]["users"]["Row"];

const userAtom = atom<Users | null>(null);

const MyProfile = () => {
  const [user, setUser] = useAtom(userAtom);
  const { user_id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user_id) {
        return;
      }
      const fetchedUser = await getUser(user_id);
      setUser(fetchedUser);
    };
    fetchUser();
  }, [user_id]);

  if (!user) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      {user.profile_img_url ? (
        <Profile.BasicImage src={user.profile_img_url} alt="Profile picture" />
      ) : (
        <Profile.BasicImage src={myAnonymousImg} />
      )}
      <div>{user.nickname}님</div>
      <UpdateProfileForm user={user} />
    </div>
  );
};

const UpdateProfileForm = ({ user }: { user: Users }) => {
  const [, setUser] = useAtom(userAtom);
  const [newNickname, setNewNickname] = useState("");

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .update({ nickname: newNickname })
      .eq("id", user.id);

    if (error) {
      console.error(error);
    } else if (data && Array.isArray(data)) {
      setUser(data[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newNickname}
        onChange={handleNicknameChange}
        placeholder="New Nickname"
      />
      <button type="submit"></button>
    </form>
  );
};

export default MyProfile;
