import { Avatar } from "@mantine/core";
import { clearAllCache, useUserQuery } from "hooks/user.hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { getFullName } from "utils/nav.helper";
import { logOutAxios } from "utils/user.helper";

export default function NavBarNew() {
  const router = useRouter();

  const { user, isAuth, isFetched } = useUserQuery();
  const queryClient = useQueryClient();

  return (
    <nav className="border-b  max-w-screen">
      <div className="flex items-center justify-between h-16 mx-auto max-w-screen-2xl px-8">
        <div className="flex items-center justify-center ">
          <Link href="/" passHref>
            <a className="flex items-center">membook</a>
          </Link>
        </div>

        <div className="flex items-center justify-end flex-1">
          <div className="flex items-center">
            {isFetched && isAuth && user && (
              <div className="flex items-center border-gray-100">
                <div className="dropdown dropdown-end">
                  <button type="button">
                    <span className="flex justify-between items-center">
                      <Avatar src={user.profileImg} alt={getFullName(user.name)}>
                        {user.name.firstName[0] + user.name.lastName[0]}
                      </Avatar>
                      <span className="ml-2"> {getFullName(user.name)} </span>
                      <svg
                        className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <ul className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <Link href={`/profile/${user.username}`} passHref>
                        <a>Profile</a>
                      </Link>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await logOutAxios();
                          } catch (err) {
                            console.log("logout er", err);
                          }
                          queryClient.invalidateQueries("user");
                          clearAllCache();
                          router.push("/");
                        }}
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {isFetched && !isAuth && (
              <div className="items-center justify-end flex-1 space-x-4 flex">
                <Link href="/login" passHref>
                  <a className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg" href="">
                    Log in
                  </a>
                </Link>
                <Link href="/register" passHref>
                  <a className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg" href="">
                    Sign up
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
