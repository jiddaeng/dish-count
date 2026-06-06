import { Routes, Route } from 'react-router-dom'
import SettingPage from './pages/SettingPage'
import MainPage from './pages/MainPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/settings' element={<SettingPage />} />
    </Routes>
  )
}

export default App
