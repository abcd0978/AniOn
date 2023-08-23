import React, { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { atom, useAtom } from "jotai"; // Import from jotai
import { Database } from "../../types/supabase";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabase의 환경변수가 없습니다.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Post = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
  user_id: string;
};

const userPostsAtom = atom<Post[]>([]);

const WhatIWrote = () => {
  const [userPosts, setUserPosts] = useAtom(userPostsAtom);

  const userId = "2fb03ff7-9993-458b-8740-317a04b36c65";

  useEffect(() => {
    const fetchUserPosts = async () => {
      console.log("Fetching user posts for user ID:", userId);
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching user posts:", error);
      } else {
        console.log("User posts fetched:", data);
        setUserPosts(data);
      }
    };

    fetchUserPosts();
  }, [setUserPosts]);

  return (
    <div>
      <h2>작성한 글 제목</h2>

      <ul>
        <h2>작성한 글 카테고리</h2>
        {userPosts.map((posts) => (
          <li key={posts.id}>
            <h3>{posts.title}</h3>
            <p>{posts.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatIWrote;
