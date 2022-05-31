import Loader from "components/loader.comp";
import UserProfile from "components/auth/profile.comp";
import { useUserQuery } from "hooks/user.hooks";
import Head from "next/head";
import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "config";
import { GetServerSidePropsContext } from "next";
import { User } from "types/user.type";
import { getFullName } from "utils/nav.helper";

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { username } = query;
  const data = await axios.get(`${BACKEND_URL}/meta/profile/${username}`);

  return {
    props: {
      meta: { data: data.data, status: data.status },
    },
  };
}

export default function Profile({ meta }: { meta: { data: User; status: number } }) {
  const { data } = meta;
  const fullName = getFullName(data.name);
  return (
    <>
      <Head>
        <title>{`${data && fullName} | membook profile`}</title>
        <meta name="title" content={`${data && fullName} | membook profile`} />
        <meta name="author" content="Hrithik Prasad" />
        <meta name="description" content={`${data && data.username} | membook profile`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${FRONTEND_URL}/profile/${data.username}`} />
        <meta property="og:title" content={`${data && fullName} | membook Profile`} />
        <meta property="og:description" content={`${data && data.username}`} />
        <meta property="og:image" content={data && data.ogImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${FRONTEND_URL}/data/${data.username}`} />
        <meta property="twitter:title" content={`${data && fullName} | membook Profile`} />
        <meta property="twitter:description" content={`${data && data.username}`} />
        <meta property="twitter:image" content={data && data.ogImage} />
      </Head>
      <UserProfile user={data} />
    </>
  );
}
