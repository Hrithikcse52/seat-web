/* eslint-disable @next/next/no-img-element */
import { useUserQuery } from "hooks/user.hooks";
import { useWorkspacesQuery } from "hooks/workspace.hooks";
import Link from "next/link";
import { getFullName } from "utils/nav.helper";
import { HiOutlineMail } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { Modal, Group } from "@mantine/core";
import { MdOutlineWorkspaces } from "react-icons/md";
import Loader from "components/loader.comp";
import { useRouter } from "next/router";
import Button from "elements/button";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { User } from "types/user.type";
import instance from "utils/axios";

function EditProfileModal({
  edit,
  user,
  setEdit,
}: {
  edit: boolean;
  user: User;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const initialData = {
    firstName: user.name.firstName,
    lastName: user.name.lastName,
    email: user.email,
    image: null,
  };
  const [modalData, setModalData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    image: null | File;
  }>(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("handle change", e.target.type);
    if (e.target.files && e.target.type === "file") {
      setModalData({ ...modalData, image: e.target.files[0] });
    } else {
      setModalData({
        ...modalData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log("final Data", modalData);
    e.preventDefault();
    const formData = new FormData();
    if (modalData.image) formData.append("image", modalData.image);
    formData.append("firstName", modalData.firstName);
    formData.append("lastName", modalData.lastName);
    formData.append("email", modalData.email);
    console.log("formdata", formData, formData.entries());
    try {
      const { data, status } = await instance.post("/user/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(
        "🚀 ~ file: profile.comp.tsx ~ line 74 ~ handleSubmit ~ data, status",
        data,
        status
      );
    } catch (error) {
      console.log("error", JSON.stringify(error));
    }
  };
  return (
    <Modal
      // withCloseButton={false}
      centered
      opened={edit}
      title={
        <div className="font-sans text-xl ml-4 font-medium text-gray-500">
          Edit Profile
        </div>
      }
      onClose={() => {
        setEdit(false);
        setModalData({
          firstName: user.name.firstName,
          lastName: user.name.lastName,
          email: user.email,
          image: null,
        });
      }}
    >
      <div className="px-4">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex gap-2">
              <label
                className="relative block p-3 border-2 border-gray-200 rounded-lg"
                htmlFor="name"
              >
                <input
                  className="w-full px-0 pt-5 pb-0 text-sm placeholder-transparent border-none outline-none peer"
                  id="name"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={modalData.firstName}
                  onChange={handleChange}
                  // onChange={e =>
                  //   setModalData({ ...modalData, firstName: e.target.value })
                  // }
                />
                <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
                  FirstName
                </span>
              </label>

              <label
                className="relative block p-3 border-2 border-gray-200 rounded-lg"
                htmlFor="lastName"
              >
                <input
                  className="w-full px-0 pt-5 pb-0 text-sm placeholder-transparent border-none outline-none peer"
                  id="lastName"
                  type="text"
                  placeholder="lastName"
                  name="lastName"
                  value={modalData.lastName}
                  onChange={handleChange}
                />
                <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
                  LastName
                </span>
              </label>
            </div>
          </div>
          <div className="mt-2">
            <label
              className="relative block p-3 border-2 border-gray-200 rounded-lg"
              htmlFor="email"
            >
              <input
                className="w-full px-0 pt-5 pb-0 text-sm placeholder-transparent border-none outline-none peer"
                id="email"
                type="text"
                name="email"
                value={modalData.email}
                onChange={e =>
                  setModalData({ ...modalData, email: e.target.value })
                }
                placeholder="Name"
              />
              <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
                Email
              </span>
            </label>
          </div>
          <div className="mt-2">
            <label
              className="block mb-2 text-sm font-medium border-gray-200 text-gray-900 dark:text-gray-300"
              htmlFor="small_size"
            >
              Small file input
              <input
                className="block mb-5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer  focus:outline-none w-full px-0 pt-5 pb-0 text-sm placeholder-transparent border-none outline-none peer"
                id="small_size"
                type="file"
                multiple={false}
                onChange={handleChange}
              />
            </label>
            {/* image preview */}
            <div className="flex justify-center items-center">
              {modalData.image && (
                <img
                  className="w-28 h-28"
                  src={URL.createObjectURL(modalData.image)}
                  alt="preview"
                />
              )}
            </div>
          </div>
          <div className="w-full flex items-end gap-4">
            <Button
              type="submit"
              disabled={
                initialData.firstName === modalData.firstName &&
                initialData.lastName === modalData.lastName &&
                initialData.email === modalData.email &&
                initialData.image === modalData.image
              }
              className="ml-auto mt-4"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default function UserProfile() {
  const { user, isAuth, isLoading, isFetched } = useUserQuery();
  const router = useRouter();
  const [edit, setEdit] = useState(false);

  const {
    workspaces,
    isFetched: isWorkspaceFetched,
    isLoading: isWorkLoading,
  } = useWorkspacesQuery();

  return (
    <div className="flex flex-initial flex-col lg:flex-row">
      <div className="flex flex-col my-8 mx-4 p-4 bg-violet-300 rounded-lg">
        <h3 className="font-bold text-xl">Workspace Subscription</h3>
        <ul className="mx-4 my-2 list-disc">
          {user &&
            user.workspaces &&
            user.workspaces.map(workspace => (
              <Link key={workspace._id} href={`/workspace/${workspace._id}`}>
                <li
                  className=" p-2 text-lg hover:underline"
                  key={workspace._id}
                >
                  {workspace.name}
                </li>
              </Link>
            ))}
        </ul>
        <div>Subscribed </div>
        <div>Subscription</div>
      </div>
      <div className="flex flex-1 flex-col lg:w-full my-2 lg:my-8 mx-4 ">
        <div className="bg-green-600 min-h-[10rem] rounded-lg shadow-lg flex justify-center items-center mb-20">
          {isLoading ? (
            <div className="w-28  h-28 relative top-20 rounded-full animate-pulse bg-slate-600" />
          ) : (
            user && (
              <img
                src={`https://ui-avatars.com/api/?name=${`${user.name.firstName}+${user.name.lastName}`}`}
                alt="user"
                className="w-28  h-28 relative top-20 rounded-full"
              />
            )
          )}
        </div>
        <div className="text-lg flex justify-center font-sans font-semibold ">
          {isLoading ? (
            <div className="h-2 w-20 animate-pulse bg-green-700 rounded" />
          ) : (
            user && getFullName(user.name)
          )}
        </div>
        <div className="flex flex-col">
          <div className="font-semibold flex justify-between items-center">
            <span>General Info</span>
            <button type="button" onClick={() => setEdit(true)}>
              <div
                className="p-4 mr-4 hover:bg-purple outline-none rounded-xl tooltip hover:cursor-pointer"
                data-tip="Edit Profile"
              >
                <FiEdit3 />
              </div>
            </button>
          </div>

          <div className="p-4 font-sans hover:bg-slate-300 rounded-lg">
            <div className="flex justify-between items-center ">
              <div className="flex items-center">
                <HiOutlineMail className="mr-4" size="2rem" />
                <div className="flex flex-col">
                  <span className="font-extralight">Email</span>
                  <span>
                    {isLoading ? (
                      <div className="h-2 w-20 animate-pulse bg-green-700 rounded" />
                    ) : (
                      user && user.email
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Workspaces</span>
          <div className="p-4 font-sans">
            <button
              onClick={() => {
                router.push("/workspace/create");
              }}
              className="p-3 bg-purple rounded-xl"
              type="button"
            >
              Create New Workspace
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {/* {workSpaces} */}
          {isWorkspaceFetched &&
            workspaces &&
            workspaces.map(workspace => (
              <details
                // eslint-disable-next-line no-underscore-dangle
                key={workspace._id}
                className="group bg-gray-50 rounded-xl"
                open
              >
                <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer  hover:bg-slate-300">
                  <div className="flex justify-between items-center ">
                    <div className="flex items-center">
                      <MdOutlineWorkspaces className="mr-4" size="2rem" />
                      <div className="flex flex-col">
                        <span className="font-extralight">Name</span>
                        <span>{workspace.name}</span>
                      </div>
                    </div>
                  </div>
                  <svg
                    className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="bg-inherit rounded-xl flex items-center justify-between p-4">
                  <span>Status: {workspace.status}</span>
                  {/* Create auto populate doc user */}
                  <div>
                    CreatedBy:{"  "}
                    {workspace.createdBy === user?.id
                      ? "You"
                      : workspace.createdBy}
                  </div>
                  <button
                    disabled
                    title="manage"
                    className="px-4 py-2 bg-purple rounded-lg text-white disabled:cursor-not-allowed disabled:bg-blue-200"
                    type="button"
                  >
                    Manage
                  </button>
                </div>
              </details>
            ))}
          {isWorkLoading && !isWorkspaceFetched && <Loader />}
        </div>
      </div>
      {isAuth && user && (
        <EditProfileModal edit={edit} user={user} setEdit={setEdit} />
      )}
    </div>
  );
}