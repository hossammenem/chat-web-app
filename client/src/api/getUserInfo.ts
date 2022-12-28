import axios from "axios";
import { API_URL } from "./config";

export default async function getUserInfo(token: String) {
  const response = await axios(`${API_URL}/userInfo`, {
    headers : {
      authorization: `Bearer ${token}`
    }
  })
  return response.data
}