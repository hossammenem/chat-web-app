import axios from 'axios'
import { API_URL } from '../../api/config'

async function register(userData: any) {
    const response = await axios.post(`${API_URL}/register`, userData)

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

async function login(userData: any){
    const response = await axios.post(`${API_URL}/login`, userData)

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

function logout(){
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}

export default authService