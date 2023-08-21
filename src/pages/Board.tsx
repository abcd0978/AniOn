import React from "react";
import { Database } from "../types/supabase";
type PostComment = Database["public"]["Tables"]["post_comments"]["Row"];

type Props = {};

function Board({}: Props) {
  return <div>Board</div>;
}

export default Board;
