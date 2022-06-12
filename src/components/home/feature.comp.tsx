import { projectDesc } from "config";
import Link from "next/link";

export default function Featurepage() {
  return (
    <>
      <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
        <div className="text-center space-y-4">
          <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
            Troll friends here
            <span className="text-indigo-600">, Membook </span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">{projectDesc.desc}</p>
        </div>
        <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
          <Link href="/feed">
            <a className="px-10 py-3.5 w-full bg-indigo-600 text-white text-center rounded-md shadow-md block sm:w-auto">
              Join Membook
            </a>
          </Link>
        </div>
      </section>
      <div className="py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Social Fun</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A Content Sharing platform!
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              share posts, join groups, make fun of friends...
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-device-desktop-analytics"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <rect x="3" y="4" width="18" height="12" rx="1" />
                      <path d="M7 20h10" />
                      <path d="M9 16v4" />
                      <path d="M15 16v4" />
                      <path d="M9 12v-4" />
                      <path d="M12 12v-1" />
                      <path d="M15 12v-2" />
                      <path d="M12 12v-1" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Profile Analytics</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  UnderStanding your profile via feedback and performance on feeds
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Discover</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">Discover ideas and share ideas at same place.</dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Get FeedBack</p>
                </dt>

                <dd className="mt-2 ml-16 text-base text-gray-500">Feedbacks are crutical on one&apos;s growth</dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-network"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="9" r="6" />
                      <path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6" />
                      <path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6" />
                      <path d="M6 9h12" />
                      <path d="M3 19h7" />
                      <path d="M14 19h7" />
                      <circle cx="12" cy="19" r="2" />
                      <path d="M12 15v2" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Meet more people</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  By meeting new people, you expose yourself to new knowledge.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
