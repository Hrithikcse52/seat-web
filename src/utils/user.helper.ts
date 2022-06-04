import axios from "axios";
import { BACKEND_URL } from "config";
import { Post } from "types/post.type";
import { User } from "types/user.type";

export async function logOutAxios() {
  await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
}

export function checkUserWorkspace(user: User | null, id: string) {
  if (!user) return false;
  if (user.workspaces && user.workspaces.find(work => work._id === id)) return true;
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
