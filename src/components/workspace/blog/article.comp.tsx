/* eslint-disable react/no-danger */
/* eslint-disable @next/next/no-img-element */

import { Blog } from "types/blog.type";
import { formatDistanceToNow } from "date-fns";
import sanitize from "sanitize-html";
import { getFullName } from "utils/nav.helper";

export default function Article(props: { key: string; data: Blog }) {
  const { key, data } = props;

  return (
    <article
      key={key}
      className="bg-white p-4 md:p-8 lg:p-10 lg:px-8 border-b border hover:bg-gray-50"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="flex align-middle">
              <img
                className="rounded-full w-10 h-10"
                alt="user"
                src={`https://ui-avatars.com/api/?name=${`${data.createdBy.name.firstName}+${data.createdBy.name.lastName}`}`}
              />
            </span>
            <div className="flex flex-col ">
              <span className="text-sm text-black font-medium animate-underline capitalize">
                {getFullName(data.createdBy.name)}
              </span>
              <span className="text-xs leading-4 text-light">
                {formatDistanceToNow(new Date(data.createdAt))}
              </span>
            </div>
          </div>
          <div>
            <span>
              <button type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z" />
                </svg>
              </button>
            </span>
          </div>
        </div>
        <div className="mt-4 sm:pl-12">
          <div
            className="font-normal text-sm text-black break-words mb-2 bottom-margin-8"
            dangerouslySetInnerHTML={{ __html: sanitize(data.blogDataHTML) }}
          />
        </div>
        <div className="mt-4 w-full flex items-center justify-between sm:pl-12">
          <div className="flex items-center">
            <button type="button" className="flex items-center group mr-8">
              <div className="border border-gray-gray3 bg-white hover:bg-gray-gray2 cursor-pointer rounded-full flex justify-center items-center transition-all ease-in duration-75 lg:w-8 lg:h-8 w-6 h-6 border-none group-hover:bg-green-lighter group-hover:text-green-bright false">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z" />
                </svg>
              </div>
              <span className="pl-1 text-sm font-normal">1</span>
            </button>
            <button type="button" className="flex items-center group ">
              <div className="border border-gray-gray3 bg-white hover:bg-gray-gray2 cursor-pointer rounded-full flex justify-center items-center transition-all ease-in duration-75 lg:w-8 lg:h-8 w-6 h-6 border-none group-hover:bg-green-lighter group-hover:text-green-bright ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13,11H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm4-4H7A1,1,0,0,0,7,9H17a1,1,0,0,0,0-2Zm2-5H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z" />
                </svg>
              </div>
              <span className="pl-1 text-sm font-normal" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
