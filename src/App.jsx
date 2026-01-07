import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import LeftSideBar from './component/LeftSideBar'
import ChatContainer from './component/ChatContainer'
import RightSideBar from './component/RightSideBar'

function App() {
const [userSelected,setUserSelected] =  useState(false)
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/enter' element={
          <div className='h-screen flex'>
            <LeftSideBar setUserSelected={setUserSelected}   />
            <ChatContainer userSelected={userSelected} />
            {userSelected && <RightSideBar />}
          </div>
        } />

      </Routes>
    </>
  )
}

export default App
