import { BACKEND_URL } from "config";
import { useQuery } from "react-query";
import { Conversation, Message } from "types/conversation.type";
import instance from "utils/axios";
import { useUserQuery } from "./user.hooks";

export const fetchConversations = async (user: string | undefined) => {
  if (user) {
    const { data, status } = await instance.get(`${BACKEND_URL}/conversation/index`);
    return { data, status };
  }
  return { data: null, status: 501 };
};

export const fetchMessages = async (conversation: string | null) => {
  if (conversation) {
    const { data, status } = await instance.get(`${BACKEND_URL}/conversation/chat/${conversation}`);
    return { data, status };
  }
  return { data: null, status: 501 };
};

export const useConversationQuery = () => {
  const { user, isFetched } = useUserQuery();
  const userId = user?._id;
  const convRes = useQuery<{ data: Conversation[] | null; status: number }>(
    ["conversation", userId],
    () => fetchConversations(userId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!userId,
    }
  );

  console.log("convres", { convRes });
  let conversations: Conversation[] | null = null;
  let statusCode = convRes?.data?.status || 400;
  if (convRes.data && convRes.data.data && convRes.data.status === 200) {
    conversations = convRes.data.data;
    statusCode = 200;
  }
  return {
    conversations,
    statusCode,
    ...convRes,
  };
};

export const useMessagesQuery = (conversation: string | null) => {
  const { user } = useUserQuery();
  const userId = user?._id;
  const mesRes = useQuery<{ data: Message[] | null; status: number }>(
    ["messages", conversation, userId],
    () => fetchMessages(conversation),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!userId,
    }
  );

  console.log("mesRes", { mesRes });
  let messages: Message[] | null = null;
  let statusCode = mesRes?.data?.status || 400;
  if (mesRes.data && mesRes.data.data && mesRes.data.status === 200) {
    messages = mesRes.data.data;
    statusCode = 200;
  }
  return {
    messages,
    statusCode,
    ...mesRes,
  };
};
