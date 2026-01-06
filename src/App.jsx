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

  return (
    <>
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/enter' element={
         <div className='h-screen flex'>
           <LeftSideBar/>
        <ChatContainer/>
        <RightSideBar/>
         </div>
    }/>
     
  </Routes>
    </>
  )
}

export default App
