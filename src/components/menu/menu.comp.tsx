import Loader from "components/loader.comp";
import { useUserQuery } from "hooks/user.hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const publicAccessURL = ["/profile", "/workspace/[id]"];

export default function Feed({ children }: { children: ReactNode }) {
  const router = useRouter();
  const publicAccess = publicAccessURL.includes(router.pathname);
  const { user, isAuth, isFetched } = useUserQuery();
  if (isFetched && !isAuth && !publicAccess) router.push("/login");
  if (isFetched && isAuth && user)
    return (
      <div className="flex justify-center w-full h-[90vh] text-gray-700">
        <div className="flex w-full h-full">
          <div className="flex flex-col w-60 border-r px-4 h-full py-4 pr-3">
            <Link href="/feed" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">
                <div className="flex gap-2 items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-news"
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
                      <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
                      <line x1="8" y1="8" x2="12" y2="8" />
                      <line x1="8" y1="12" x2="12" y2="12" />
                      <line x1="8" y1="16" x2="12" y2="16" />
                    </svg>
                  </span>
                  Feed
                </div>
              </a>
            </Link>
            <Link href="/explore" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">
                <div className="flex gap-2 items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-compass"
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
                      <polyline points="8 16 10 10 16 8 14 14 8 16" />
                      <circle cx="12" cy="12" r="9" />
                      <line x1="12" y1="3" x2="12" y2="5" />
                      <line x1="12" y1="19" x2="12" y2="21" />
                      <line x1="3" y1="12" x2="5" y2="12" />
                      <line x1="19" y1="12" x2="21" y2="12" />
                    </svg>
                  </span>
                  Explore
                </div>
              </a>
            </Link>
            <Link href="/" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">
                <div className="flex gap-2 items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-bell"
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
                      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                  </span>
                  Notifications
                </div>
              </a>
            </Link>
            <Link href="/" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">
                <div className="flex gap-2 items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-inbox"
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
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <path d="M4 13h3l3 3h4l3 -3h3" />
                    </svg>
                  </span>
                  Inbox
                </div>
              </a>
            </Link>
            <Link href="/" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">
                <div className="flex gap-2 items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-users"
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
                      <circle cx="9" cy="7" r="4" />
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                  </span>
                  Spaces
                </div>
              </a>
            </Link>
            <Link href="/profile" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">
                <div className="flex gap-2 items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user-circle"
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
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="10" r="3" />
                      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                    </svg>
                  </span>
                  Profile
                </div>
              </a>
            </Link>
            <a className="flex px-3 py-2 mt-auto text-lg rounded-sm font-medium hover:bg-gray-200">
              <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
              <div className="flex flex-col ml-2">
                <span className="mt-1 text-sm font-semibold leading-none">Username</span>
                <span className="mt-1 text-xs leading-none">@username</span>
              </div>
            </a>
          </div>
          {children}
        </div>
      </div>
    );
  if (isFetched && !isAuth && publicAccess) {
    console.log("public view");
    return <div>{children}</div>;
  }

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <Loader />
    </div>
  );
}
