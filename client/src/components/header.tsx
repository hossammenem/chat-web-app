import { collapseOpen } from "../collapse";
import { logout, reset } from '../features/auth/authSlice'
import { useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header(){
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function Logout() {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <div className="navbar">
      <div className="navbar-items">
          <ul className="navbar-list">
            <li><a href="/">Home</a></li>
            <li><button onClick={collapseOpen}>All Chat Rooms</button></li>
            <li><button onClick={Logout}>Logout</button></li>
          </ul>
      </div>
    </div>
  )
}

export default Header;