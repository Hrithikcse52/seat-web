import { useQuery } from "react-query";
import { Blog } from "types/blog.type";
import { User } from "types/user.type";
import instance from "utils/axios";
import { useUserQuery } from "./user.hooks";

export const fetchBlog = async (id: string) => {
  const { data, status } = await instance.post(`/blog`, { workspace: id });
  return { data, status };
};

export const useBlogQuery = (id: string) => {
  const { user, isFetched } = useUserQuery();

  const blogRes = useQuery<{ data: Blog[]; status: number }>(["blog", id], () => fetchBlog(id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isFetched && !!user,
  });
  console.log("🚀 ~ file: blog.hooks.ts ~ line 18 ~ blogRes ~ blogRes", blogRes);

  let blogs: Blog[] | null = null;
  let statusCode = 400;
  if (blogRes.data && blogRes.data.status === 200) {
    blogs = blogRes.data.data;
    statusCode = blogRes.data.status;
  }
  return { blogs, statusCode, ...blogRes };
};
