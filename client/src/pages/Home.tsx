import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getUserInfo from "../api/getUserInfo";
import PreLoader from "../components/PreLoader";
import joinRoom from "../api/joinRoom";
import createRoom from "../api/createRoom";

function Home(){
  const [name, setName] = useState(null);
  const [rooms, setRooms] = useState([]);
  const createTitleRef = useRef("")
  const joinTitleRef = useRef("")
  const navigate = useNavigate()
  const { user } = useSelector( (state: any) => state.auth )

  useEffect(()=> {
    async function fetchUserInfo(){
      const userInfo = await getUserInfo(user.token)
      setName(userInfo.name)
      setRooms(userInfo.rooms)
    }
    fetchUserInfo()
  }, [user])

  async function joinRoomHandler(e: any){
    e.preventDefault()
    const title = joinTitleRef.current.value
    const { _id } = await joinRoom(user.token, title)
    navigate(`/room/${_id}`)
    navigate(0)
  }

  async function createRoomHandler(e: any){
    e.preventDefault()
    const title = createTitleRef.current.value
    const { _id } = await createRoom(user.token, title)
    navigate(`/room/${_id}`)
    navigate(0)
  }

  
  return ( 
  <>
    {!name? <PreLoader /> : null}
    <div className="container">
      <div className="page-content">
        <div className="user">
          <div className="greeting">
            <h1>Welcome, {name}👋</h1>
          </div>
          <div className="latest">
            <div className="latest-container">
              <h1>Latest messages</h1>
              <div className="latest-viwer">
                {!rooms[0]? 
                <div className="no-result-message">
                  <h4>Nothing To Show</h4>
                </div>: (
                  <>
                {rooms.map((room: any, index)=>
                  {room.messages[0] ? 
                  <ul className="latest-messages" key={index}>
                  <li>
                    <h5><a className="chat-name" href={`/room/${room._id}`}>{room.title}</a></h5>
                      <span className="message">{room.messages.slice(-1)[0].sentAt} 
                      <span>.</span> 
                    {room.messages.slice(-1)[0].sender}:  {room.messages.slice(-1)[0].body}</span> 
                  </li>
                </ul> : null}
                )}
              </>)
              }

              </div>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="create-form">
            <h1>Create</h1>
            <form>
              <div className="form-group">
                <input type="text" className="form-control" id='room-name' name='room-name'
                placeholder='Enter Room Name' ref={createTitleRef} />
              </div>
              <button className="btn button" onClick={createRoomHandler}>Create</button>
            </form>
          </div>
          <div className="join-form">
            <h1>Join</h1>
            <form>
              <div className="form-group">
                <input type="text" className="form-control" id='room-name' name='room-name'
                placeholder='Enter Room Name' ref={joinTitleRef} />
              </div>
              <button className="btn button" onClick={joinRoomHandler}>Join</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Home;