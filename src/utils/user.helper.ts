import axios from "axios";
import { BACKEND_URL } from "config";
import { User } from "types/user.type";

export async function logOutAxios() {
  await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
}

export function checkUserWorkspace(user: User | null, id: string) {
  if (!user) return false;
  console.log("called check", user, id);
  if (user.workspaces && user.workspaces.find(work => work._id === id))
    return true;
  return false;
}