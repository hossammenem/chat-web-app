function LatestMessagesViewer({ rooms } : any){

  return (
  <div className="latest">
    <div className="latest-container">
      <h1>Latest messages</h1>
      <div className="latest-viwer">
        {!rooms[0] ?
        <div className="no-result-message">
          <h4>Nothing To Show</h4>
        </div> : 
        <>
          {rooms.map((room: any, index: React.Key)=> 
            <ul className="latest-messages" key={index}>
              <li>
                <h5><a className="chat-name" href={`/room/${room._id}`}>{room.title}</a></h5>
                  <span className="message">{room.messages.slice(-1)[0].sentAt} 
                  <span> . </span> 
                  {room.messages.slice(-1)[0].sender}: {room.messages.slice(-1)[0].body}</span> 
              </li>
            </ul> 
            )}
        </>
        }
      </div>
    </div>
  </div>
  )
}

export default LatestMessagesViewer