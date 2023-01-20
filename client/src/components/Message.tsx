function Message({ message, name }: any){

  return (
    <div className={`message ${message.sender == name? "me": ""}`}>
      <div className="sender">
        <p>{message.sender == name? "you": message.sender}</p>
      </div>
      <div className="message-body">
        {message.body}
      </div>
      <div className="send-date">
        <p>{message.sentAt}</p>
      </div>
    </div>
  )
}

export default Message