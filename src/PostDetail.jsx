import { useQuery } from "@tanstack/react-query";

import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post }) {
  // replace with useQuery

  const { data, isLoading, error } = useQuery({
    queryKey: ["post-detail", post.id],
    queryFn: () => fetchComments(post.id),
  });

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {isLoading && <p>Loading post comments...</p>}
      {!error &&
        data?.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))}
    </>
  );
}
