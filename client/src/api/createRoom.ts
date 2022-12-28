import { API_URL } from "./config";

export default async function createRoom(token: String, title: String) {
  const response = await fetch(`${API_URL}/create-room`, {
    method: "POST",
    headers : {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title
    })
  })
  return response.json()
}