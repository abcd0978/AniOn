import supabase from "../supabaseClient";
import { Database } from "../types/supabase";
type Posts = Database["public"]["Tables"]["posts"]["Row"];

// Post 상세조회
// const getPost = async (id: string): Promise<Posts> => {
//   const { data } = await supabase.from("posts").select().eq("id", id).single();
//   return data;
// };

// Post 추가
const createPost = async (newPost: Posts): Promise<void> => {
  const {
    id,
    user_id,
    created_at,
    category_id,
    title,
    content,
    updated_at,
    deleted_at,
  } = newPost;
  await supabase.from("posts").insert([
    {
      id,
      user_id,
      created_at,
      category_id,
      title,
      content,
      updated_at,
      deleted_at,
    },
  ]);
};

// Post 삭제
const deletePost = async (id: string): Promise<void> => {
  await supabase.from("posts").delete().eq("id", id);
};

// Post 수정
const updatePost = async (editPost: Posts): Promise<void> => {
  await supabase.from("posts").update(editPost).eq("id", editPost.id);
};

export { createPost, deletePost, updatePost };
