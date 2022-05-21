import { useUserQuery } from "hooks/user.hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";

const NavbarLinks = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Blog", path: "/blog" },
  { id: 3, label: "Explore", path: "/Explore" },
  { id: 4, label: "Offers", path: "/offers" },
];

export default function Navbar() {
  const router = useRouter();
  console.log("path", router.pathname);

  const { user, isAuth: auth, isFetched } = useUserQuery();
  //   const queryClient = useQueryClient();
  // console.log('new user', auth, user, isError, error);

  const [dropdown, setDropdown] = useState(false);
  const [ham, setHam] = useState(false);

  return (
    <div className="w-full text-gray-700 bg-slate-200 dark-mode:text-gray-200 dark-mode:bg-gray-800">
      <div
        // x-data="{ open: false }"
        className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
      >
        <div className="p-4 flex flex-row items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
          >
            LOGO
          </Link>
          {/* <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline" @click="open = !open"> */}
          <button
            onClick={() => {
              //   setDropdown(!dropdown);
              setHam(!ham);
              // console.log('her');
            }}
            type="button"
            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {!ham ? (
                <path
                  // x-show="!open"
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  // x-show="open"
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
        {/* <nav :className="{'flex': open, 'hidden': !open}" className="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row"> */}
        <nav
          className={`${
            ham ? "flex" : "hidden"
          } flex-col flex-grow pb-4 md:pb-0 mr-auto md:flex md:justify-end md:flex-row`}
        >
          {NavbarLinks.map(link => (
            <Link
              key={link.id}
              // className={`${
              //   link.path === currentPath ? "underline underline-offset-4" : ""
              // } px-4 py-2 mt-2 text-sm  font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-white focus:text-gray-900 hover:bg-purple focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
              className="px-4 py-2 mt-2 text-sm  font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-white focus:text-gray-900 hover:bg-purple focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href={link.path}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            {isFetched && auth ? (
              <button
                type="button"
                onClick={() => {
                  setDropdown(!dropdown);
                }}
                className="flex bg-red flex-row items-center w-full px-4 py-2 mt-2 text-sm  font-semibold text-left  rounded-lg  md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-purple  focus:outline-none focus:shadow-outline"
              >
                <span className="">
                  {/* {(user && getFullName(user)) || ""}</span> */}
                  name
                </span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className={`${
                    dropdown ? "rotate-180" : "rotate-0"
                  } inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    //   navigate(
                    //     `${currentPath === "/login" ? "/register" : "/login"}`
                    //   );
                  }}
                  className="w-full bg-purple text-white px-4 py-2 mt-2 text-sm font-semibold text-left  rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-slate-200 focus:text-slate-200 hover:bg-purple_dark  focus:outline-none focus:shadow-outline"
                >
                  <span className="flex items-center">
                    <BiUserCircle className="mr-1" />
                    login
                    {/* {currentPath === "/login" ? "Register" : "Login"} */}
                  </span>
                </button>
              </div>
            )}
            {dropdown && (
              <div
                //   x-show="open"
                //   x-transition:enter="transition ease-out duration-100"
                //   x-transition:enter-start="transform opacity-0 scale-95"
                //   x-transition:enter-end="transform opacity-100 scale-100"
                //   x-transition:leave="transition ease-in duration-75"
                //   x-transition:leave-start="transform opacity-100 scale-100"
                //   x-transition:leave-end="transform opacity-0 scale-95"
                style={{ transition: "transition ease-out duration-100" }}
                className="z-50 absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48"
              >
                <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                  <button
                    type="button"
                    onClick={() => {
                      // navigateClose("/profile");
                    }}
                    className="block w-full px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  >
                    profile
                  </button>
                  <button
                    type="button"
                    className="block w-full px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  >
                    settings
                  </button>
                  {isFetched &&
                    auth &&
                    user &&
                    (user.role === "admin" || user.role === "manager") && (
                      <button
                        onClick={() => {
                          // navigateClose("/admin");
                        }}
                        type="button"
                        className="block w-full px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      >
                        admin dash
                      </button>
                    )}
                  <button
                    onClick={async () => {
                      try {
                        console.log("logout er1");

                        // await logOutAxios();
                      } catch (err) {
                        console.log("logout er", err);
                      }
                      // queryClient.invalidateQueries("user");
                      // clearAllCache();
                      // setDropdown(!dropdown);
                      // navigate("/");
                    }}
                    type="button"
                    className="block w-full px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  >
                    logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
