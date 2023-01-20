import { collapseClose } from "../collapse";
import useUser from "../hooks/useUser";

function Collapse(){
  const { rooms } = useUser()

  return (
    <>
    <div className="collapse-div" id="collapse-div">
      <div style={{width: "100%", height: "65px"}}>
        <button onClick={collapseClose}>&lt;</button>
      </div>
      <div className="rooms-container">
      {!rooms[0] ? 
        <div className="no-result-message">
          <h4>Nothing To Show</h4>
        </div> : ( 
          <>
        {rooms.map((room: any, index)=> 
        <ul className="latest-messages" key={index}>
          <li style={{display: "flex", alignItems: "center"}}>
            <h5 style={{marginBottom: "0px"}}><a className="chat-name" href={`/room/${room._id}`}>{room.title}</a></h5>
          </li>
        </ul> 
        )}
        </>)
        }
      </div>
    </div>
    <div className="collapse-wrapper" id="collapse-wrapper"></div>
    </>
  )
}

export default Collapse;