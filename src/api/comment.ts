import supabase from "../supabaseClient";
import { Database } from "../types/supabase";
type PostComment = Database["public"]["Tables"]["post_comments"]["Row"];

const fetchComments = async (id: string, page: number): Promise<any> => {
  const itemsPerPage = 4; // 한 페이지당 보여줄 댓글 개수

  // 해당 페이지의 시작 인덱스 계산
  const startIndex = (page - 1) * itemsPerPage;

  // 댓글 데이터 가져오기
  const { data } = await supabase
    .from("post_comments")
    .select()
    .eq("post_id", id)
    .range(startIndex, startIndex + itemsPerPage - 1);

  // 총 댓글 개수 가져오기
  const { count } = await supabase
    .from("post_comments")
    .select("count", { count: "exact" })
    .eq("post_id", id);

  // 총 페이지 개수 계산
  const totalPages = Math.ceil(count! / itemsPerPage);

  // 데이터와 총 페이지 개수를 객체로 묶어서 반환
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
