import { Routes, Route } from 'react-router-dom'
import SettingPage from "./pages/SettingPage"
import MainPage from "./pages/MainPage"
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<SettingPage/>} />
      <Route path='/main' element={<MainPage/>} />
    </Routes>
  )
}

export default App
