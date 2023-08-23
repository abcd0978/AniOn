import supabase from "../supabaseClient";
import { Database } from "../types/supabase";
type ReadAniComment = Database["public"]["Tables"]["ani_comments"]["Row"];
type InsertAniComment = Database["public"]["Tables"]["ani_comments"]["Insert"];
type UpdateAniComment = Database["public"]["Tables"]["ani_comments"]["Update"];

const fetchComments = async (ani_id: string, page: number): Promise<any> => {
  const itemsPerPage = 4;

  const startIndex = (page - 1) * itemsPerPage;

  const { data } = await supabase
    .from("ani_comments")
    .select("*,users(nickname,profile_img_url)")
    .eq("ani_id", ani_id)
    .range(startIndex, startIndex + itemsPerPage - 1)
    .order("created_at", { ascending: false });

  const { count } = await supabase
    .from("ani_comments")
    .select("count", { count: "exact" })
    .eq("ani_id", ani_id);

  const totalPages = Math.ceil(count! / itemsPerPage);

  return { data, totalPages };
};

// 작성
const addComment = async (createComment: InsertAniComment) => {
  await supabase.from("ani_comments").insert(createComment);
};

// 삭제
const deleteComment = async (id: string) => {
  await supabase.from("ani_comments").delete().eq("id", id);
};

// 수정
const updateComment = async (editComment: UpdateAniComment) => {
  await supabase
    .from("ani_comments")
    .update(editComment)
    .eq("id", editComment.id);
};

export { fetchComments, addComment, deleteComment, updateComment };
