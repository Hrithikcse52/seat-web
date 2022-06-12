import Link from "next/link";
import { Avatar } from "@mantine/core";

import { User } from "types/user.type";
import { getFullName } from "utils/nav.helper";

export default function JoinNetwork({ users }: { users: User[] }) {
  console.log(users);
  return (
    <div className="xl:max-w-screen md:w-5/6 mx-auto w-full pt-28 pb-16 mt-2  px-4 md:px-0">
      <div className="mx-auto text-center mb-16">
        <h1 className="w-full font-inter font-black leading-120 text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6">
          Join the resource full network <br />
          of membook
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {users &&
          users.map(user => (
            <div key={user._id}>
              <Link href={`/profile/${user.username}`} passHref>
                <a className="border  border-primary rounded-lg p-4 flex hover:bg-gray-gray1 hover:border-gray-gray3 cursor-pointer h-full">
                  <div className="flex ">
                    <Avatar
                      className="flex-shrink-0 w-12 h-12 rounded-full"
                      src={user.profileImg}
                      alt={getFullName(user.name)}
                    >
                      {user.name.firstName + user.name.lastName}
                    </Avatar>
                    <div className="ml-2">
                      <div className="flex items-center mb-0.5">
                        <h3 className="text-sm  font-semibold">{getFullName(user.name)}</h3>
                      </div>
                      <p className="text-gray text-xs">@{user.username}</p>
                      {/* <p className="text-gray text-xs">
                      Empowering People | Web3 🦄 | Flutter | 100K+ Youtube | 50K+ Linkedin | 25K+ Twitter | Google Dev
                      Expert | Exploring Nex
                    </p> */}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link href="/register" passHref>
          <a className="py-4 px-8 border font-medium leading-1 text-white text-center tracking-wider transition-all ease-in duration-75 outline-none focus:outline-none disabled:opacity-50 text-sm bg-[#83c5be] bg-gray-gray9 hover:bg-gray-gray8 rounded-lg flex items-center">
            <h1 className="text-lg font-semibold mr-4 py-1">Join Membook</h1>
            <div className="border border-gray-gray3 bg-white hover:bg-gray-gray2 w-8 h-8 cursor-pointer rounded-full flex justify-center items-center transition-all ease-in duration-75 text-gray-gray8 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black">
                <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" />
              </svg>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
