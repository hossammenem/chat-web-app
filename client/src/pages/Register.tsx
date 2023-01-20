import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import PreLoader from '../components/PreLoader'
import useDocumentTitle from "../hooks/useDocumentTitle";

function Register() {
  useDocumentTitle("Register")
const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassowrd : '',
})

const { name, email, password, confirmPassowrd  } = formData

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
    e.preventDefault()

    if (password !== confirmPassowrd ) {
    toast.error('Passwords do not match')
    } else {
    const userData = {
        name,
        email,
        password,
    }

    dispatch(register(userData))
    }
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
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit} id="form">
              <div className="form-group">
                <input type="text" className="form-control" id='name' name='name' value={name}
                placeholder='Enter Your Username or Email' onChange={onChange} />
              </div>
              <div className='form-group'>
                <input type='email' className='form-control' id='email' name='email' value={email} 
                placeholder='Enter your email' onChange={onChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id='password' name='password'
                value={password} placeholder='Enter Your password' onChange={onChange} />
              </div>
              <div className='form-group'>
                <input type='password' className='form-control' id='confirmPassowrd' name='confirmPassowrd'
                value={confirmPassowrd} placeholder='Confirm password' onChange={onChange} />
              </div>
              <button className="btn button">Register</button>
            </form>
              <span>Do You Aleady Have Account? Login <a href="/login" style={{color: "#2196F3"}}>Here</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
}

export default Register