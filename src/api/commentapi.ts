import supabase from "../supabaseClient";
import { Database } from "../types/supabase";
type PostComment = Database["public"]["Tables"]["post_comments"]["Row"];

const fetchComments = async (post_id: string, page: number): Promise<any> => {
  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;

  const { data } = await supabase
    .from("post_comments")
    .select(
      `
      *,
      users(nickname)
    `
    )
    .eq("post_id", post_id)
    .range(startIndex, startIndex + itemsPerPage - 1)
    .order("created_at", { ascending: false });

  console.log("data", data);

  const { count } = await supabase
    .from("post_comments")
    .select("count", { count: "exact" })
    .eq("post_id", post_id);

  const totalPages = Math.ceil(count! / itemsPerPage);

  return { data, totalPages };
};

// 작성
const addComment = async (createComment: PostComment) => {
  await supabase.from("post_comments").insert(createComment);
};

// 삭제
const deleteComment = async (id: string) => {
  await supabase.from("post_comments").delete().eq("id", id);
};

// 수정
const updateComment = async (editComment: PostComment) => {
  await supabase
    .from("post_comments")
    .update(editComment)
    .eq("id", editComment.id);
};

export { fetchComments, addComment, deleteComment, updateComment };

// 유저아이    d19626c2-c374-421f-9dd1-726268e982cd
// post f4977fbd-d3ad-41f1-bbc7-5fb853b3ecfb
// cate  f5147c98-9f3a-4d2b-9fe6-0738abf38ba8

// 주소 http://localhost:3000/board/f4977fbd-d3ad-41f1-bbc7-5fb853b3ecfb
