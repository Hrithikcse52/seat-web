import { useUserQuery } from "hooks/user.hooks";
import { useWorkspacesQuery } from "hooks/workspace.hooks";
import Link from "next/link";
import { getFullName } from "utils/nav.helper";
import { HiOutlineMail } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineWorkspaces } from "react-icons/md";
import { useRouter } from "next/router";

export default function UserProfile() {
  const router = useRouter();
  const { user, isAuth, isLoading, isFetched } = useUserQuery();
  const {
    workspaces,
    // statusCode,

    // isLoading: isWorkspaceLoading,
    // isFetched: isWorkspaceFetched,
  } = useWorkspacesQuery();

  if (isFetched && !isAuth) {
    return <Link href="/" />;
  }

  return (
    <div className="flex flex-initial flex-col lg:flex-row">
      <div className="flex flex-col my-8 mx-4 p-4 bg-violet-300 rounded-lg">
        <h3 className="font-bold text-xl">Workspace Subscription</h3>
        <ul className="mx-4 my-2 list-disc">
          {user &&
            user.workspaces &&
            user.workspaces.map(workspace => (
              <Link key={workspace._id} href={`/workspace/${workspace._id}`}>
                <li
                  className=" p-2 text-lg hover:underline"
                  key={workspace._id}
                >
                  {workspace.name}
                </li>
              </Link>
            ))}
        </ul>
        <div>Subscribed </div>
        <div>Subscription</div>
      </div>
      <div className="flex flex-1 flex-col lg:w-full my-2 lg:my-8 mx-4 ">
        <div className="bg-green-600 min-h-[10rem] rounded-lg shadow-lg flex justify-center items-center mb-20">
          {isLoading ? (
            <div className="w-28  h-28 relative top-20 rounded-full animate-pulse bg-slate-600" />
          ) : (
            user && (
              <img
                src={`https://ui-avatars.com/api/?name=${`${user.name.firstName}+${user.name.lastName}`}`}
                alt="user"
                className="w-28  h-28 relative top-20 rounded-full"
              />
            )
          )}
        </div>
        <div className="text-lg flex justify-center font-sans font-semibold ">
          {isLoading ? (
            <div className="h-2 w-20 animate-pulse bg-green-700 rounded" />
          ) : (
            user && getFullName(user.name)
          )}
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">General Info</div>
          <div className="p-4 font-sans hover:bg-slate-300 rounded-lg">
            <div className="flex justify-between items-center ">
              <div className="flex items-center">
                <HiOutlineMail className="mr-4" size="2rem" />
                <div className="flex flex-col">
                  <span className="font-extralight">Email</span>
                  <span>
                    {isLoading ? (
                      <div className="h-2 w-20 animate-pulse bg-green-700 rounded" />
                    ) : (
                      user && user.email
                    )}
                  </span>
                </div>
              </div>
              <div className="p-4 hover:bg-purple rounded-xl hover:cursor-pointer">
                <FiEdit3 />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Workspaces</span>
          <div className="p-4 font-sans">
            <button
              onClick={() => {
                // navigate("/createworkspace");
                router.push("/workspace/create");
              }}
              className="p-3 bg-purple rounded-xl"
              type="button"
            >
              Create New Workspace
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {/* {workSpaces} */}
          {workspaces &&
            workspaces.map(workspace => (
              <details
                // eslint-disable-next-line no-underscore-dangle
                key={workspace._id}
                className="group bg-gray-50 rounded-xl"
                open
              >
                <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer  hover:bg-slate-300">
                  <div className="flex justify-between items-center ">
                    <div className="flex items-center">
                      <MdOutlineWorkspaces className="mr-4" size="2rem" />
                      <div className="flex flex-col">
                        <span className="font-extralight">Name</span>
                        <span>{workspace.name}</span>
                      </div>
                    </div>
                  </div>
                  <svg
                    className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="bg-inherit rounded-xl flex items-center justify-between p-4">
                  <span>Status: {workspace.status}</span>
                  {/* Create auto populate doc user */}
                  <div>
                    CreatedBy:{"  "}
                    {workspace.createdBy === user?.id
                      ? "You"
                      : workspace.createdBy}
                  </div>
                  <button
                    disabled
                    title="manage"
                    className="px-4 py-2 bg-purple rounded-lg text-white disabled:cursor-not-allowed disabled:bg-blue-200"
                    type="button"
                  >
                    Manage
                  </button>
                </div>
              </details>
            ))}
        </div>
      </div>
    </div>
  );
}
