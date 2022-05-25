import Loader from "components/loader.comp";
import UserProfile from "components/profile.comp";
import { useUserQuery } from "hooks/user.hooks";
import { useRouter } from "next/router";

export default function Profile() {
  const { isAuth, isFetched, isLoading } = useUserQuery();
  const router = useRouter();

  if (isFetched && !isAuth) router.push("/", undefined, { shallow: true });
  if (isFetched && isAuth) return <UserProfile />;
  return <Loader />;
}
