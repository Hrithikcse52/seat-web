import axios from "axios";
import { BACKEND_URL } from "config";
import { Post } from "types/post.type";
import { User } from "types/user.type";
import { Workspace } from "types/workspace.type";

export async function logOutAxios() {
  await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
}

export function checkUserWorkspace(workspace: Workspace, user: string | null) {
  console.log("worksapce", workspace);
  if (!user) return false;
  if (workspace.members && workspace.members.find(mem => mem._id === user)) return true;
  return false;
}
const adminAccessRoles = ["manager", "admin"];

export function adminAccess(role: string) {
  return adminAccessRoles.includes(role);
}

export function isPostLiked(user: string | null, post: Post) {
  if (!user) return false;
  return !!post.likes.find(like => like._id === user);
}

export function ownPage(curUser: string | null, usrPage: string) {
  if (!curUser) return false;
  console.log("user", curUser, usrPage);
  if (curUser === usrPage) return true;
  return false;
}

export function isSpaceMember(workspace: Workspace | undefined, user: string) {
  if (!workspace) return false;
  return !!workspace.members.find(mem => mem._id === user);
}
