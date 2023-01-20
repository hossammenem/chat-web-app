export default function pinScrollToBottom(){
  const roomBody = document.querySelector('#room-body') ?? null;
  if(roomBody){
    roomBody.scrollTop = roomBody.scrollHeight - roomBody.clientHeight;
  }
}