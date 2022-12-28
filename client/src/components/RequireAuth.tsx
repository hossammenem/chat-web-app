import { Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RequireAuth({ children }:any){
  const { user } = useSelector( (state: any) => state.auth )
  const isLoggedIn = user? true : false

  return isLoggedIn? (children):(<Navigate to={'/login'} />)
};