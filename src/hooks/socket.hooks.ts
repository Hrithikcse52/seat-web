import { BACKEND_URL } from "config";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useUserQuery } from "./user.hooks";

export const useMsgSocket = () => {
  const { user, isAuth, isFetched } = useUserQuery();
  const [msgSoc, setMsgSoc] = useState<Socket>();
  useEffect(() => {
    if (user && !msgSoc) {
      const socket = io(`${BACKEND_URL}/msg`, {
        transports: ["websocket"],
        forceNew: false,
        query: {
          username: user.username,
          id: user._id,
        },
      });
      console.log("socket", socket);
      socket.on("connect_error", err => {
        console.log("socket not worrking", err);
      });
      socket.on("connect", (...args) => {
        console.log("socket connected", args);
        setMsgSoc(socket);
      });
    }
    // return () => {
    //   console.log("clean up");
    //   if (msgSoc) {
    //     msgSoc.disconnect();
    //     msgSoc.close();
    //     setMsgSoc(undefined);
    //   }
    // };
  }, []);

  return { msgSoc };
};

export const hel = "";
