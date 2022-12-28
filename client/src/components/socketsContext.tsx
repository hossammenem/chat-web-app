import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";

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
  socket = io("https://chatappbackend-pxhp.onrender.com/", {query: {id: roomId}});
}

const SocketContext = createContext<Context>({
  socket,
  setSender: () => false,
  setMessages: () => false,
  messages: [],
});

function SocketsProvider(props: any) {
  const [sender, setSender] = useState("");
  const [messages, setMessages] = useState([{}]);

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
