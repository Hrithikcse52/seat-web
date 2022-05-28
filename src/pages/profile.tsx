import Loader from "components/loader.comp";
import UserProfile from "components/auth/profile.comp";
import { useUserQuery } from "hooks/user.hooks";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Profile() {
  const { isAuth, isFetched } = useUserQuery();
  const router = useRouter();

  if (isFetched && !isAuth) router.push("/", undefined, { shallow: true });
  if (isFetched && isAuth) return <UserProfile />;
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <Loader />
    </>
  );
}
