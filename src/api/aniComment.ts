import supabase from "../supabaseClient";
import { Database } from "../types/supabase";
type AniComment = Database["public"]["Tables"]["ani_comments"]["Row"];

const fetchComments = async (ani_id: string, page: number): Promise<any> => {
  const itemsPerPage = 4;

  const startIndex = (page - 1) * itemsPerPage;

  const { data } = await supabase
    .from("ani_comments")
    .select("*")
    .eq("ani_id", ani_id) // post_id 값을 변수 post_id로 변경
    .range(startIndex, startIndex + itemsPerPage - 1);

  const { count } = await supabase
    .from("ani_comments")
    .select("count", { count: "exact" })
    .eq("ani_id", ani_id); // post_id 값을 변수 post_id로 변경

  const totalPages = Math.ceil(count! / itemsPerPage);

  return { data, totalPages };
};

// 작성
const addComment = async (createComment: AniComment) => {
  await supabase.from("ani_comments").insert(createComment);
};

// 삭제
const deleteComment = async (id: string) => {
  await supabase.from("ani_comments").delete().eq("id", id);
};

// 수정
const updateComment = async (editComment: AniComment) => {
  await supabase
    .from("ani_comments")
    .update(editComment)
    .eq("id", editComment.id);
};

export { fetchComments, addComment, deleteComment, updateComment };
