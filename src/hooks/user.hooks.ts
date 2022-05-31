import { QueryCache, QueryClient, useQuery } from "react-query";
import { User } from "types/user.type";
import instance from "utils/axios";

export const fetchUser = async () => {
  const { data, status } = await instance.get("/user/check");
  return { data, status };
};

export const useUserQuery = () => {
  const { data, ...restData } = useQuery("user", fetchUser, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (!data) {
    return { user: null, isAuth: false, ...restData };
  }
  const { status, data: user }: { data: User; status: number } = data;
  const isAuth = status === 200;
  return { user: isAuth ? user : null, isAuth, ...restData };
};

export const clearAllCache = () => {
  const queryClient = new QueryClient();
  const queryCache = new QueryCache();

  queryClient.refetchQueries("user");
  queryClient.clear();
  queryCache.clear();
};
