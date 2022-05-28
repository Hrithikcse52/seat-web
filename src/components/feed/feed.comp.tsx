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
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">Feed</a>
            </Link>
            <Link href="/explore" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">Explore</a>
            </Link>
            <Link href="/" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">Notifications</a>
            </Link>
            <Link href="/" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">Inbox</a>
            </Link>
            <Link href="/" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">Saved Posts</a>
            </Link>
            <Link href="/" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">Groups</a>
            </Link>
            <Link href="/profile" passHref>
              <a className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">Profile</a>
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
