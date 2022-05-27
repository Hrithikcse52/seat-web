import LoginCard from "components/auth/login.comp";
import { useUserQuery } from "hooks/user.hooks";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Login() {
  const { isAuth: auth, isFetched } = useUserQuery();
  const router = useRouter();
  if (isFetched && auth) router.push("/");
  return (
    <>
      <Head>
        <title>Login Membook</title>
      </Head>
      <LoginCard />
    </>
  );
}
