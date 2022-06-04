import { useUserQuery } from "hooks/user.hooks";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
import { useQueryClient } from "react-query";
import { UrlObject } from "url";
import instance from "utils/axios";

const initialState = {
  name: "",
  description: "",
  location: "",
  // currency: 'INR',
  // amount: '',
  type: "public",
};

export default function CreateWorkspace() {
  const [data, setData] = useState(initialState);
  const { isAuth, isFetched } = useUserQuery();
  const queryClient = useQueryClient();
  const router = useRouter();

  const navigate = (path: string | UrlObject) => router.push(path);
  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name: data.name,
      description: data.description,
      location: data.location,
      type: data.type,
      // membership: {
      //   currency: data.currency,
      //   amount: data.amount,
      // },
    };
    const { status } = await instance.post("/workspace", payload);
    if (status !== 200) {
      console.log("something went wrong");
    } else {
      await queryClient.refetchQueries("managed_workspaces");
      navigate("/profile");
    }
  };
  if (isFetched && !isAuth) {
    console.log("retuern ");
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-col my-8 mx-4 p-4 bg-violet-300 rounded-lg">
        <div className="whitespace-pre-wrap">Things to keep in mind while creating workspace</div>
        <br />
        <div>Subscribed </div>
        <div>Subscription</div>
      </div>
      <div className="flex  flex-col lg:w-full my-2 lg:my-8 mx-4 ">
        <div className="flex flex-col">
          <div className="font-semibold text-xl mb-12">Create New Workspace</div>
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="flex m-4 ">
                <label htmlFor="name" className="flex w-full flex-col items-start">
                  Name
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none  focus:border-purple block w-full p-2.5 "
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                  />
                </label>
              </div>
              <div className="flex m-4 ">
                <label htmlFor="desc" className="flex w-full flex-col items-start">
                  Description
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none  focus:border-purple block w-full p-2.5 "
                    id="desc"
                    name="description"
                    onChange={handleChange}
                    value={data.description}
                  />
                </label>
              </div>
              <div className="flex m-4 ">
                <label htmlFor="loc" className="flex w-full flex-col items-start">
                  Location
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none  focus:border-purple block w-full p-2.5 "
                    id="loc"
                    value={data.location}
                    onChange={handleChange}
                    name="location"
                  />
                </label>
              </div>
              <div className="flex m-4 ">
                {/* <label
                    htmlFor="mem"
                    className="flex items-center w-full justify-between"
                  >
                    Membership
                    <input
                      className="bg-gray-50 mx-4 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none  focus:border-purple block w-full p-2.5 "
                      id="mem"
                      name="amount"
                      onChange={handleChange}
                      value={data.amount}
                      type="number"
                    />
                  </label> */}
                <label htmlFor="type" className="flex flex-col items-start w-full justify-between">
                  {/* TODO://Change this to a radio button */}
                  Type
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none  focus:border-purple block w-full p-2.5 "
                    id="type"
                    onChange={handleChange}
                    name="type"
                    defaultValue={data.type}
                    value={data.type}
                  >
                    <option value="public">Public</option>
                    <option value="invite_only">Invite Only</option>
                    <option value="approval_based">Approval Based</option>
                  </select>
                </label>
                {/* <label
                    htmlFor="name"
                    className="flex items-center w-full justify-between"
                  >
                    Currency
                    <select
                      className="bg-gray-50 mx-4 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none  focus:border-purple block w-full p-2.5 "
                      id="name"
                      onChange={handleChange}
                      name="currency"
                      defaultValue={data.currency}
                      value={data.currency}
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                    </select>
                  </label> */}
              </div>
              <div className="flex">
                <button className="px-4 py-2 ml-auto my-4 rounded-xl bg-purple" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
