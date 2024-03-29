/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { BACKEND_URL } from "config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

export default function LoginCard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loginData, setLoginData] = useState({
    emailOrusername: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { status, data } = await axios.post(`${BACKEND_URL}/user/login`, loginData, { withCredentials: true });
    // console.log("stats", status, data);
    if (status !== 200) {
      toast.error("Username/Email Or Password is Wrong");
      setLoginData({
        emailOrusername: "",
        password: "",
      });
    } else {
      await queryClient.invalidateQueries("user");
      // console.log("called this invalidate");
      await router.push("/feed");
      setLoading(false);
    }
  };

  const setEmailOrusername = (e: ChangeEvent<HTMLInputElement>) =>
    setLoginData({ ...loginData, emailOrusername: e.target.value });
  const setPassword = (e: ChangeEvent<HTMLInputElement>) => setLoginData({ ...loginData, password: e.target.value });
  return (
    <section className=" flex flex-wrap lg:h-[89vh] items-center">
      <div className="w-full lg:w-1/2">
        <img
          className=" w-full h-[89vh]"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=100"
          alt=""
        />
      </div>
      <div className=" px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque ipsa culpa autem,
            at itaque nostrum!
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="text"
                onChange={setEmailOrusername}
                value={loginData.emailOrusername}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter email"
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                onChange={setPassword}
                value={loginData.password}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?{" "}
              <Link href="/register" passHref>
                <a className="underline">Sign up</a>
              </Link>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="flex content-center items-center px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
            >
              {loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler animate-spin mr-2 icon-tabler-loader-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 3a9 9 0 1 0 9 9" />
                </svg>
              )}
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
