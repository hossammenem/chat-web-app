import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query'
import joinRoom from "../api/joinRoom";
import createRoom from "../api/createRoom";

function Form({ token }: any){
  const navigate = useNavigate()
  const createTitleRef = useRef("")
  const joinTitleRef = useRef("")

  const createRoomMutation = useMutation({
    mutationFn: ({token, title}: any)=> createRoom(token, title), 
    onSuccess: ({ _id })=>{
        navigate(`/room/${_id}`)
        navigate(0)
    }})

  const joinRoomMutation = useMutation({
    mutationFn: ({token, title}: any)=> joinRoom(token, title), 
    onSuccess: ({ _id })=>{
        navigate(`/room/${_id}`)
        navigate(0)
    }})
  
  async function joinRoomHandler(e: any){
    e.preventDefault()
    const title = joinTitleRef.current.value
    joinRoomMutation.mutate(({ token, title }))
  }
  
  async function createRoomHandler(e: any){
    e.preventDefault()
    const title = createTitleRef.current.value
    createRoomMutation.mutate(({ token, title }))
  }

  return (
  <div className="forms">
    <div className="create-form">
      <h1>Create</h1>
      <form>
        <div className="form-group">
          <input type="text" className="form-control" id='room-name' name='room-name'
          placeholder='Enter Room Name' ref={createTitleRef} />
        </div>
        <button className="btn button" onClick={createRoomHandler}  
        disabled={createRoomMutation.isLoading || joinRoomMutation.isLoading}>
          {createRoomMutation.isLoading ? "loading...": "Create"}</button>
      </form>
    </div>
    <div className="join-form">
      <h1>Join</h1>
      <form>
        <div className="form-group">
          <input type="text" className="form-control" id='room-name' name='room-name'
          placeholder='Enter Room Name' ref={joinTitleRef} />
        </div>
        <button className="btn button" onClick={joinRoomHandler} 
        disabled={createRoomMutation.isLoading || joinRoomMutation.isLoading}>
          {joinRoomMutation.isLoading ? "Loading..." : "Join"}</button>
      </form>
    </div>
  </div>
  )

}

export default Form