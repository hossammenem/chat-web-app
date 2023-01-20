import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatRoom from './pages/ChatRoom';

// components
import RequireAuth from './components/RequireAuth';
import Header from './components/header';
import Collapse from './components/Collapse';
import SocketsProvider from './components/socketsContext';

function App() {

return (
  <>
  <Router>
  { window.location.pathname.includes("login") || window.location.pathname.includes("register")
      ? <></> : <><Header /><Collapse /></>} 
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
      <Route path='/room/:roomId' element={
      <RequireAuth>
        <SocketsProvider>
          <ChatRoom />
        </SocketsProvider>
      </RequireAuth>} />
    </Routes>
  </Router>
  <ToastContainer />
  </>
)
}

export default App
