import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import MainPage from './pages/MainPage'
import ClassSchedulePage from './pages/ClassSchedulePage'
import EnrollPage from './pages/EnrollPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NavBar from './pages/components/NavBar'
import MyPage from './pages/MyPage'
import ClassRoomPage from './pages/ClassRoomPage'
import MyClassListPage from './pages/MyCalssListPage'
import SiteInfoPage from './pages/SiteInfoPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen'>
      <AuthProvider>
      <NavBar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/class' element={<ClassSchedulePage />} />
        <Route path='/enroll' element={<EnrollPage />} />
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/classroom' element={<ClassRoomPage/>}/>
        <Route path='/myclasses' element={<MyClassListPage/>}/>
        <Route path='/siteinfo' element={<SiteInfoPage/>}/>
      </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
