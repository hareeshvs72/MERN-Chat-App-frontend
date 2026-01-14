import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import LeftSideBar from './component/LeftSideBar'
import ChatContainer from './component/ChatContainer'
import RightSideBar from './component/RightSideBar'
import LandingPage from './component/Landing'
import EditProfile from './component/EditProfile'

function App() {
const [userSelected,setUserSelected] =  useState(false)
const [selecteduser,setSelectedUser] = useState(null)
  return (
    <>
      <Routes>
                <Route path='/' element={<LandingPage />} />

        <Route path='/login' element={<Login />} />
        <Route path='/editProfile' element={<EditProfile />} />
        <Route path='/enter' element={
          <div className='h-screen flex'>
            <LeftSideBar setUserSelected={setUserSelected} setSelectedUser={setSelectedUser}   />
            <ChatContainer userSelected={userSelected} selecteduser={selecteduser} />
            {userSelected && <RightSideBar />}
          </div>
        } />

      </Routes>
    </>
  )
}

export default App
