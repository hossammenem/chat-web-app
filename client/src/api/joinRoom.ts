import { API_URL } from "./config";

export default async function joinRoom(token: String, title: String) {
  const response = await fetch(`${API_URL}/join-room`, {
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