import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useUser from "../hooks/useUser";
import useRoom, { IMessage } from "../hooks/useRoom";
import { useSockets } from "../components/socketsContext";
import PreLoader from "../components/PreLoader";
import Message from "../components/Message";
import pinScrollToBottom from "../pinScrollToBottom";
import handleSendMessage from "../handleSendMessage";

function ChatRoom(){
  const { roomId } = useParams()
  const { room, messages, setMessages, isLoading } = useRoom(roomId)
  const { name } = useUser()
  const { socket } = useSockets()
  const messageRef = useRef("")

  useDocumentTitle(room.title)  

  useEffect(()=> pinScrollToBottom())
  
  socket.on("join", (id: any) => {
    console.log(id)
  })
  
  useEffect(() => {
    socket.on("server-send-message", ({ body, sender, sentAt }: any) => {
      setMessages((messages: IMessage[]) => [...messages, { sender, body, sentAt }]);
    });
  }, [socket]);
  
  if(isLoading) return <PreLoader />

  return (
    <>
    <div className="room-container">
      <div className="room-title">
        <h3>{room.title}</h3>
      </div>
      <div className="room-body" id="room-body">
      {messages.map((message: IMessage, index: React.Key)=> 
        <Message message={message} name={name} key={index} />
      )}
      </div>
      <div className="input-div">
        <input type="text" ref={messageRef} />
        <button onClick={
          ()=>handleSendMessage({socket, messageRef, messages, setMessages, roomId, name})}>Send</button>
      </div>
    </div>
    </>
  )
}

export default ChatRoom;