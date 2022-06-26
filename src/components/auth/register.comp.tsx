/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { BACKEND_URL } from "config";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

export default function RegisterCard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [regData, setRegData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    username: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(!loading);
    try {
      const { status, data } = await axios.post(`${BACKEND_URL}/user/register`, regData, { withCredentials: true });
      if (status !== 200) {
        toast.error(data.message ?? "something went wrong");
        setRegData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          username: "",
          phone: "",
        });
      } else {
        await queryClient.invalidateQueries("user");
        // console.log("called this invalidate");
        await router.push("/feed");
      }
    } catch (error) {
      console.log("errir", error);
      const message = (error as any).response.data.message ?? "something went wrong";
      toast.error(message);
      setRegData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        username: "",
        phone: "",
      });
    }
  };
  //   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     // console.log("handle change", e.target.type);
  //     if (e.target.files && e.target.type === "file") {
  //       setModalData({ ...modalData, image: e.target.files[0] });
  //     } else {
  //       setModalData({
  //         ...modalData,
  //         [e.target.name]: e.target.value,
  //       });
  //     }
  //   };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.type === "file") {
      console.log("files", e.target.name);
    } else {
      setRegData({
        ...regData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <section className="relative flex flex-wrap h-full items-center">
      <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
        <img className="object-fill w-full h-full" src="https://www.hyperui.dev/photos/team-1.jpeg" alt="" />
      </div>
      <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

          <p className="mt-4 text-gray-500">
            membook is the place you can get to know people, troll your friends, and more fun
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          <div className="flex gap-2">
            <div>
              <label htmlFor="firstName" className="sr-only">
                FirstName
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  value={regData.firstName}
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="First Name"
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
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={regData.lastName}
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Last Name"
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
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                value={regData.email}
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
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                onBlur={e => {
                  console.log(e);
                }}
                name="username"
                onChange={handleChange}
                value={regData.username}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter Username"
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

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={regData.password}
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
              Already have a accound ?{" "}
              <Link href="/login" passHref>
                <a className="underline">Login Here</a>
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
/**
 * 
 *  <div className="mt-2">
            <label className="relative block mb-2 p-3 border-2 border-gray-200 rounded-lg" htmlFor="email">
              <input
                className="w-full px-0 pt-5 pb-0 text-sm placeholder-transparent border-none outline-none peer"
                id="email"
                type="text"
                name="username"
                // onBlur={debouncedFilter}
                value={modalData.username}
                onChange={e => {
                  setModalData({ ...modalData, username: e.target.value });
                  debouncedFilter(e);
                }}
                placeholder="Name"
              />
              <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
                username
              </span>
            </label>

            {modalData.username !== user.username &&
              (usrValid.valid ? (
                <div className="alert alert-success shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{usrValid.msg}</span>
                  </div>
                </div>
              ) : (
                <div className="alert alert-error shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{usrValid.msg}</span>
                  </div>
                </div>
              ))}
          </div>
 */
