import { Avatar, Skeleton } from "@mantine/core";
import { useTrendingPosts } from "hooks/algo.hooks";
import sanitize from "sanitize-html";
import { getFullName } from "utils/nav.helper";

export default function TrendingPosts() {
  const { trends, isFetched, isLoading } = useTrendingPosts();
  console.log({ trends });
  return (
    <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
      <h3 className="mt-6 w-full font-semibold">Trending</h3>
      {isLoading &&
        !isFetched &&
        ["a", "b", "c"].map(loop => (
          <div key={loop} className="flex w-full py-4 border-b border-gray-300">
            <Skeleton height={50} circle mb="xl" />

            <div className="flex flex-col flex-grow ml-2">
              <div className="flex flex-col text-sm">
                <span className="font-semibold">
                  <Skeleton height={8} mt={6} radius="xl" />
                </span>
                <span className="">
                  <Skeleton height={8} mt={6} radius="xl" />
                </span>
              </div>
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
            </div>
          </div>
        ))}
      {isFetched &&
        trends &&
        trends.map(trend => (
          <div key={trend._id} className="flex w-full py-4 border-b border-gray-300">
            <Avatar
              className="flex-shrink-0 w-12 h-12 rounded-full"
              src={trend.createdBy.profileImg}
              alt={getFullName(trend.createdBy.name)}
            >
              {trend.createdBy.name.firstName[0] + trend.createdBy.name.lastName[0]}
            </Avatar>
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{getFullName(trend.createdBy.name)}</span>
                <span className="">@{trend.createdBy.username}</span>
              </div>
              <div
                className="font-normal mr-1 text-sm text-black break-words mb-2 bottom-margin-8"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: sanitize(trend.postDataHTML) }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
