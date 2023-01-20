import { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query'
import { useSelector } from "react-redux"
import getUserInfo from "../api/getUserInfo"

function useUser(){
  const [name, setName] = useState("")
  const [rooms, setRooms] = useState([])
  const { user } = useSelector((state: any) => state.auth)
  const { data, error, isError, isLoading } = useQuery({queryKey: ["user"], 
  queryFn:()=> getUserInfo(user.token)})
  
  useEffect(()=> {
    if(isError) console.log(error)
    if(data) {
      setName(data.name)
      setRooms(data.rooms)
    }
  }, [user, data, isLoading])

  return { name, rooms, user, isLoading }
}

export default useUser