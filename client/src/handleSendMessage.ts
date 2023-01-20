export default function handleSendMessage({socket, messageRef, setMessages, messages, roomId, name}: any){
  const body = messageRef.current.value;

  if (!String(body).trim()) {
    return;
  }

  socket.emit("client-send-message", { roomId, body, sender:name });

  const date = new Date();

  setMessages([
    ...messages,
    {
      sender:name,
      body,
      sentAt: `${date.getHours()}:${date.getMinutes()}`,
    },
  ]);

  messageRef.current.value = "";
}