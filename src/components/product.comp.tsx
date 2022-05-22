import { useUserQuery } from "hooks/user.hooks";
import { useExploreWorkQuery } from "hooks/workspace.hooks";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { Workspace } from "types/workspace.type";
import instance from "utils/axios";
import { checkUserWorkspace } from "utils/user.helper";

function Modal({
  space,
  modal,
  setModal,
}: {
  space: Workspace | null;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const quertClient = useQueryClient();
  const handleJoin = async () => {
    if (space) {
      try {
        const { data, status, ...restData } = await instance.post(
          "/workspace/join",
          {
            workspace: space._id,
          }
        );
        if (status !== 200) {
          toast.error(data.message || "Could not Join");
          return;
        }
        console.log("data on joinein", data, status, restData);
        toast.success(data.message);
        quertClient.invalidateQueries("user");
      } catch (err) {
        console.log(err, "errir on joining");
        toast.error("Could not Join");
      } finally {
        setModal(false);
      }
    }
  };
  return (
    <label
      htmlFor="my-modal-4"
      className={`modal ${modal ? "modal-open" : ""} cursor-pointer`}
    >
      <label className="modal-box relative" htmlFor="">
        <h3 className="text-xl font-bold">
          {space && space.type === "public" ? "Join " : "Request to Join "}
          &apos;{space && space.name}&apos; Workspace / space
        </h3>
        <div>
          <h4 className="text-lg">Description:</h4>
          <p>{space && space.description}</p>
        </div>
        <div className="flex flex-row ">
          <button
            type="button"
            onClick={handleJoin}
            className="text-white m-2 focus:ring-4 focus:outline-none  bg-blue-600 font-medium hover:bg-blue-700 rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center focus:ring-blue-800 "
          >
            {space && space.type === "public" ? "Join " : "Request to Join"}
          </button>
          <button
            type="button"
            onClick={() => {
              setModal(false);
            }}
            className="text-blue-600 m-2 focus:ring-4 focus:outline-none  bg-orange-400 font-medium hover:bg-blue-700 rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center focus:ring-blue-800 "
          >
            Cancel
          </button>
        </div>
      </label>
    </label>
  );
}

export default function Product() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { workspaces, isFetched } = useExploreWorkQuery();
  const { user } = useUserQuery();
  const [space, setSpace] = useState<Workspace | null>(null);
  return (
    <>
      <div className="bg-slate-200">
        <div className="mx-auto p-4 sm:px-6 lg:px-8 lg:text-center ">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Take a Look
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            what we have to offer
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            a series of places to book
          </p>
        </div>
        <div className="flex flex-col  w-full lg:flex-row justify-center items-start p-4  ">
          <div className="bg-red-300 m-4 m p-4 mx-auto rounded-md w-full text-center sm:p-6 lg:p-4  lg:w-1/5">
            Filters
          </div>
          <div className="w-full ">
            {isFetched &&
              workspaces &&
              workspaces.map((workspace, idx) => {
                const member = checkUserWorkspace(user, workspace._id);
                return (
                  <div
                    // eslint-disable-next-line no-underscore-dangle
                    key={workspace._id}
                    className=" my-4 lg:ml-4 h-32 flex hover:cursor-pointer text-white justify-between bg-gradient-to-r from-purple_dark to-[#5e60ce]  p-2 bg-white  hover:drop-shadow-xl	  border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-4  "
                  >
                    <div className="flex flex-col justify-between">
                      <div className="">{workspace.name}</div>
                      <div>{workspace.description}</div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <div className="">LOGO/Impression/rating</div>
                      <button
                        type="button"
                        onClick={() => {
                          if (member) {
                            router.push(`/workspace/${workspace._id}`);
                          } else {
                            setModal(true);
                            setSpace(workspaces[idx]);
                          }
                        }}
                      >
                        <label
                          htmlFor="my-modal-4"
                          className="btn modal-button text-white  focus:ring-4 focus:outline-none  bg-blue-600 font-medium hover:bg-blue-700 rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center focus:ring-blue-800 "
                        >
                          {member
                            ? "View"
                            : workspace.type === "public"
                            ? "Join"
                            : "Request To Join"}
                        </label>
                      </button>
                      {/* <div>membership cost: Rs {workspace.membership.amount}</div> */}
                      {/* <button
                      className="text-white bg-purple_dark hover:bg-purple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center "
                      type="button"
                      onClick={() => {
                        navigator(`/workspace/${workspace._id}`);
                      }}
                    >
                      {workspace.type === 'public' ? 'Join' : 'Ask to Join'}
                    </button> */}
                      {/* NOTE:add a button here or make the div click event listener */}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Modal space={space} modal={modal} setModal={setModal} />
    </>
  );
}
