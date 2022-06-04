import { useQuery } from "react-query";
import { Workspace } from "types/workspace.type";
import instance from "utils/axios";
import { useUserQuery } from "./user.hooks";

// array
type WorkSpaceQueryRes = {
  data: Workspace[] | undefined;
  status: number;
};

// single
export type WorkspaceRes = {
  data: Workspace | undefined;
  status: number;
};

export const exploreWorkspaces = async () => {
  const { data, status } = await instance.get("/workspace/explore");
  return { data, status };
};

export const fetchWorkspaces = async () => {
  const { data, status } = await instance.get("/workspace");
  return { data, status };
};

export const fetchWorkspace = async (id: string) => {
  const { data, status } = await instance.get(`/workspace/${id}`);
  return { data, status };
};

export const useWorkspacesQuery = () => {
  const { user, isFetched } = useUserQuery();
  const workspaceResponse = useQuery<WorkSpaceQueryRes>(["managed_workspaces", user?._id], fetchWorkspaces, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isFetched && !!user,
  });
  let workspaces = null;
  let statusCode = 400;
  if (workspaceResponse.data && workspaceResponse.data.status === 200) {
    workspaces = workspaceResponse.data.data;
    statusCode = workspaceResponse.data.status;
  }
  //   const workspaces = workspaceResponse.data?.data;

  return { workspaces, statusCode, ...workspaceResponse };
};

export const useExploreWorkQuery = () => {
  const workspaceResponse = useQuery<WorkSpaceQueryRes>("explore_workspaces", exploreWorkspaces, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // refetchInterval: 1000 * 60,
  });
  let workspaces = null;
  let statusCode = 400;
  if (workspaceResponse.data && workspaceResponse.data.status === 200) {
    workspaces = workspaceResponse.data.data;
    statusCode = workspaceResponse.data.status;
  }
  //   const workspaces = workspaceResponse.data?.data;

  return { workspaces, statusCode, ...workspaceResponse };
};

export const useGetWorkspace = (id: string, data: WorkspaceRes | undefined) => {
  const { user, isFetched } = useUserQuery();

  const workspaceResponse = useQuery<WorkspaceRes>(["explore_workspaces", id], () => fetchWorkspace(id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isFetched && !!user,
    initialData: data,
    // refetchInterval: 1000 * 60,
  });
  let workspace = null;
  let statusCode = 400;
  if (workspaceResponse.data && workspaceResponse.data.status === 200) {
    workspace = workspaceResponse.data.data;
    statusCode = workspaceResponse.data.status;
  }
  //   const workspaces = workspaceResponse.data?.data;

  return { workspace, statusCode, ...workspaceResponse };
};
