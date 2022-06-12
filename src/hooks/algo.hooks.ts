import { useQuery } from "react-query";
import { Post } from "types/post.type";
import instance from "utils/axios";
import { useUserQuery } from "./user.hooks";

export const fetchTrending = async () => {
  const { data, status } = await instance.get("/algo/trending");
  return { data, status };
};

export const useTrendingPosts = () => {
  const { user, isFetched } = useUserQuery();

  const trendingRes = useQuery<{ data: Post[]; status: number }>(["trending"], fetchTrending, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isFetched && !!user,
  });

  let trends: Post[] | null = null;
  let statusCode = 400;
  if (trendingRes.data && trendingRes.data.status === 200) {
    trends = trendingRes.data.data;
    statusCode = trendingRes.data.status;
  }

  return { trends, statusCode, ...trendingRes };
};
