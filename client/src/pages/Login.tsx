import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import PreLoader from '../components/PreLoader'
import useDocumentTitle from "../hooks/useDocumentTitle";

function Login() {
  useDocumentTitle("Login")
const [formData, setFormData] = useState({
    name: '',
    password: '',
})

const { name, password } = formData

const navigate = useNavigate()
const dispatch = useDispatch<any>()

const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
)

useEffect(() => {
    if (isError) {
    toast.error(message)
    }

    if (isSuccess || user) {
    navigate('/')
    navigate(0)
    }

    dispatch(reset())
}, [user, isError, isSuccess, message, navigate, dispatch])

const onChange = (e: any) => {
    setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
    }))
}

const onSubmit = (e: any) => {
    e.preventDefault();

    const userData = {
    name,
    password,
    }
    dispatch(login(userData))
    setFormData({name: "", password: ""})
}

if (isLoading) {
    return <PreLoader />
}

return (
<div className="layout">
  <div className="main order-md-1">
    <div className="start">
    <div className="container">
      <div className="col-md-12">
        <div className="content">
          <div className="text-center">
            <h1>Sign In</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" id='name' name='name' value={name}
                placeholder='Enter Your Username or Email' onChange={onChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id='password' name='password'
                value={password} placeholder='Enter Your password' onChange={onChange} />
              </div>
              <button className="btn button">Log In</button>
            </form>
              <span>Don't Have Account? Sign Up <a href="/register" style={{color: "#2196F3"}}>Here</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
}

export default Login