import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabase의 환경변수가 없습니다.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Like = {
  id: string;
  post_id: string;
  user_id: string;
};

// const fetchLikedPosts = async (userId: string): Promise<Like[]> => {
//   const { data, error } = await supabase
//     .from<Like>("likes")
//     .select()
//     .eq("user_id", userId);

//   if (error) {
//     console.error(error);
//     return [];
//   }

//   return data || [];
// };

const LikedAnime = () => {
  //   const [likedPosts, setLikedPosts] = useState<Like[]>([]);

  //   useEffect(() => {
  //     const user = supabase.auth.user();
  //     if (user) {
  //       fetchLikedPosts(user.id).then((data) => {
  //         setLikedPosts(data);
  //       });
  //     }
  //   }, []);

  return (
    <div>
      {/* <h2>찜한 목록</h2>
      <ul>
        {likedPosts.map((like) => (
          <li key={like.id}>
            <p>Post ID: {like.post_id}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default LikedAnime;
