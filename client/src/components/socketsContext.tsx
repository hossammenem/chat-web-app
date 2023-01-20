import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { API_URL } from "../api/config";

interface Context {
  socket: Socket;
  sender?: string;
  setSender: Function;
  messages?: { message: string; time: string; sender: string }[];
  setMessages: Function;
}
var socket: any;
const roomId  = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

if(window.location.pathname.includes("room")){
  socket = io(API_URL, {query: {id: roomId}});
}

const SocketContext = createContext<Context>({
  socket,
  setSender: () => false,
  setMessages: () => false,
  messages: [],
});

function SocketsProvider(props: any) {
  const [sender, setSender] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        sender,
        setSender,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
