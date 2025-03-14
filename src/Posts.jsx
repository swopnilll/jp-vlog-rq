import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { PostDetail } from "./PostDetail";

import { fetchPosts, deletePost, updatePost } from "./api";

const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <h1>...isLoading</h1>;
  }

  if (isError) {
    return <h1>Oops! Something went wrong!!! {error.message}</h1>;
  }

  return (
    <>
      {!isError && (
        <ul>
          {data?.map((post) => (
            <li
              key={post.id}
              className="post-title"
              onClick={() => setSelectedPost(post)}
            >
              {post.title}
            </li>
          ))}
        </ul>
      )}
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
