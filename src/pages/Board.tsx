import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/boardapi";

function Board() {
  const { data: posts = [] } = useQuery(["posts"], getPosts);

  return (
    <div>
      <h1>게시판</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <Link to="/board/write">글 작성</Link>
    </div>
  );
}

export default Board;
