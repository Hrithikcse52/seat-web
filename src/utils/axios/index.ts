import axios from "axios";
import { BACKEND_URL } from "config";

console.log("backedn ur;", BACKEND_URL);

const instance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  response => {
    console.log("responose", response);
    return response;
  },
  async err => {
    console.log("error in interceop", err);
    if (err?.response?.status === 403) {
      const { status } = await instance.get("/user/refresh");
      if (status !== 200) {
        return err.response;
      }
      return instance(err?.config);
    }
    return err.response;
  }
);

export default instance;
