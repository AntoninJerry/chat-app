import React from 'react'
import Navbar from './assets/components/Navbar'
import { Routes, Route } from 'react-router-dom'
import HompePage from './assets/pages/HompePage'
import SignUpPage from './assets/pages/SignUpPage'
import LoginPage from './assets/pages/LoginPage'
import SettingsPage from './assets/pages/SettingsPage'
import ProfilePage from './assets/pages/ProfilePage'

import { useAuthStore } from './assets/store/useAuthStore'
import { useEffect } from 'react'

const App = () => {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<HompePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>

    </div>
  )
}

export default App
