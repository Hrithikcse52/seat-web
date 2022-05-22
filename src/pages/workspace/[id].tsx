import WorkSpaceHeader from "components/workspace/header.comp";
import { FRONTEND_URL } from "config";
import {
  fetchWorkspace,
  useGetWorkspace,
  WorkspaceRes,
} from "hooks/workspace.hooks";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { useRouter, withRouter } from "next/router";
import instance from "utils/axios";
import { getFullName } from "utils/nav.helper";

export async function getServerSideProps({
  req,
  query,
}: GetServerSidePropsContext) {
  console.log("req", query);
  const { id } = query;
  const { data, status } = await instance.get(`/workspace/${id}`, {
    headers: {
      "x-access-token": req.cookies.access,
      "x-refresh-token": req.cookies.refresh,
    },
  });

  return {
    props: {
      data: { data, status },
    },
  };
}

function WorkspaceDetails({ router, data }: { router: any; data: any }) {
  console.log("data", data);
  const { id } = router.query;
  const { workspace, isLoading } = useGetWorkspace(id as string, data);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Find all the best quality" />
        <link rel="canonical" href={`${FRONTEND_URL}/workspace/${id}`} />
        <meta property="og:url" content={`${FRONTEND_URL}/workspace/${id}`} />
        <meta
          name="description"
          content={`${workspace && workspace.description}`}
        />
        <meta
          name="keywords"
          content="JavaScript, Entrepreneur, Product Management"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${workspace && workspace.name} | mempay profile `}
        />
        <meta
          property="og:image"
          content={`https://ui-avatars.com/api/?name=${`${
            workspace && workspace.name
          }`}`}
        />
        <meta property="og:description" content="Full stack developer" />
        <meta property="og:site_name" content="Peerlist" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Seat" />
        <meta name="twitter:creator" content="@HrithikPrasad19" />
        <meta
          name="twitter:title"
          content={`${workspace && workspace.name}&#x27;s mempay profile`}
        />
        <meta
          name="twitter:description"
          content={`${workspace && workspace.description}`}
        />
        <meta
          name="twitter:image:src"
          content={`https://ui-avatars.com/api/?name=${`${
            workspace && workspace.name
          }`}`}
        />
        <title>{isLoading ? "Loading..." : workspace && workspace.name}</title>
      </Head>
      <div className="flex flex-initial  flex-col lg:flex-row">
        <div className="flex w-1/5 flex-col my-8 mx-4 p-4 bg-violet-300 rounded-lg">
          <div>Admins</div>
          <ol>
            {workspace &&
              workspace.permission.map(admins => (
                <li key={admins.role}>
                  {typeof admins.user === "object"
                    ? getFullName(admins.user.name)
                    : ""}
                </li>
              ))}
          </ol>
          <div>Description</div>
          {workspace && workspace.description}
          <div>
            <p>Type</p>
            {workspace && workspace.type}
          </div>
          <div>
            <p>Address</p>
            {workspace && workspace.address}
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:w-full my-2 lg:my-8 mx-4 ">
          <div className="bg-green-600 min-h-[10rem] rounded-lg shadow-lg flex justify-center items-center mb-20">
            {isLoading ? (
              <div className="w-28  h-28 relative top-20 rounded-full animate-pulse bg-slate-600" />
            ) : (
              workspace && (
                <img
                  src={`https://ui-avatars.com/api/?name=${`${workspace.name}`}`}
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
              workspace && workspace.name
            )}
          </div>
          <WorkSpaceHeader />

          {/* <div className="flex flex-col">
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
                        workspace && workspace.address
                      )}
                    </span>
                  </div>
                </div>
                <div className="p-4 hover:bg-purple rounded-xl hover:cursor-pointer">
                  <FiEdit3 />
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="flex flex-col">
            <span className="font-semibold">Workspaces</span>
            <div className="p-4 font-sans">
              <button
                onClick={() => {
                  navigate('/createworkspace');
                }}
                className="p-3 bg-purple rounded-xl"
                type="button"
              >
                Create New Workspace
              </button>
            </div>
          </div> */}
          {/* {workSpaces} */}
          {/* 
          <div className="space-y-4">
            {workspaces &&
              workspaces.map((workspace) => (
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
                    <div>
                      CreatedBy:{'  '}
                      {workspace.createdBy === user?.id
                        ? 'You'
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
              */}
        </div>
      </div>
    </>
  );
}

export default withRouter(WorkspaceDetails);
