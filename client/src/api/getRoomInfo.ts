import axios from "axios";
import { API_URL } from "./config";

export default async function getRoomInfo(token: String, roomId: String | undefined) {
  const response = await axios(`${API_URL}/room/${roomId}`, {
    headers : {
      authorization: `Bearer ${token}`
    }
  })
  return response.data
}