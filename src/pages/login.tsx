import axios from "axios";
import { BACKEND_URL } from "config";
import { useUserQuery } from "hooks/user.hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { useQueryClient } from "react-query";

export default function Login() {
  const { isAuth: auth, isFetched } = useUserQuery();
  const router = useRouter();
  if (isFetched && auth) router.push("/");

  const queryClient = useQueryClient();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(!loading);
    const { status, data } = await axios.post(
      `${BACKEND_URL}/user/login`,
      loginData,
      { withCredentials: true }
    );
    queryClient.invalidateQueries("user");
    router.push("/");
  };

  const setEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setLoginData({ ...loginData, email: e.target.value });
  const setPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setLoginData({ ...loginData, password: e.target.value });
  return (
    <div className="flex flex-row w-full h-[90vh] ">
      <div className="bg-slate-200 w-1/2 flex  rounded p-4 justify-center items-center">
        <div className="flex flex-col rounded bg-slate-200 h-fit p-10">
          <div className="p-4  rounded ">
            <h3 className="text-left font-bold text-purple_dark text-2xl">
              Logo
            </h3>
            <p className="text-left">
              Company about and its working and somejting that will resemble the
              work and its enviroment
            </p>
            <div className="flex items-center py-2">
              <FaBeer className="p-2 bg-purple rounded" size="2em" />
              <p className="px-2">Lets have a beer</p>
            </div>
            <div className="flex items-center py-2">
              <FaBeer className="p-2 bg-purple rounded" size="2em" />
              <p className="px-2">Or something else you want</p>
            </div>
            <div className="flex items-center py-2">
              <FaBeer className="p-2 bg-purple rounded" size="2em" />
              <p className="px-2">Lets have a beer</p>
            </div>
          </div>
          <div className="text-center">
            <Link href="/register">
              <button
                type="button"
                className="text-white bg-purple_dark hover:bg-purple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-48 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Start a 30 day free trail and look for your self
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 p-4 rounded justify-center items-center">
        <form onSubmit={handleLoginSubmit}>
          <div className="flex flex-col rounded bg-slate-200 h-fit p-10 shadow-regi ">
            <h3 className="text-left font-bold p-4 text-purple_dark text-2xl">
              Login
            </h3>
            <div className="border-stone-100 border-2 rounded pb-4">
              <div className="p-4  rounded border-2   ">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none  focus:border-purple block w-full p-2.5 "
                    onChange={setEmail}
                    type="email"
                    id="email"
                    placeholder="name@admin.com"
                    required
                    value={loginData.email}
                  />
                </label>
              </div>
              <div className="p-4 rounded  ">
                <label
                  htmlFor="password_input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Password
                  <input
                    id="password_input"
                    type="password"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none  focus:border-purple block w-full p-2.5 "
                    onChange={setPassword}
                    placeholder="password"
                    value={loginData.password}
                  />
                </label>
              </div>
              <span className="text-sm p-4 text-purple_dark text-left hover:text-purple hover:cursor-pointer">
                <Link href="/forgetpassword">Forget Password ?</Link>
              </span>
            </div>
            <div className="text-center py-4">
              <button
                type="submit"
                className="text-white bg-purple_dark hover:bg-purple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
