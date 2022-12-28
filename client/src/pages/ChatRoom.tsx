import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { pinScrollToBottom } from "../pinScrollToBottom";
import { useSockets } from "../components/socketsContext";
import getRoomInfo from "../api/getRoomInfo";
import { useSelector } from "react-redux";
import PreLoader from "../components/PreLoader";
import getUserInfo from "../api/getUserInfo";

// /room/63a70f324ec5723c3d01082a
function ChatRoom(){
  const [room, setRoom] = useState({
    title: "",
    members: [],
    messages: [],
  });
  const [messages, setMessages] = useState([{
    body: "",
    sender: "",
    sentAt: "",
  }])
  const [obj, setObj] = useState("");
  const messageRef = useRef("");
  const { roomId } = useParams()
  const { user } = useSelector( (state: any) => state.auth )
  const { socket } = useSockets();

  useEffect(()=> pinScrollToBottom())

  useEffect(()=> {
    async function fetchUserInfo(){
      const userInfo = await getUserInfo(user.token)
      setObj(userInfo.name)
    }
    fetchUserInfo()
  }, [user])

  useEffect(()=> {
    async function fetchRoom(){
      const room = await getRoomInfo(user.token, roomId)
      setRoom(room)
      setMessages(room.messages)
    } fetchRoom()
  }, [])

  socket.on("join", (id: any) => {
    console.log(id)
  })

  useEffect(() => {
    socket.on("server-send-message", ({ body, sender, sentAt }: any) => {
      setMessages((messages) => [...messages, { sender, body, sentAt }]);
    });
  }, [socket]);

  function handleSendMessage(){
    const body = messageRef.current.value;

    if (!String(body).trim()) {
      return;
    }

    socket.emit("client-send-message", { roomId, body, sender:obj });

    const date = new Date();

    setMessages([
      ...messages,
      {
        sender:obj,
        body,
        sentAt: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    messageRef.current.value = "";
  }

  return (
    <>
    <div className="room-container">
      <div className="room-title">
        <h3>{room.title}</h3>
      </div>
      <div className="room-body" id="room-body">
      {messages.map((message: any, index)=> 
        <div className={`message ${message.sender == obj? "me": ""}`} key={index}>
          <div className="sender">
            <p>{message.sender == obj? "you": message.sender}</p>
          </div>
          <div className="message-body">
            {message.body}
          </div>
          <div className="send-date">
            <p>{message.sentAt}</p>
          </div>
        </div>
      )}
      </div>
      <div className="input-div">
        <input type="text" ref={messageRef} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
    </>
  )
}

export default ChatRoom;