import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  const authUser = false;
  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/" />} />
          <Route path="/setting" element={<SettingPage/>} />
          <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
