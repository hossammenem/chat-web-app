import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import getRoomInfo from "../api/getRoomInfo"

export interface Room {
  title: string
}

export interface IMessage {
  body: String
  sentAt: String
  sender: String
}

function useRoom(roomId: String | undefined){
  const [room, setRoom] = useState<Room>({title: ""})
  const [messages, setMessages] = useState<IMessage[]>([])
  const { user } = useSelector((state: any) => state.auth)
  const { data, error, isError, isLoading } = useQuery({queryKey: ["room"], 
  queryFn:()=> getRoomInfo(user.token, roomId)})

  useEffect(() => {
    if(isError) console.log(error)
    if(data) {
      setRoom(data)
      setMessages(data.messages)
    }
  }, [user, data, isLoading])
  
  return { room , messages, setMessages, isLoading }
}

export default useRoom