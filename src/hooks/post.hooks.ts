import { useQuery } from "react-query";
import { Post } from "types/post.type";
import instance from "utils/axios";
import { useUserQuery } from "./user.hooks";

export const fetchPosts = async () => {
  const { data, status } = await instance.get(`/post`);
  return { data, status };
};
export const fetchPost = async (id: string) => {
  const { data, status } = await instance.get(`/post/${id}`);
  return { data, status };
};

export const usePostsQuery = () => {
  const { user, isFetched } = useUserQuery();

  const postRes = useQuery<{ data: Post[]; status: number }>(["posts"], fetchPosts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isFetched && !!user,
  });
  console.log("🚀 ~ file: Post.hooks.ts ~ line 18 ~ postRes ~ postRes", postRes);

  let posts: Post[] | null = null;
  let statusCode = 400;
  if (postRes.data && postRes.data.status === 200) {
    posts = postRes.data.data;
    statusCode = postRes.data.status;
  }
  return { posts, statusCode, ...postRes };
};

export const usePostDetailsQuery = (id: string) => {
  const { user, isFetched } = useUserQuery();

  const postRes = useQuery<{ data: Post; status: number }>(["post", id], () => fetchPost(id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isFetched && !!user,
  });
  console.log("🚀 ~ file: Post.hooks.ts ~ line 18 ~ postRes ~ postRes", postRes);

  let post: Post | null = null;
  let statusCode = postRes?.data?.status || 400;
  if (postRes.data && postRes.data.status === 200) {
    post = postRes.data.data;
    statusCode = postRes.data.status;
  }
  return { post, statusCode, ...postRes };
};
