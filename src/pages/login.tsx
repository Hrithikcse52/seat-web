import LoginCard from "components/auth/login.comp";
import { useUserQuery } from "hooks/user.hooks";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { isAuth: auth, isFetched } = useUserQuery();
  const router = useRouter();
  if (isFetched && auth) router.push("/feed");
  // useEffect(() => {
  //   if (isFetched && auth) {
  //     console.log("login reirec called");
  //     router.push("/feed");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <>
      <Head>
        <title>Login Membook</title>
      </Head>
      <LoginCard />
    </>
  );
}
