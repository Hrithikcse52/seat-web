import axios from "axios";
import Article from "components/workspace/blog/article.comp";
import WorkSpaceHeader from "components/workspace/header.comp";
import { BACKEND_URL, FRONTEND_URL } from "config";
import { useBlogQuery } from "hooks/blog.hooks";
import { useGetWorkspace, WorkspaceRes } from "hooks/workspace.hooks";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { withRouter } from "next/router";

import { getFullName } from "utils/nav.helper";

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { id } = query;
  const data = await axios.get(`${BACKEND_URL}/meta/workspace/${id}`);

  return {
    props: {
      data: { data: data.data, status: data.status },
    },
  };
}

function WorkspaceDetails({ router, data }: { router: any; data: WorkspaceRes }) {
  console.log("data", data);
  const { id } = router.query;
  const { workspace, isLoading } = useGetWorkspace(id as string, data);
  const { blogs, statusCode, isFetched } = useBlogQuery(id);
  console.log("🚀 ~ file: [id].tsx ~ line 34 ~ blogs, isFetched", blogs, statusCode, isFetched);

  console.log("workspace", data, isLoading, workspace);
  return (
    <>
      <Head>
        <title>{`${workspace && workspace.name} | Membook Profile`}</title>

        <meta name="title" content={`${workspace && workspace.name} | Membook Profile`} />
        <meta name="author" content="Hrithik Prasad" />

        <meta name="description" content={`${workspace && workspace.description}`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${FRONTEND_URL}/workspace/${id}`} />
        <meta property="og:title" content={`${workspace && workspace.name} | Membook Profile`} />
        <meta property="og:description" content={`${workspace && workspace.description}`} />
        <meta
          property="og:image"
          content="https://wxmwctiasizeoqlubrjn.supabase.co/storage/v1/object/public/seat/carousel/seat2.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${FRONTEND_URL}/workspace/${id}`} />
        <meta property="twitter:title" content={`${workspace && workspace.name} | Membook Profile`} />
        <meta property="twitter:description" content={`${workspace && workspace.description}`} />
        <meta
          property="twitter:image"
          content="https://wxmwctiasizeoqlubrjn.supabase.co/storage/v1/object/public/seat/carousel/seat2.jpg"
        />
      </Head>
      <div className="flex flex-initial  flex-col lg:flex-row">
        <div className="flex w-1/5 flex-col my-8 mx-4 p-4 bg-violet-300 rounded-lg">
          <div>Admins</div>
          <ol>
            {workspace &&
              workspace.permission.map(admins => (
                <li key={admins.role}>{typeof admins.user === "object" ? getFullName(admins.user.name) : ""}</li>
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
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://ui-avatars.com/api/?name=${`${workspace.name}`}`}
                  alt="user"
                  className="w-28  h-28 relative top-20 rounded-full"
                />
              )
            )}
          </div>
          <div className="text-lg flex justify-center font-sans font-semibold ">
            {isLoading ? <div className="h-2 w-20 animate-pulse bg-green-700 rounded" /> : workspace && workspace.name}
          </div>
          <WorkSpaceHeader workspace={id as string} />
          <div>{blogs && blogs.map(blog => <Article data={blog} key={blog._id} />)}</div>
        </div>
      </div>
    </>
  );
}

export default withRouter(WorkspaceDetails);
