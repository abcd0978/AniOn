import supabase from "../supabaseClient";
import { Database } from "../types/supabase";

type InsertPostComment =
  Database["public"]["Tables"]["post_comments"]["Insert"];
type UpdatePostComment =
  Database["public"]["Tables"]["post_comments"]["Update"];

const fetchComments = async (post_id: string, page: number): Promise<any> => {
  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;

  const { data } = await supabase
    .from("post_comments")
    .select("*,users(nickname,profile_img_url)")
    .eq("post_id", post_id)
    .range(startIndex, startIndex + itemsPerPage - 1)
    .order("created_at", { ascending: false });
  console.log("----", data);

  const { count } = await supabase
    .from("post_comments")
    .select("count", { count: "exact" })
    .eq("post_id", post_id);

  const totalPages = Math.ceil(count! / itemsPerPage);

  return { data, totalPages };
};

// 작성
const addComment = async (createComment: InsertPostComment) => {
  await supabase.from("post_comments").insert(createComment);
};

// 삭제
const deleteComment = async (id: string) => {
  await supabase.from("post_comments").delete().eq("id", id);
};

// 수정
const updateComment = async (editComment: UpdatePostComment) => {
  await supabase
    .from("post_comments")
    .update(editComment)
    .eq("id", editComment.id);
};

export { fetchComments, addComment, deleteComment, updateComment };

// 유저아이    d19626c2-c374-421f-9dd1-726268e982cd
// cate  f5147c98-9f3a-4d2b-9fe6-0738abf38ba8
// post 111d55e1-5fbf-497d-9117-18da8937ab55
